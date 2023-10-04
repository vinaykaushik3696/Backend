const express = require('express');
const fs = require('fs');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const employees = [];

app.post('/addEmployee', (req, res) => {
    const { name, salary, hoursWorked } = req.body;
    
    // Debugging: Print input values to the console
    console.log(`Name: ${name}, Salary: ${salary}, Hours Worked: ${hoursWorked}`);
    
    // Parse salary and hoursWorked as floating-point numbers
    const salaryAsFloat = parseFloat(salary);
    const hoursWorkedAsFloat = parseFloat(hoursWorked);
    
    // Debugging: Print parsed values to the console
    console.log(`Parsed Salary: ${salaryAsFloat}, Parsed Hours Worked: ${hoursWorkedAsFloat}`);
    
    // Calculate overtimePay and totalSalary
    const overtimePay = (hoursWorkedAsFloat > 40) ? (hoursWorkedAsFloat - 40) * (500) : 0;
    const totalSalary = salaryAsFloat + overtimePay;

    // Debugging: Print calculated values to the console
    console.log(`Overtime Pay: ${overtimePay}, Total Salary: ${totalSalary}`);
    
    employees.push({
        name,
        salary: salaryAsFloat,
        hoursWorked: hoursWorkedAsFloat,
        overtimePay,
        totalSalary
    });

    res.redirect('/');
});


app.get('/getEmployees', (req, res) => {
    res.json(employees);
    res.redirect('hyper/index.html');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const userData = `${username}:${password}\n`;

    // Append the user data to a file (e.g., users.txt)
    fs.appendFile('users.txt', userData, (err) => {
        if (err) {
            console.error(err);
            res.send('Error occurred during signup.');
        } else {
            res.send('Signup successful!');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
