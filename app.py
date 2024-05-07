from flask import Flask, render_template, request, url_for, jsonify, Response

app = Flask(__name__)

@app.route('/')
def mainPage():
   return render_template('main.html')

@app.route('/info')
def infoPage():
   if request.method == "GET":
      return render_template("info.html")
   
@app.route('/data')
def dataPage():
   if request.method == "GET":
      return render_template("data.html")

@app.route('/command', methods=['POST']) 
def receiveMoveCommand(): 
    data = request.get_json() 
    print(f'received Command: {data}\n')
    return jsonify(result=data)

if __name__ == '__main__':
   app.run()