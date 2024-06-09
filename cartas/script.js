document.getElementById('simularBtn').addEventListener('click', simularProbabilidades);

function crearBaraja() {
    const palos = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
    const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let baraja = [];
    for (let palo of palos) {
        for (let valor of valores) {
            baraja.push({ valor, palo });
        }
    }
    return baraja;
}

function simularMano(baraja) {
    let mano = [];
    while (mano.length < 2) {
        const index = Math.floor(Math.random() * baraja.length);
        mano.push(baraja.splice(index, 1)[0]);
    }
    return mano;
}

function calcularValorMano(mano) {
    const valores = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11 };
    let valorTotal = 0;
    let ases = 0;
    for (let carta of mano) {
        valorTotal += valores[carta.valor];
        if (carta.valor === 'A') {
            ases += 1;
        }
    }
    while (valorTotal > 21 && ases > 0) {
        valorTotal -= 10;
        ases -= 1;
    }
    return valorTotal;
}

function mostrarCartas(mano) {
    const cartasDiv = document.getElementById('cartas');
    cartasDiv.innerHTML = '';
    mano.forEach(carta => {
        const cartaImg = document.createElement('img');
        cartaImg.className = 'carta';
        cartaImg.src = `imagenes/${carta.valor}_${carta.palo}.png`; // Cambia esta ruta según donde estén las imágenes de las cartas
        cartaImg.alt = `${carta.valor} de ${carta.palo}`;
        cartasDiv.appendChild(cartaImg);
    });
}
function simularProbabilidades() {
    const nSimulaciones = 100000;
    let baraja = crearBaraja();
    let resultados = {};
    for (let i = 0; i < nSimulaciones; i++) {
        let mano = simularMano([...baraja]);
        let valorMano = calcularValorMano(mano);
        if (resultados[valorMano]) {
            resultados[valorMano]++;
        } else {
            resultados[valorMano] = 1;
        }
    }

    // Calcular probabilidades
    let probabilidades = {};
    for (let valor in resultados) {
        probabilidades[valor] = (resultados[valor] / nSimulaciones).toFixed(4);
    }

    // Mostrar resultados
    let tbody = document.querySelector('#resultados tbody');
    tbody.innerHTML = '';
    for (let valor in probabilidades) {
        let row = `<tr>
            <td>${valor}</td>
            <td>${probabilidades[valor]}</td>
        </tr>`;
        tbody.innerHTML += row;
    }

    // Simular y mostrar mano
    let mano = simularMano([...baraja]);
    mostrarCartas(mano);
}
