$(document).ready(init);

const listOfEmployees = [];
let totalMonthlySalary = 0;
const monthsInAYear = 12;
const maxTotalMonthlySalary = 20000;

function init() {
    console.log(`hi`);
    $('#submitNewEmployeeButton').on('submit', addEmployee);
    $('.js-clear-button').on('click', emptyNewEmployeeInputs);
    $('.js-displayedListOfEmployees').on('click','.js-delete-button', deleteEmployee)
};

function addEmployee(event){
    event.preventDefault();
    const newEmployeeObject = {
        firstName: $('#js-firstNameInput').val(),
        lastName: $('#js-lastNameInput').val(),
        idNumber: $('#js-idNumberInput').val(),
        jobTitle: $('#js-jobTitleInput').val(),
        annualSalary: parseInt($('#js-annualSalary').val()),
    };
    addToEmployeeArray(newEmployeeObject)
    emptyNewEmployeeInputs();
}; //Creates new employee.

function addToEmployeeArray(newEmployeeObject) {
    listOfEmployees.push(newEmployeeObject);
    render();
}; //Pushes new employee into the array

function emptyNewEmployeeInputs(){
    $('#js-firstNameInput').val('');
    $('#js-lastNameInput').val('');
    $('#js-idNumberInput').val('');
    $('#js-jobTitleInput').val('');
    $('#js-annualSalary').val('');
}; //Clears form inputs

function deleteEmployee(){
    const id = $(this).parent().data('id');
    listOfEmployees.splice(id, 1);
    render();
}; //Deletes an employee

function calcTotalMonthlySalary(){
    totalMonthlySalary = 0;
    for(let employee of listOfEmployees) {
        totalMonthlySalary += (employee.annualSalary / monthsInAYear);

        checkTotalMonthlySalary(totalMonthlySalary)
    }
}; //Calculates Total Monthly Salary

function checkTotalMonthlySalary(totalMonthlySalary){
    console.log(totalMonthlySalary);
};

function render(){
    $('.js-displayedListOfEmployees').empty();
    calcTotalMonthlySalary();

    for(let i = 0; i < listOfEmployees.length; i++){
        const employee = listOfEmployees[i];
        
        $('.js-displayedListOfEmployees').append(`
            <tr data-id="${i}">
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.annualSalary}</td>
                <td><button class="js-delete-button">Delete Employee</button></td>
            </tr>  
        `);
    }
    $('.js-monthlySalary').text(`Total Monthly Salary: $${totalMonthlySalary}`);
}; //Renders the view

