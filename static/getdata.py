import serial
import json

# Remplacez 'COM7' par le port série du périphérique
ser = serial.Serial('COM7', 115200)

t = []
kx = []
ky = []
d = []

counter = 0

while True:
    # Si les données sont envoyées sous la forme (kx ; ky ; d)
    data = ser.readline().decode().strip()
    print("Données reçues:", data)
    
    # Nettoyage des données
    cleaned_data = ''.join(char if char.isdigit() or char in ['-', '.', ';'] else ' ' for char in data)
    values = cleaned_data.strip().split(';')

    # Assurez-vous que la chaîne de données contient tous les éléments attendus
    if len(values) == 3:
        kx_val, ky_val, d_val = values[0], values[1].replace('-', ''), values[2]

        if counter % 5 == 0:
            # Enregistrer les données
            kx.append(float(kx_val))
            ky.append(float(ky_val))
            d.append(float(d_val))
            t.append(len(t) + 1)
            
            # Exportation des données vers data.json
            with open('data.json', 'w') as f:
                # Création de la liste des données formatées en colonnes
                formatted_data = [{'t': t_val, 'data': '{:.1f};{:.1f};{:.1f}'.format(kx_val, ky_val, d_val)} for t_val, kx_val, ky_val, d_val in zip(t, kx, ky, d)]
                json.dump(formatted_data, f, indent=4)  # Indentation pour une meilleure lisibilité
                print("Données enregistrées dans data.json:")
                for item in formatted_data:
                    print(item)  # Afficher chaque élément dans la console

        counter += 1