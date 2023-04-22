
// create formsubmit to target form
const formSubmit = document.querySelector("#expense-form")
// to target the table body with id expense-table
const expenseTable = document.querySelector("#expense-table")
// adding event to the form on submit
formSubmit.addEventListener('submit', (e) => {
    e.preventDefault()
    // create array to store the expenses
    const arr = new Array()
    // to get the value of input amount,description,category
    const amount = document.querySelector("#amount").value
    const description = document.querySelector("#description").value
    const category = document.querySelector("#category").value
    //  conditions to not give empty inputs
    if (category == "") {
        alert("please select the category")
        return
    }
    if (isNaN(amount) || amount <= 0) {
        alaert("please eneter a valid amount")
        return
    }
    if (description == "") {
        alert("please select the description")
        return
    }
    //    creating object with input values
    const expense = {
        money: amount,
        description: description,
        category: category
    }
    // pushing the object too array
    arr.push(expense)
    // functionality for each element in array
    arr.forEach(element => {
        // creating new row to add the values of the form into the expense table
        const newRow = expenseTable.insertRow();
        //    creating cells to take up individual values accordingly
        const categoryCell = newRow.insertCell();
        const descriptionCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const deletecell = newRow.insertCell()
        const editCell = newRow.insertCell()
        //    creating delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete"
        deleteBtn.classList.add('delete-btn')

        //    edit button creation
        const editBtn = document.createElement("button");
        editBtn.textContent = "edit"
        editBtn.classList.add('edit-btn')
        //  storing the values in local strorage

        
        localStorage.setItem(element.category, JSON.stringify(expense))
        e.target.amount.value = ""
        e.target.description.value = ""
        e.target.category.value = document.getElementById("selected").textContent
        // delete button functinality
        deleteBtn.addEventListener("click", function () {
            localStorage.removeItem(element.category)
            expenseTable.removeChild(newRow)
        })

        //    edit funtionality
            editBtn.addEventListener("click", function () {
            // localStorage.removeItem(element.category)
            // expenseTable.removeChild(newRow)
            document.querySelector("#amount").value = element.money;
            document.querySelector('#category').value = element.category
            document.querySelector('#description').value = element.description
        })
        // to get the value from local stroage
          var exp=localStorage.getItem(element.category)
          var obj=JSON.parse(exp)

        categoryCell.textContent = obj.category;
        descriptionCell.textContent = obj.description;
        amountCell.textContent = obj.money;
        deletecell.appendChild(deleteBtn)
        editCell.appendChild(editBtn)
        

        
    })

})
