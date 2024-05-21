from flask import Flask, render_template, request, url_for, jsonify, Response, redirect
import subprocess

app = Flask(__name__)

# Routing

@app.route('/')
def mainPage():
   return render_template('index.html')

@app.route('/info')
def infoPage():
   if request.method == "GET":
      return render_template("info.html")
   
# @app.route('/data')
# def dataPage():
#    if request.method == "GET":
#       return render_template("data.html")
   
@app.route('/data')
def dataPage():
   # Rediriger vers l'URL de Live Server (remplacez le port si nécessaire)
   return render_template('chart.html')

@app.route('/command', methods=['POST']) 
def receiveMoveCommand(): 
   data = request.get_json() 
   print(f'received Command: {data}\n')
   return jsonify(result=data)
 
@app.route('/log', methods=['POST']) 
def log(): 
   data = request.get_json() 
   print(f'{data}\n')
   return jsonify(data)

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



if __name__ == '__main__':
   app.run()