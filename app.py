import json
from flask import Flask, render_template, request, url_for, jsonify, Response, redirect 
# from flask_apscheduler import APScheduler
import subprocess
import serial

# import getdata as transmissionController
from time import time

# class Config:
#     SCHEDULER_API_ENABLED = True

app = Flask(__name__)
# app.config.from_object(Config())
# scheduler = APScheduler()
# scheduler.init_app(app)

# Routing

@app.route('/')
def mainPage():
   return render_template('index.html')


@app.route('/info')
def infoPage():
   if request.method == "GET":
      return render_template("info.html")
   
   
@app.route('/data')
def dataPage():
   # rdiriger vers chart (local)
   if request.method == "GET":
      return render_template('chart.html')


@app.route('/command', methods=['POST']) 
def receiveMoveCommand(): 
   data = request.get_json() 
   print(f'{data}\n')
   return jsonify(result=data)
 
 
@app.route('/log', methods=['POST']) 
def log(): 
   data = request.get_json() 
   print(f'{data}\n')
   return jsonify(result = data)


@app.route('/video_feed')
def video_feed():
   # MIME type peut varier selon le format de sortie de votre flux vidéo
   return Response(gen_frames(), mimetype='video/h264')


#video feed method
def gen_frames():  
   # Commande libcamera-vid pour capturer la vidéo
   # Utilisation de `-t 0` pour un flux continu, `-o -` pour sortir sur stdout
   cmd = "libcamera-vid -t 0 -o -"
   p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)

   while True:
      # Lire le flux de stdout de libcamera-vid
      data = p.stdout.read(1024)
      if not data:
         break
      yield (data)
      
""" 
timer = 0
@scheduler.task('interval', id='do_data_transmission', seconds=5)
def data_transmission():
   transmissionController.receiveData(timer)
   timer += 1
    """

# @app.route('/updateCharts')
# def update_charts():
#    with open('data.json') as f:
#       data = json.load(f)
#    return data

@app.route('/get_data')
def get_data():
    ser = serial.Serial('COM7', 115200)
    data = ser.readline().decode().strip()
    
    # Nettoyage des données
    cleaned_data = ''.join(char if char.isdigit() or char in ['-', '.', ';'] else ' ' for char in data)
    values = cleaned_data.strip().split(';')
    
    # Assurez-vous que la chaîne de données contient tous les éléments attendus
    if len(values) == 3:
        kx_val, ky_val, d_val = values[0], values[1].replace('-', ''), values[2]
        formatted_data = {'kx': float(kx_val), 'ky': float(ky_val), 'd': float(d_val)}
        return jsonify(formatted_data)
    else:
        return jsonify({'error': 'Invalid data format'})



if __name__ == '__main__':
   # scheduler.start()
   app.run()