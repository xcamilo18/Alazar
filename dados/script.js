document.getElementById('calculateProbability').addEventListener('click', calculateProbability);
document.getElementById('rollButton').addEventListener('click', rollDice);

const results = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0
};

function calculateProbability() {
    const targetNumber = parseInt(document.getElementById('targetNumber').value);
    const probability = getProbability(targetNumber);
    document.getElementById('probabilityResult').textContent = `Probabilidad de obtener ${targetNumber}: ${probability.toFixed(2)}%`;
}

function getProbability(number) {
    const totalOutcomes = 36; // 6 * 6 posibles combinaciones al lanzar dos dados
    let favorableOutcomes = 0;
    
    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 6; j++) {
            if (i + j === number) {
                favorableOutcomes++;
            }
        }
    }
    
    return (favorableOutcomes / totalOutcomes) * 100;
}

function rollDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const sum = die1 + die2;
    
    document.getElementById('die1').textContent = die1;
    document.getElementById('die2').textContent = die2;
    document.getElementById('result').textContent = `Resultado: ${sum}`;

    results[sum]++;
    updateChart();
}

function updateChart() {
    const ctx = document.getElementById('probabilityChart').getContext('2d');
    const labels = Object.keys(results);
    const data = Object.values(results);
    const totalRolls = data.reduce((a, b) => a + b, 0);
    const probabilities = data.map(count => (totalRolls > 0 ? count / totalRolls : 0));

    if (window.myChart) {
        window.myChart.data.datasets[0].data = probabilities;
        window.myChart.update();
    } else {
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Probabilidad',
                    data: probabilities,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('probabilityChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(results),
            datasets: [{
                label: 'Probabilidad',
                data: Object.values(results).map(count => 0), // Inicialmente 0 lanzamientos
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
