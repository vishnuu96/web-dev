 function addExpense() {
        let description = document.querySelector('#description').value;
        let category = document.querySelector('#category').value;
        let amount = document.querySelector('#amount').value;
        let editIndex = document.querySelector('#editIndex').value;
    
        if (editIndex === '') {
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses.push({ category: category,description:description, amount: amount});
            localStorage.setItem('expenses', JSON.stringify(expenses));
            let tableBody = document.querySelector('#expense-table')
            let row = '<tr><td>' + category + '</td><td>' + description + '</td><td>' + amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button></td><td><button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
            tableBody.insertAdjacentHTML('beforeend', row);
        } else {
            editExpense(editIndex, category,description, amount);
        }
    
        resetForm();
        return false;
    }
    
    // reset the form
    function resetForm() {
        document.querySelector('#description').value = '';
        document.querySelector('#category').value = '';
        document.querySelector('#amount').value = '';
        document.querySelector('#editIndex').value = '';
        document.querySelector('#add-btn').innerHTML = 'Add Expense';
    }
    
    // delete expense from table and local storage
    function deleteExpense(row) {
        row.parentNode.removeChild(row);
        let expenses = JSON.parse(localStorage.getItem('expenses'))||[]
    let rowIndex = row.rowIndex - 1;
    expenses.splice(rowIndex, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    
    // edit expense in form
    function editForm(row) {
    let rowIndex = row.rowIndex - 1;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let expense = expenses[rowIndex];
    document.querySelector('#category').value = expense.category;
    document.querySelector('#amount').value = expense.amount;
    document.querySelector('#editIndex').value = rowIndex;
    document.querySelector('#add-btn').innerHTML = 'Update Expense';
    document.querySelector('#description').value = expense.description;
    }
    
    // edit expense in table and local storage
    function editExpense(index, category,description, amount) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses[index] = { category: category,description: description, amount: amount};
    localStorage.setItem('expenses', JSON.stringify(expenses));
    let tableRow = document.querySelector('#expense-table').rows[index+1];
    tableRow.cells[0].innerHTML = category;
    tableRow.cells[1].innerHTML = description;
    tableRow.cells[2].innerHTML = amount;
    resetForm();
    }
    
    
    // show expenses in table
    function showExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let tableBody = document.querySelector('#expense-table')
    for (let i = 0; i < expenses.length; i++) {
        let expense = expenses[i];
        let row = '<tr><td>' + expense.category+ '</td><td>' + expense.description  + '</td><td>' + expense.amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button></td><td><button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
    }
    }
    
        





