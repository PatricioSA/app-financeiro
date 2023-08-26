import { calculateCategoryTotal } from "./index.js"

const ctx = document.getElementById('category-chart')
let categoryChartInstance

function initializeCategoryChart() {
    categoryChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['teste'],
            datasets: [{
                backgroundColor: ['green', 'blue', 'yellow', 'orange', 'purple'],
                data: [10]
            }]
        }
    })
}

function updateCategoryChart() {
    const categoryTotal = calculateCategoryTotal()
    const categoryNames = Object.keys(categoryTotal)
    const categoryValues = Object.values(categoryTotal)
    console.log(categoryValues)

    categoryChartInstance.data.labels = categoryNames
    categoryChartInstance.data.datasets[0].data = categoryValues
    categoryChartInstance.update();
}

initializeCategoryChart()

export { updateCategoryChart }