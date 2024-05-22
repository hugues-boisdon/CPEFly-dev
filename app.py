import json
from flask import Flask, render_template, request, url_for, jsonify, Response, redirect 
# from flask_apscheduler import APScheduler
import subprocess
import serial
from importlib import import_module
import os
from picamera2 import picamera2

# import camera driver
if os.environ.get('CAMERA'):
    Camera = import_module('camera_' + os.environ['CAMERA']).Camera
else:
    from camera import Camera

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


def gen(camera):
    """Video streaming generator function."""
    yield b'--frame\r\n'
    while True:
        frame = camera.get_frame()
        yield b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n--frame\r\n'


@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
      
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