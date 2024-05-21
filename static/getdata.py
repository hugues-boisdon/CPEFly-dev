import serial
import json

# 'COM3' à remplacer par le port série du périphérique

ser = serial.Serial('COM7', 115200)

t = []
kx = []
ky = []
d = [] 

counter = 0  # Initialiser un compteur pour suivre les données

while True:
    # Si les données sont envoyées sous la forme (kx ; ky ; d)
    data = ser.readline().decode().strip()
    kx_val, ky_val, d_val = map(float, data.strip('()').split(';'))
    if counter == 0:  # Enregistrer une donnée sur dix
        kx.append(kx_val)

        ky.append(ky_val)
        d.append(d_val)
        t.append(len(t) + 1)
    counter = (counter + 1) % 10 

    # Exportation des données vers data.json seulement une fois que les données kx, ky et d sont complètes
    if counter == 0:
        with open('data.json', 'w') as f:
            json.dump({'t': t, 'kx': kx, 'ky': ky, 'd': d}, f)