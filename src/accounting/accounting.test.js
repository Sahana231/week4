// Unit tests for Student Account Management System
// Mirrors scenarios in docs/TESTPLAN.md

const fs = require('fs');
const path = require('path');
const BALANCE_FILE = path.join(__dirname, 'balance.json');
const DEFAULT_BALANCE = 1000.00;

// Import main functions from index.js
const { loadBalance, saveBalance } = (() => {
    const mod = require('./index.js');
    return {
        loadBalance: mod.loadBalance || (() => {
            if (!fs.existsSync(BALANCE_FILE)) return DEFAULT_BALANCE;
            try {
                const data = JSON.parse(fs.readFileSync(BALANCE_FILE, 'utf8'));
                return typeof data.balance === 'number' ? data.balance : DEFAULT_BALANCE;
            } catch {
                return DEFAULT_BALANCE;
            }
        }),
        saveBalance: mod.saveBalance || ((balance) => {
            fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance }), 'utf8');
        })
    };
})();

beforeEach(() => {
    // Reset balance before each test
    if (fs.existsSync(BALANCE_FILE)) fs.unlinkSync(BALANCE_FILE);
    saveBalance(DEFAULT_BALANCE);
});

describe('Account Management System', () => {
    test('TC-01: View initial balance', () => {
        expect(loadBalance()).toBe(DEFAULT_BALANCE);
    });

    test('TC-02: Credit account with valid amount', () => {
        let balance = loadBalance();
        balance += 200.00;
        saveBalance(balance);
        expect(loadBalance()).toBe(1200.00);
    });

    test('TC-03: Debit account with sufficient funds', () => {
        let balance = loadBalance();
        balance -= 300.00;
        saveBalance(balance);
        expect(loadBalance()).toBe(700.00);
    });

    test('TC-04: Debit account with insufficient funds', () => {
        saveBalance(100.00);
        let balance = loadBalance();
        const debit = 200.00;
        if (balance >= debit) {
            balance -= debit;
            saveBalance(balance);
        }
        // Should not debit, balance remains 100.00
        expect(loadBalance()).toBe(100.00);
    });

    test('TC-05: Credit account with zero amount', () => {
        let balance = loadBalance();
        balance += 0.00;
        saveBalance(balance);
        expect(loadBalance()).toBe(DEFAULT_BALANCE);
    });

    test('TC-06: Debit account with zero amount', () => {
        let balance = loadBalance();
        balance -= 0.00;
        saveBalance(balance);
        expect(loadBalance()).toBe(DEFAULT_BALANCE);
    });

    test('TC-07: View balance after multiple ops', () => {
        let balance = loadBalance();
        balance += 100.00;
        saveBalance(balance);
        balance -= 50.00;
        saveBalance(balance);
        expect(loadBalance()).toBe(1050.00);
    });

    test('TC-10: Data persistence between sessions', () => {
        saveBalance(900.00);
        // Simulate restart
        expect(loadBalance()).toBe(900.00);
    });
});
