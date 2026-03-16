// Node.js Student Account Management System
// Preserves COBOL business logic, menu, and data integrity

const readline = require('readline');
const fs = require('fs');
const BALANCE_FILE = './balance.json';
const DEFAULT_BALANCE = 1000.00;

function loadBalance() {
    if (!fs.existsSync(BALANCE_FILE)) {
        return DEFAULT_BALANCE;
    }
    try {
        const data = JSON.parse(fs.readFileSync(BALANCE_FILE, 'utf8'));
        return typeof data.balance === 'number' ? data.balance : DEFAULT_BALANCE;
    } catch {
        return DEFAULT_BALANCE;
    }
}

function saveBalance(balance) {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance }), 'utf8');
}

function displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
}

function promptInput(prompt) {
    return new Promise(resolve => {
        rl.question(prompt, answer => resolve(answer));
    });
}

async function main() {
    let continueFlag = true;
    let balance = loadBalance();

    while (continueFlag) {
        displayMenu();
        const choice = await promptInput('Enter your choice (1-4): ');
        switch (choice.trim()) {
            case '1':
                console.log(`Current balance: ${balance.toFixed(2)}`);
                break;
            case '2': {
                const amountStr = await promptInput('Enter credit amount: ');
                const amount = parseFloat(amountStr);
                if (!isNaN(amount) && amount > 0) {
                    balance += amount;
                    saveBalance(balance);
                    console.log(`Amount credited. New balance: ${balance.toFixed(2)}`);
                } else {
                    console.log('Invalid amount.');
                }
                break;
            }
            case '3': {
                const amountStr = await promptInput('Enter debit amount: ');
                const amount = parseFloat(amountStr);
                if (!isNaN(amount) && amount > 0) {
                    if (balance >= amount) {
                        balance -= amount;
                        saveBalance(balance);
                        console.log(`Amount debited. New balance: ${balance.toFixed(2)}`);
                    } else {
                        console.log('Insufficient funds for this debit.');
                    }
                } else {
                    console.log('Invalid amount.');
                }
                break;
            }
            case '4':
                continueFlag = false;
                console.log('Exiting the program. Goodbye!');
                break;
            default:
                console.log('Invalid choice, please select 1-4.');
        }
    }
    rl.close();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

main();
