document.getElementById('calculateProbability').addEventListener('click', calculateProbability);
document.getElementById('spinButton').addEventListener('click', spinRoulette);

const results = Array(37).fill(0);

function calculateProbability() {
    const targetNumber = parseInt(document.getElementById('targetNumber').value);
    const probability = getProbability(targetNumber);
    document.getElementById('probabilityResult').textContent = `Probabilidad de obtener ${targetNumber}: ${probability.toFixed(2)}%`;
}

function getProbability(number) {
    const totalOutcomes = 37; // 37 posibles resultados en una ruleta europea (0-36)
    return (1 / totalOutcomes) * 100;
}

function spinRoulette() {
    document.getElementById('result').textContent = '';

    const rotatingImage = document.getElementById('rotating-image');
    const resultImage = document.getElementById('result-image');
    let currentRotation = 0;
    const rotationStep = 10;  // Incremento de rotación en grados
    const rotationIntervalDuration = 20; // Duración del intervalo de rotación en milisegundos

    // Mostrar la imagen de la ruleta girando y ocultar la imagen de resultado
    rotatingImage.style.display = 'block';
    resultImage.style.display = 'none';

    const rotationInterval = setInterval(() => {
        currentRotation += rotationStep;
        rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
    }, rotationIntervalDuration);

    setTimeout(() => {
        clearInterval(rotationInterval);

        const result = Math.floor(Math.random() * 37);
        document.getElementById('result').textContent = `Resultado: ${result}`;

        results[result]++;
        updateChart();

        // Cambiar el src de la imagen según el resultado
        resultImage.src = `img/${result}.png`;
        rotatingImage.style.display = 'none'; // Ocultar imagen de ruleta
        resultImage.style.display = 'block'; // Mostrar nueva imagen
        // resultImage.style.transform = 'translate(10%, 0%)'; // Asegurarse de que la imagen está centrada y derecha

        document.getElementById('spinButton').disabled = false;
    }, 5000);
}

function updateChart() {
    const ctx = document.getElementById('probabilityChart').getContext('2d');
    const labels = Array.from({ length: 37 }, (_, i) => i.toString());
    const data = results;
    const totalSpins = data.reduce((a, b) => a + b, 0);
    const frequencies = data.map(count => (totalSpins > 0 ? count / totalSpins : 0));

    if (window.myChart) {
        window.myChart.data.datasets[0].data = frequencies;
        window.myChart.update();
    } else {
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Frecuencia',
                    data: frequencies,
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
            labels: Array.from({ length: 37 }, (_, i) => i.toString()),
            datasets: [{
                label: 'Frecuencia',
                data: results.map(count => 0), // Inicialmente 0 lanzamientos
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
