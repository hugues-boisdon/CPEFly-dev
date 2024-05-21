import serial
import json

# Remplacez 'COM7' par le port série du périphérique
ser = serial.Serial('COM7', 115200)

t = []
kx = []
ky = []
d = []

while True:
    # Si les données sont envoyées sous la forme (kx ; ky ; d)
    data = ser.readline().decode().strip()
    print("Données reçues:", data)
    
    # Nettoyage des données
    cleaned_data = ''.join(char if char.isdigit() or char in ['-', '.', ';'] else ' ' for char in data)
    values = cleaned_data.strip().split(';')
    kx_val, ky_val, d_val = values[0], values[1].replace('-', ''), values[2]

    # Enregistrer les données
    kx.append(float(kx_val))
    ky.append(float(ky_val))
    d.append(float(d_val))
    t.append(len(t) + 1)

    # Exportation des données vers data.json
    with open('data.json', 'w') as f:
        # Formatage des données avec 1 décimale
        formatted_data = ['{:.1f};{:.1f};{:.1f}'.format(kx_val, ky_val, d_val) for kx_val, ky_val, d_val in zip(kx, ky, d)]
        json.dump({'t': t, 'data': formatted_data}, f)
        print("Données enregistrées dans data.json:", formatted_data)




