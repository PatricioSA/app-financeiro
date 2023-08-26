import { calculateExpanses, calculateIncomes } from "./index.js"

const ctx = document.getElementById('chart')
let chartInstance

function initializeChart() {
    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Receitas', 'Despesas'],
            datasets: [{
                backgroundColor: ['green', 'red'],
                hoverOffset: 4
            }]
        }
    })
}

function updateChart() {
    chartInstance.data.datasets[0].data = [calculateIncomes() === 0 ? 1 : calculateIncomes(), calculateExpanses() === 0 ? 1 : calculateExpanses()]
    chartInstance.update()
    // else {
    //     initializeChart()
    // }
}

initializeChart()

export { updateChart }