from flask import Flask,jsonify, request, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model
from data import get_nutritional_info

from fastapi import FastAPI
from pydantic import BaseModel,conlist
from typing import List,Optional
import pandas as pd
from prediction_model.model import recommend,output_recommended_recipes


dataset=pd.read_csv('./prediction_model/dataset.csv',compression='gzip')
class params(BaseModel):
    n_neighbors:int=5
    return_distance:bool=False

class PredictionIn(BaseModel):
    nutrition_input:conlist(float, min_items=9, max_items=9)
    ingredients:List[str]=[]
    params:Optional[params]


class Recipe(BaseModel):
    Name:str
    CookTime:str
    PrepTime:str
    TotalTime:str
    RecipeIngredientParts:List[str]
    Calories:float
    FatContent:float
    SaturatedFatContent:float
    CholesterolContent:float
    SodiumContent:float
    CarbohydrateContent:float
    FiberContent:float
    SugarContent:float
    ProteinContent:float
    RecipeInstructions:List[str]

class PredictionOut(BaseModel):
    output: Optional[List[Recipe]] = None

def create_foodlist():
    list_=['apple_pie', 'baby_back_ribs', 'baklava', 'beef_carpaccio',
     'beef_tartare', 'beet_salad', 'beignets', 'bibimbap', 'bread_pudding',
      'breakfast_burrito', 'bruschetta', 'caesar_salad', 'cannoli', 'caprese_salad',
       'carrot_cake', 'ceviche', 'cheese_plate', 'cheesecake', 'chicken_curry', 'chicken_quesadilla',
        'chicken_wings', 'chocolate_cake', 'chocolate_mousse', 'churros', 'clam_chowder', 'club_sandwich',
         'crab_cakes', 'creme_brulee', 'croque_madame', 'cup_cakes', 'deviled_eggs', 'donuts', 'dumplings', 
         'edamame', 'eggs_benedict', 'escargots', 'falafel', 'filet_mignon', 'fish_and_chips', 'foie_gras',
          'french_fries', 'french_onion_soup', 'french_toast', 'fried_calamari', 'fried_rice', 'frozen_yogurt',
           'garlic_bread', 'gnocchi', 'greek_salad', 'grilled_cheese_sandwich', 'grilled_salmon', 'guacamole', 'gyoza', 
           'hamburger', 'hot_and_sour_soup', 'hot_dog', 'huevos_rancheros', 'hummus', 'ice_cream', 'lasagna', 
           'lobster_bisque', 'lobster_roll_sandwich', 'macaroni_and_cheese', 'macarons', 'miso_soup', 'mussels',
            'nachos', 'omelette', 'onion_rings', 'oysters', 'pad_thai', 'paella', 'pancakes', 'panna_cotta', 
            'peking_duck', 'pho', 'pizza', 'pork_chop', 'poutine', 'prime_rib', 'pulled_pork_sandwich', 'ramen', 
            'ravioli', 'red_velvet_cake', 'risotto', 'samosa', 'sashimi', 'scallops', 'seaweed_salad', 'shrimp_and_grits',
             'spaghetti_bolognese', 'spaghetti_carbonara', 'spring_rolls', 'steak', 'strawberry_shortcake',
              'sushi', 'tacos', 'takoyaki', 'tiramisu', 'tuna_tartare', 'waffles']
    return list_

ALLOWED_EXTENSIONS = set([ 'png', 'jpg', 'jpeg'])

app = Flask(__name__)
CORS(app)

# req:post , url:'/upload', body:: {file:image(blob),filename:string}, res:{value:string(pred_response),cal:{Carbohydrate:number,protein:number,fat:number}}
@app.route('/upload', methods=['POST'])

def fileUpload():
    # uploading file to destination folder
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination="/".join(['static', filename])
    file.save(destination)

    # load the model
    
    model = load_model('model_trained.h5', compile = False)
    #model = load_model('model_trained_101class.hdf5', compile = False)

    #image resizin
    img = image.load_img(destination, target_size=(299, 299))
    img = image.img_to_array(img)                    
    img = np.expand_dims(img, axis=0)         
    img /= 255.                                      

    pred = model.predict(img)
    index = np.argmax(pred)
    val= np.amax(pred)
    print(val)
    pred_value = food_list[index]
    if val<0.2:
        pred_value="Not a food item !"
        print(pred_value)
        return jsonify({'value':pred_value})
    ret={'value':pred_value,'cal':get_nutritional_info(pred_value)}
    print(ret)
    return ret

@app.route('/predict', methods=['POST'])
def update_item():
    ingredients=request.form['ingredients'].split(";")
    print(ingredients)
    recommendation_dataframe=recommend(dataset,(1,1,2,3,4,4,5,6,7),ingredients)
    output=output_recommended_recipes(recommendation_dataframe)
    if output is None:
        return jsonify({"output":None})
    else:
        return {"output":output}

if __name__ == "__main__":
    food_list = create_foodlist()
    app.run(debug=True,host="0.0.0.0",use_reloader=False)
