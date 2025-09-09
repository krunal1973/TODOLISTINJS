document.addEventListener("DOMContentLoaded", () => {
   const expenseForm = document.getElementById("expense-form");
   const expenseName = document.getElementById("expense-name");
   const expenseAmount = document.getElementById("expense-amount");
   const expenseList = document.getElementById("expense-list");
   const totalAmountDisplay = document.getElementById("total-amount");
   // document.getElementById("");

   let expenses= JSON.parse(localStorage.getItem('expenses')) || [];
   let totalAmount = calculateTotal();

   renderExpenses();
   updateTotal();

   expenseForm.addEventListener("submit",(e) => {
      e.preventDefault();
      const name = expenseName.value.trim();
      const amount = parseFloat(expenseAmount.value.trim());
      if(name !== "" && !isNaN(amount) && amount > 0){
         const newExpense = {
            id: Date.now(),
            name,
            amount
         };
         expenses.push(newExpense);
         saveExpensesToLocal();
         renderExpenses();
         updateTotal();

         expenseName.value = "";
         expenseAmount.value = "";

      }
   });

   function renderExpenses() {
      expenseList.innerHTML="";
      expenses.forEach((expense) => {
         const Li = document.createElement("li");
         Li.innerHTML = `
         ${expense.name} - $${expense.amount.toFixed(2)}
         <button class="delete-btn" data-id="${expense.id}">Delete</button>
         `;
         expenseList.appendChild(Li);

      })
   }

   function calculateTotal() {
      return expenses.reduce((total, expenses) => total + expenses.amount, 0);


   }
   function saveExpensesToLocal() {
      localStorage.setItem("expenses", JSON.stringify(expenses));

   }
   function updateTotal(){
      totalAmount = calculateTotal();
      totalAmountDisplay.textContent = totalAmount.toFixed(2);
   }

   expenseList.addEventListener("click", (e) => {
      if(e.target.tagName === 'BUTTON'){
         const expenseId =parseInt(e.target.getAttribute('data-id'));
         expenses = expenses.filter((expense) => expense.id !== expenseId);
         saveExpensesToLocal();
         renderExpenses();
         updateTotal();
      }
   });

});