from flask import Flask, render_template, request, url_for
app = Flask(__name__)

@app.route('/')
def mainPage():
   return render_template('main.html')

@app.route('/info')
def infoPage():
   if request.method == "GET":
      return render_template("info.html")



if __name__ == '__main__':
   app.run()