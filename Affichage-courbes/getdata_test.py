import serial
import json

# Remplacez 'COM7' par le port série approprié
ser = serial.Serial('COM7', 115200)

data_list = []

try:
    while True:
        # Lire les données brutes du port série
        data = ser.readline().decode().strip()
        print(f"Received data: {data}")  # Journalisation des données reçues pour débogage

        # Ajouter les données brutes à la liste
        data_list.append(data)
        print(f"Current data list: {data_list}")  # Vérifiez que les données sont bien ajoutées

        # Écrire les données dans le fichier JSON
        with open('data.json', 'w') as f:
            json.dump(data_list, f, indent=4)
        print(f"Data written to data.json: {len(data_list)} entries")  # Confirmer l'écriture

except KeyboardInterrupt:
    # Écriture finale des données en cas d'interruption
    with open('data.json', 'w+') as f:
        data = json.dumps(data_list)
        f.write(data)

    print("Final data written to data.json (Contr+C)")

finally:
    ser.close()
    print("Serial port closed")

