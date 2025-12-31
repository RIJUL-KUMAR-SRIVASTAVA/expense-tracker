const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} (${expense.category}) - ₹${expense.amount}
      <button onclick="deleteExpense(${index})">X</button>
    `;
    list.appendChild(li);
  });

  totalDisplay.textContent = total;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  expenses.push({ title, amount, category });
  form.reset();
  renderExpenses();
});

renderExpenses();
