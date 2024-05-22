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


// Fonction pour mettre à jour les graphiques avec de nouvelles données
function updateCharts() {
    fetch('/get_data')  // Appeler l'API pour récupérer les données série
        .then(response => response.json())
        .then(data => {
            // Mettre à jour les données du graphique Kx
            chartKx.data.labels.push(data.t); // Si t est également renvoyé
            chartKx.data.datasets[0].data.push(data.kx);

            // Mettre à jour les données du graphique Ky
            chartKy.data.labels.push(data.t); // Si t est également renvoyé
            chartKy.data.datasets[0].data.push(data.ky);

            // Mettre à jour les graphiques
            chartKx.update();
            chartKy.update();
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données série :', error);
        });
}
 
    chartKx.data.labels.push(t[-1]);
    chartKx.data.datasets[0].data.push(kx[-1]);
    chartKy.data.labels.push(t[-1]);
    chartKy.data.datasets[0].data.push(ky[-1]);
    chartKx.update();
    chartKy.update();
    console.log("Données après mise à jour - t:", t);
    console.log("Données après mise à jour - Kx:", kx);
    console.log("Données après mise à jour - Ky:", ky);


let commandRoutineId = setInterval(updateCharts, 1000)