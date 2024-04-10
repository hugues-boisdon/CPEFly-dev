from flask import Flask, Response
import subprocess

app = Flask(__name__)

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

@app.route('/video_feed')
def video_feed():
    # MIME type peut varier selon le format de sortie de votre flux vidéo
    return Response(gen_frames(), mimetype='video/h264')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)