window.onload = () => {
    fetch('/getEmployees')
        .then(response => response.json())
        .then(data => {
            const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = '';

            data.forEach(employee => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${employee.name}, Salary: ${employee.salary}, Hours Worked: ${employee.hoursWorked}, Overtime Pay: ${employee.overtimePay}, Total Salary: ${employee.totalSalary}`;
                employeeList.appendChild(listItem);
            });
        });
        const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = '';
        
};
