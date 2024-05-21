const ctxKx = document.getElementById('canvasKx');
const ctxKy = document.getElementById('canvasKy');

console.log("Live Server fonctionne correctement et les fichiers sont bien reliés !");

// Tableaux pour stocker les données
let t = [];
let kx = [];
let ky = [];

// Création des graphiques Chart.js avec des données initiales vides
const chartKx = new Chart(ctxKx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Kx',
            data: [],
            borderColor: 'red',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10
                }
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 100,
                beginAtZero: true
            }
        }
    }
});

const chartKy = new Chart(ctxKy, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Ky',
            data: [],
            borderColor: 'blue',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10
                }
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 100,
                beginAtZero: true
            }
        }
    }
});

// Fonction pour lire les données depuis un fichier JSON
function readDataFromJSONFile() {
    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            t = data.map(item => item.t);
            let extractedData = data.map(item => item.data.split(';'));
            kx = extractedData.map(item => parseFloat(item[0]));
            ky = extractedData.map(item => parseFloat(item[1]));
            updateCharts();
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du fichier JSON :', error);
        });
}

// Fonction pour mettre à jour les graphiques avec les nouvelles données
function updateCharts() {
    // Mettre à jour les données du graphique Kx
    chartKx.data.labels = t.slice(); // Copie des valeurs de t
    chartKx.data.datasets[0].data = kx.slice(); // Copie des valeurs de kx

    // Mettre à jour les données du graphique Ky
    chartKy.data.labels = t.slice(); // Copie des valeurs de t
    chartKy.data.datasets[0].data = ky.slice(); // Copie des valeurs de ky

    // Mettre à jour les graphiques
    chartKx.update();
    chartKy.update();

    console.log("Graphes mis à jour avec les nouvelles données.");
}

// Appel initial pour charger les données depuis le fichier JSON
readDataFromJSONFile();

// Lignes de test pour vérifier les données après leur mise à jour
console.log("Données après mise à jour - t:", t);
console.log("Données après mise à jour - Kx:", kx);
console.log("Données après mise à jour - Ky:", ky);
