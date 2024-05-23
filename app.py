import json
from flask import Flask, render_template, request, url_for, jsonify, Response, redirect 
from flask_apscheduler import APScheduler
from time import time


import services.dataService as dataService
import services.videoService as videoService


from importlib import import_module
import os
from picamera2 import picamera2

# import camera driver
if os.environ.get('CAMERA'):
    Camera = import_module('camera_' + os.environ['CAMERA']).Camera
else:
    from camera import Camera


class Config:
   FLASK_DEBUG = True
   
   SCHEDULER_API_ENABLED: bool = True
   SCHEDULER_API_PREFIX: str = "/scheduler"
   SCHEDULER_ENDPOINT_PREFIX: str = "scheduler."
   SCHEDULER_ALLOWED_HOSTS: list = ["*"]
   SCHEDULER_JOBSTORES: dict
   SCHEDULER_EXECUTORS: dict
   SCHEDULER_JOB_DEFAULTS: dict
   SCHEDULER_TIMEZONE: dict

dataService.getNewFilePath()

app = Flask(__name__)
app.config.from_object(Config())

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()


# Routing

@app.route('/')
def mainPage():
   return render_template('index.html')

   
   
@app.route('/data')
def dataPage():
   if request.method == "GET":
      return render_template('chart.html')


@app.route('/command', methods=['POST']) 
def receiveMoveCommand(): 
   command = request.get_json() 
   print(f'{command}\n')
   return jsonify(result = command)
 
 
@app.route('/log', methods=['POST']) 
def log(): 
   message = request.get_json() 
   print(f'{message}\n')
   return jsonify(result = message)


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


@app.route('/get_data')
def get_data():
   return dataService.getLastData()

# Scheduled tasks
      
"""
@scheduler.task('interval', id='data_receive', seconds=1)
def data_receive():
   dataService.receiveData()
"""

@scheduler.task('interval', id='data_receive_fake', seconds=0.1)
def data_receive_fake():
   dataService.receiveDataFAKE()


@scheduler.task('interval', id='data_save', seconds=2)
def data_save():
   dataService.saveDataFile()
   print("[Data Saved Succesfully!]")



if __name__ == '__main__':
   app.run(debug=True, host="0.0.0.0")
