import React, { useEffect, useState } from 'react'
import Typewrite from './typewrite'
export default function personalmodel({ type,body }) {
    const [input, setinput] = useState(null)
    useEffect(() => {
        var ip = 'This recipe is predicted considering your diet goal<br/><br/>'
       var ip = body.map((val, index) => (ip + '<strong>' + val.Name + '</strong><br/><br/>' + '<strong>Ingredient : </strong>' + val.RecipeIngredientParts.join(',') +
            '<br/><br/><strong> Calories : </strong>' + val.Calories + '<br/><strong> Fat : </strong>' + val.SaturatedFatContent + '<br/><strong> Carbohydrate : </strong>' + val.CarbohydrateContent + '<br/><strong> Protein : </strong>' + val.ProteinContent +
            '<br/><br/><strong> Preparation</strong><br/>' + val.RecipeInstructions.map((ing, index) => (index + 1 + ": " + ing+'<br/>'))+'<br/><br/>'))
        setinput(ip)
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
                body.map((val, index) => (<div>
                    <strong> {val.Name} </strong><br/><br/>
                    <strong>Ingredient : </strong> {val.RecipeIngredientParts.join(',')}
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
