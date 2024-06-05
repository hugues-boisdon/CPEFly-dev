import serial, json, os, random, time
from datetime import datetime
import logging


filePath = ""
topOfFile = True

def getFilePath():
    global filePath
    return filePath

def getNewFilePath():
    global filePath; global startTime; global topOfFile
    dt = datetime.now().strftime(r'%d_%m_%Y')
    c = 0
    for file in os.listdir(r'./data/'):
        cPrim = file.replace(dt,'').split('.')[0].replace('_','')
        if(cPrim.isdigit() and (int)(cPrim) >= c):
            c = (int)(cPrim)+1
    filePath = f"./data/{dt}_{c}.json"
    topOfFile = True
    saveDataFile()


def delete_last_line(filename):
    with open(filename, 'r+b') as file:
        file.seek(0, 2)
        end_pos = file.tell() 
        if end_pos == 0: 
            return
        pos = end_pos - 1 
        while pos > 0:
            file.seek(pos)
            if file.read(1) == b'\n': 
                break
            pos -= 1
        if pos == 0: 
            file.seek(0)
        file.truncate(pos) 
        

def saveDataFile():
    global filePath; global topOfFile
    global t; global kx; global ky; global d     
    try: 
        with(open(filePath, 'x')) as f:
            f.write("[\n")
    except FileExistsError: 
        delete_last_line(filePath)
        with(open(filePath, 'a')) as f:
            formatted_data = [{'t': t_val, 'kx': kx_val, 'ky': ky_val, 'd': d_val } for t_val, kx_val, ky_val, d_val in zip(t, kx, ky, d)]
                        
            formatted_str = json.dumps(formatted_data, indent=4)
            if(topOfFile): 
                f.writelines(formatted_str[1:])
                topOfFile = False
            else : f.writelines(','+formatted_str[1:])
            t = [t[-1]];kx = [kx[-1]];ky = [ky[-1]];d = [d[-1]]

logged = False
connected = False
    
t =  [None]
kx = [None]
ky = [None]
d =  [None]

def receiveData():
    global t; global kx; global ky; global d; global logged; global connected
    try :
        port = 2
        ser = serial.Serial('COM7', 115200)
        logging("trying")

        # data sous la forme (kx ; ky ; d)
        data = ser.readline().decode().strip()
        if (not connected) or (not logged):
            logging("SERIAL_CONNECTED_ON_PORT_{port}")
            logged=True
            connected=True
        
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
            t.append(datetime.now().strftime(r'%H:%M:%S.%f'))
    except:
        if (not logged) or (connected and logged):
            logging.warning("SERIAL_NOT_CONNECTED")
            logged = True
            connected = False
        kx.append(None)
        ky.append(None)
        d.append(None)
        t.append(datetime.now().strftime(r'%H:%M:%S.%f'))
        
def receiveDataFAKE():
    global t; global kx; global ky; global d
    # Enregistrer les données
    kx.append(float(random.randint(42,48)))
    ky.append(float(random.randint(42,48)))
    d.append(float(random.randint(42,48)))
    t.append(datetime.now().strftime(r'%H:%M:%S.%f'))

def getLastData():
    data = {
    "t":  t[-1],
    "kx": kx[-1],
    "ky": ky[-1],
    "d":  d[-1]}
    return json.dumps(data)
                
                
