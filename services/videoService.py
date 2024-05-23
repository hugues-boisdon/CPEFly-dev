import cv2, subprocess


# Open the webcam (index 0)
camera = cv2.VideoCapture(0)

def generate_frames():
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()
        if not success:
            break
        else:
            # Encode the frame in JPEG format
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            # Concatenate frame one by one and show result as streaming
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            
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

