import React, { useEffect, useState } from 'react'
import Typewrite from './typewrite'
import './bot.css'
import { Link } from 'react-router-dom';

export default function personalmodel({ type,body }) {
    const [input, setinput] = useState(null)
    useEffect(() => {
        if (body) {
            var ip = 'This recipe is predicted considering your diet goal<br/><br/>'
       var ip = body.map((val, index) => (ip + '<strong><a hreaf="http://localhost:3000/blog/'+val.name+'">' + val.Name + '</a></strong><br/><br/>' + '<strong>Ingredient : </strong>' + val.RecipeIngredientParts.join(', ') +
            '<br/><br/><strong> Calories : </strong>' + val.Calories + '<br/><strong> Fat : </strong>' + val.SaturatedFatContent + '<br/><strong> Carbohydrate : </strong>' + val.CarbohydrateContent + '<br/><strong> Protein : </strong>' + val.ProteinContent +
            '<br/><br/><strong> Preparation</strong><br/>' + val.RecipeInstructions.map((ing, index) => (index + 1 + ": " + ing+'<br/>'))+'<br/><br/>'))
        setinput(ip)
        }
        else{
            setinput("Sorry, as an AI model, I am not trained to answer this query. For any other queries related to food, feel free to contact Admin")
        }
        console.log(body);
    }, [body])

    return (
        <div id="cm-msg" className="chat-msg self">
            <span className="msg-avatar">
                <img
                    src="https://abhijithpillaiv.github.io/PersonalWebsite/assets/img/favicon.png"
                    alt=""
                />
            </span>
            <div className="cm-msg-text">
                {type?<Typewrite msg={input}/>:
                body.map((val, index) => (<div key={index}>
                    <strong><Link to={`/blog/${val.Name}`} className='personalmodel-title'>{val.Name}</Link> </strong><br/><br/>
                    <strong>Ingredient : </strong> {val.RecipeIngredientParts.join(', ')}
                    <br/><br/><strong> Calories : </strong> {val.Calories} <br/>
                    <strong> Fat : </strong> {val.SaturatedFatContent}<br/>
                    <strong> Carbohydrate : </strong> {val.CarbohydrateContent}<br/>
                    <strong> Protein : </strong> {val.ProteinContent}
                     <br/><br/><strong> Preparation</strong><br/> {val.RecipeInstructions.map((ing, index) => (<span>{index + 1} : {ing}<br/></span>))}
                     <br/><br/>
                </div>))
                }
            </div>
        </div>
    )
}
