import serial
import json

# 'COM3' à remplacer par le port série du périphérique
ser = serial.Serial('COM3', 9600)

t = []
kx = []
ky = []

while True:

    #si les données sont envoyées sous la forme (kx ; ky)
    data = ser.readline().decode().strip()
    kx_val, ky_val = map(float, data.strip('()').split(';'))
    kx.append(kx_val)
    ky.append(ky_val)
    t.append(len(t) + 1)

    # exportation des données vers data.json
    with open('data.json', 'w') as f:
        json.dump({'t': t, 'kx': kx, 'ky': ky}, f)