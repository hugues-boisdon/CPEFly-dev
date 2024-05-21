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
                min: 0, // Définir la valeur minimale de l'axe x
                max: 100, // Définir la valeur maximale de l'axe x
                ticks: {
                    stepSize: 10 // Ajuster si nécessaire pour mieux espacer les ticks
                }
            },
            y: {
                suggestedMin: 0, // Définir la valeur minimale de l'axe y
                suggestedMax: 100, // Définir la valeur maximale de l'axe y
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
                min: 0, // Définir la valeur minimale de l'axe x
                max: 100, // Définir la valeur maximale de l'axe x
                ticks: {
                    stepSize: 10 // Ajuster si nécessaire pour mieux espacer les ticks
                }
            },
            y: {
                suggestedMin: 0, // Définir la valeur minimale de l'axe y
                suggestedMax: 100, // Définir la valeur maximale de l'axe y
                beginAtZero: true
            }
        }
    }
});

// Fonction pour lire les données depuis un fichier JSON
function readDataFromJSONFile() {
    fetch('../data.json')
        .then(response => response.json())
        .then(jsonData => {
            t = jsonData.map(item => item.t);
            data = jsonData.map(item => item.data);
            updateCharts();
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du fichier JSON :', error);
        });
}

// Fonction pour mettre à jour les graphiques avec de nouvelles données
function updateCharts() {
    chartKx.data.labels.push(t[-1]);
    chartKx.data.datasets[0].data.push(kx[-1]);
    chartKy.data.labels.push(t[-1]);
    chartKy.data.datasets[0].data.push(ky[-1]);
    chartKx.update();
    chartKy.update();
}

// Appel initial pour charger les données depuis le fichier JSON
readDataFromJSONFile();

// Lignes de test pour vérifier les données après leur mise à jour
console.log("Données après mise à jour - t:", t);
console.log("Données après mise à jour - Kx:", kx);
console.log("Données après mise à jour - Ky:", ky);