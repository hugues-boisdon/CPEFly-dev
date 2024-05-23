const ctxKx = document.getElementById('canvasKx').getContext('2d');;
const ctxKy = document.getElementById('canvasKy').getContext('2d');;

// Création des graphiques Chart.js avec des données initiales vides

Kx = {
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
}

Ky = {
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
}
options = {
    responsive: true,
    animation: false,
    scales: {
        x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                callback: function(value, index, ticks) {
                    vals = this.getLabelForValue(value).replace(".",":").split(':');
                    return vals[0]+'h'+vals[1]+"m "+vals[2]+'.'+vals[3][0]+"s"
                }
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: "Point"
            }
        },
        y: {
            display: true,
            scaleLabel: {
                display: true,
                labelString: "Value",
            },
            suggestedMin: 0,
            suggestedMax: 100
        }
    }
}


const chartKx = new Chart(
    ctxKx, 
    {
        type: 'line',
        data: Kx,
        options: options
    }
);

const chartKy = new Chart(
    ctxKy, 
    {
        type: 'line',
        data: Ky,
        options: options
    }
);


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
            }
            if(!(chartKy.data.labels.includes(t_last)))
            {
                chartKy.data.labels.push(t_last);
                chartKy.data.datasets[0].data.push(ky_last);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du fichier JSON :', error);
        });
    chartKx.update('active');
    chartKy.update('active');
}


let commandRoutineId = setInterval(func = updateCharts, delay = 50)