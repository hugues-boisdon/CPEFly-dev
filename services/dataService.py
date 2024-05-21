import serial, json, time, os, random

filePath = ""

def getFilePath():
    global filePath
    return filePath

def getNewFilePath():
    global filePath; global startTime
    startTime = time.time()
    t = time.strftime("%Y-%m-%d", time.localtime(time.time()))
    c = 0
    for file in os.listdir(r'./data/'):
        cPrim = file.replace(t,'').split('.')[0].replace('_','')
        if(cPrim.isdigit() and (int)(cPrim) >= c):
            c = (int)(cPrim)+1
    filePath = f"./data/{t}_{c}.json"
    saveDataFile()

def saveDataFile():
    global filePath
    global t; global kx; global ky; global d     
    with(open(filePath, 'w')) as f:
        formatted_data = [{'t': t_val, 'kx': kx_val, 'ky': ky_val, 'd': d_val } for t_val, kx_val, ky_val, d_val in zip(t, kx, ky, d)]
        json.dump(formatted_data, f, indent=4)

t = []
kx = []
ky = []
d = []
def receiveData():
    global t; global kx; global ky; global d
    ser = serial.Serial('COM7', 115200)

    # data sous la forme (kx ; ky ; d)
    data = ser.readline().decode().strip()
    print("Données reçues: ", data)
    
    # Nettoyage des données
    cleaned_data = ''.join(char if char.isdigit() or char in ['-', '.', ';'] else ' ' for char in data)
    values = cleaned_data.strip().split(';')

    # Assurez-vous que la chaîne de données contient tous les éléments attendus
    if len(values) == 3:
        kx_val, ky_val, d_val = values[0], values[1].replace('-', ''), values[2]

        # Enregistrer les données
        kx.append(float(kx_val))
        ky.append(float(ky_val))
        d.append(float(d_val))
        t.append(time.time()-startTime)
        
def receiveDataFAKE():
    global t; global kx; global ky; global d
    # Enregistrer les données
    kx.append(float(random.randint(42,48)))
    ky.append(float(random.randint(42,48)))
    d.append(float(random.randint(42,48)))
    t.append(time.time()-startTime)

def getLastData():
    data = {
    "t":  t[-1],
    "kx": kx[-1],
    "ky": ky[-1],
    "d":  d[-1]}
    return json.dumps(data)
                
                
