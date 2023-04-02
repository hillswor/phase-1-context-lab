/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage that's new and different. That's because we're avoiding a well-known, but sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available for you to use if you need it!
 */
function createEmployeeRecord(employeeData) {
    const employee = {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employee;
}

function createEmployeeRecords(employeeData) {
    const employees = employeeData.map((employee) => {
        return createEmployeeRecord(employee);
    });
    return employees;
}

function createTimeInEvent(timeInData) {
    const dateAndTime = timeInData.split(" ");
    const timeInEvent = {
        type: "TimeIn",
        date: dateAndTime[0],
        hour: parseInt(dateAndTime[1]),
    };
    this.timeInEvents.push(timeInEvent);
    return this;
}

function createTimeOutEvent(timeOutData) {
    const dateAndTime = timeOutData.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        date: dateAndTime[0],
        hour: parseInt(dateAndTime[1]),
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvents = this.timeInEvents.filter(
        (event) => event.date === date
    );
    const timeOutEvents = this.timeOutEvents.filter(
        (event) => event.date === date
    );
    console.log(timeInEvents);
    let totalHoursWorked = 0;
    for (let i = 0; i < timeInEvents.length; i++) {
        const hoursWorked =
            (timeOutEvents[i].hour - timeInEvents[i].hour) / 100;
        totalHoursWorked += hoursWorked;
    }
    return totalHoursWorked;
}

function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(
        function (memo, d) {
            return memo + wagesEarnedOnDate.call(this, d);
        }.bind(this),
        0
    ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};

function findEmployeeByFirstName(employees, name) {
    const matchedEmployee = employees.filter((employee) => {
        return employee.firstName === name;
    });
    return matchedEmployee[0];
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
}
