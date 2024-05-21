const ctxKx = document.getElementById('canvasKx').getContext('2d');;
const ctxKy = document.getElementById('canvasKy').getContext('2d');;

console.log("Live Server fonctionne correctement et les fichiers sont bien reliés !");

// Création des graphiques Chart.js avec des données initiales vides
const chartKx = new Chart(ctxKx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Kx',
            data: [],
            borderColor: '#fcba03',
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(252, 186, 3, 0.1)',
            tension: 0.35,   
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            x: {
                type: 'linear',
                ticks: {
                    stepSize: 10 // Ajuster si nécessaire pour mieux espacer les ticks
                },
                title: {
                    display: true,
                    text: 'Time (seconds)' // X-axis title with units
                }
            },
            y: {
                suggestedMin: 0, // Définir la valeur minimale de l'axe y
                suggestedMax: 100, // Définir la valeur maximale de l'axe y
                beginAtZero: true,
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
            borderColor: '#03fcbe',
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(3, 252, 190, 0.1)',
            tension: 0.35,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            x: {
                type: 'linear',
                ticks: {
                    stepSize: 10 // Ajuster si nécessaire pour mieux espacer les ticks
                },
                title: {
                    display: true,
                    text: 'Time (seconds)' // X-axis title with units
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
    fetch('/get_data')
        .then(response => response.json())
        .then(jsonData => {
            t_last = jsonData.t;
            kx_last = jsonData.kx;
            ky_last = jsonData.ky;
            if(!(chartKx.data.labels.includes(t_last)))
            {
                chartKx.data.labels.push(t_last);
                chartKx.data.datasets[0].data.push(kx_last);
                console.log("Données après mise à jour - Kx:", kx_last);
            }
            if(!(chartKy.data.labels.includes(t_last)))
            {
                chartKy.data.labels.push(t_last);
                chartKy.data.datasets[0].data.push(ky_last);
                console.log("Données après mise à jour - Ky:", ky_last);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du fichier JSON :', error);
        });
    chartKx.update('active');
    chartKy.update('active');
}


let commandRoutineId = setInterval(func = updateCharts, delay = 500)