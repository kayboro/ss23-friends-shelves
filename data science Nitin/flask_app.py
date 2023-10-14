from flask import flask, render_template
import pickle
app = flask(__name__)

#### load the model from the .pk file 
with open('linear_regression_model.pkl', 'rb') as file:
  loaded_model = pickle.load(file)


@app.route('/')
def index():
  return  render_template('index.html')

if __name__== '__main__':
  app.run(debug = True)