# Student Account Management System — Test Plan

This test plan covers all business logic implemented in the COBOL application for student account management. Use this plan to validate the system with business stakeholders and as a basis for future automated tests.

| Test Case ID | Test Case Description                | Pre-conditions                | Test Steps                                                                 | Expected Result                                      | Actual Result | Status (Pass/Fail) | Comments |
|--------------|--------------------------------------|-------------------------------|----------------------------------------------------------------------------|------------------------------------------------------|---------------|--------------------|----------|
| TC-01        | View initial balance                 | System freshly started        | 1. Start app<br>2. Select 'View Balance'                                   | Balance displayed as 1000.00                         |               |                    |          |
| TC-02        | Credit account with valid amount     | Balance = 1000.00             | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter 200.00              | New balance displayed as 1200.00                     |               |                    |          |
| TC-03        | Debit account with sufficient funds  | Balance = 1000.00             | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 300.00               | New balance displayed as 700.00                      |               |                    |          |
| TC-04        | Debit account with insufficient funds| Balance = 100.00              | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 200.00               | Error: 'Insufficient funds for this debit.'          |               |                    |          |
| TC-05        | Credit account with zero amount      | Any balance                   | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter 0.00                | Balance remains unchanged                            |               |                    |          |
| TC-06        | Debit account with zero amount       | Any balance                   | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 0.00                 | Balance remains unchanged                            |               |                    |          |
| TC-07        | View balance after multiple ops      | Perform credits/debits        | 1. Start app<br>2. Perform several credits/debits<br>3. Select 'View Balance'| Balance reflects all previous operations             |               |                    |          |
| TC-08        | Exit application                     | App running                   | 1. Start app<br>2. Select 'Exit'                                         | Application exits with 'Goodbye!' message             |               |                    |          |
| TC-09        | Handle invalid menu choice           | App running                   | 1. Start app<br>2. Enter invalid menu option (e.g., 5 or letter)           | Error: 'Invalid choice, please select 1-4.'          |               |                    |          |
| TC-10        | Data persistence between sessions    | Perform credit/debit, restart | 1. Start app<br>2. Credit or debit<br>3. Exit<br>4. Restart<br>5. View balance| Balance reflects previous session's last value       |               |                    |          |

> **Note:** Actual Result, Status, and Comments columns are to be filled during test execution.
