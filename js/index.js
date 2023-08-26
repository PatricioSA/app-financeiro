import { updateChart } from "./chart.js"
import { updateCategoryChart } from "./categoryChart.js"

const buttonNewTransaction = document.getElementById('btn-new-transaction')
const buttonAddTransaction = document.getElementById('add-transaction')
const buttonCancelTransaction = document.getElementById('cancel-transaction')
const modal = document.querySelector('dialog')



buttonNewTransaction.onclick = () => modal.showModal()

buttonCancelTransaction.addEventListener('click', () => modal.close())

buttonAddTransaction.addEventListener('click', addTransaction)

let transactions = []

function addTransaction() {
  const transactionName = document.getElementById('input-trasaction-name').value
  const transactionAmount = document.getElementById('input-trasaction-value').value
  const transactionCategory = document.getElementById('input-trasaction-category').value

  if (transactionName === '' || transactionAmount === '') return

  createNewTransaction(transactionName, transactionAmount, transactionCategory)

  modal.close()
}

function createNewTransaction(transactionName, transactionAmount, category) {
  //Seleciona o input Receita ou Despesa
  const inputTrasactionType = document.querySelector('input[name="tipo-transacao"]:checked')

  transactions.push(
    {
      transactionName,
      transactionType: inputTrasactionType.value,
      category,
      amount: parseFloat(transactionAmount),
    }
  )

  storageTransaction()
  updateValuesAndChart()
}

function storageTransaction() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function deleteTransaction(index) {
  transactions.splice(index, 1);

  storageTransaction()
  returnTransactions();
  updateValues();
  updateChart()
}

function calculateCategoryTotal() {
  const totalSpendingPerCategory = (accumulator, transaction) => {
    accumulator[transaction.category] = accumulator[transaction.category] || 0
    accumulator[transaction.category] += transaction.amount
    return accumulator
  }

  const categoryTotal = transactions.reduce(totalSpendingPerCategory, {});
  console.log(categoryTotal)
  return categoryTotal;
}

function returnTransactions() {
  const listTransactions = document.querySelector('section[class="transactions"]')

  //Remove todas as transações da tela
  if (listTransactions.childElementCount > 0) {
    while (listTransactions.firstChild) {
      listTransactions.removeChild(listTransactions.firstChild);
    }
  }

  const storedTransactions = localStorage.getItem('transactions');
  if (storedTransactions) {
    transactions = JSON.parse(storedTransactions);

    //Coloca as transações na tela
    transactions.forEach((transaction, index) => {
      const transactionContainer = document.createElement('div')
      const div = document.createElement('div')
      const p1 = document.createElement('p')
      const p2 = document.createElement('p')
      const deleteButton = document.createElement('button')

      transactionContainer.id = 'transaction-container'

      p1.innerText = transaction.transactionName
      p2.innerText = transaction.transactionType === 'receita' ? `+R$${transaction.amount}` : `-R$${transaction.amount}`
      p2.style.color = transaction.transactionType === 'receita' ? p2.style.color = 'green' : p2.style.color = 'red'

      deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>'
      deleteButton.onclick = () => deleteTransaction(index)

      div.append(p1, p2)
      transactionContainer.append(div, deleteButton)
      listTransactions.appendChild(transactionContainer)
    })
  }
}

export function calculateIncomes() {
  let totalIncome = 0;
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].transactionType === 'receita') {
      totalIncome += transactions[i].amount;
    }
  }
  const incomes = document.getElementById('total-incomes')
  incomes.innerText = `R$${totalIncome}`
  return totalIncome
}

export function calculateExpanses() {
  let totalExpanses = 0;
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].transactionType === 'despesa') {
      totalExpanses += transactions[i].amount;
    }
  }
  const expanses = document.getElementById('total-expanses')
  expanses.innerText = `R$${totalExpanses}`
  return totalExpanses
}

function updateValues() {
  const totalValue = document.getElementById('total-value')
  calculateIncomes()
  calculateExpanses()

  totalValue.innerText = `R$${calculateIncomes() - calculateExpanses()}`
}

function updateValuesAndChart() {
  returnTransactions();
  updateValues();
  updateChart();
  updateCategoryChart()
  // calculateCategoryTotal()
}

updateValuesAndChart()

export {calculateCategoryTotal}