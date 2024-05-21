import subprocess

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