const ctxKx = document.getElementById('canvasKx');
const ctxKy = document.getElementById('canvasKy');

console.log("Live Server fonctionne correctement et les fichiers sont bien reliés !");

// Données fictives 
const t = [1, 2, 3, 4, 5, 6]; 
const kx = [0.5, 0.8, 1.2, 1.5, 1.7, 2.0]; 
const ky = [0.3, 0.6, 0.9, 1.2, 1.5, 1.8]; 

console.log("Données pour la première courbe (Kx):", t.map((value, index) => ({ t: value, Kx: kx[index] })));
console.log("Données pour la deuxième courbe (Ky):", t.map((value, index) => ({ t: value, Ky: ky[index] })));

new Chart(ctxKx, {
    type: 'line', 
    data: {
        labels: t, 
        datasets: [{
            label: 'Kx',
            data: kx, 
            borderColor: 'red', 
            borderWidth: 1,
            fill: false 
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

new Chart(ctxKy, {
    type: 'line', 
    data: {
        labels: t, 
        datasets: [{
            label: 'Ky',
            data: ky, 
            borderColor: 'blue', 
            borderWidth: 1,
            fill: false 
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


// Charger les données à partir du fichier JSON
// fetch('data.json')
//   .then(response => response.json())
//   .then(data => {
//     const t = data.t;
//     const kx = data.kx;
//     const ky = data.ky;
    // console.log("Données pour t :", t);
    // console.log("Données pour Kx :", kx);
    // console.log("Données pour Ky :", ky);