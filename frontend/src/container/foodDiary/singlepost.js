import React from 'react'
import '../blog/posts/posts.css'
export default function singlepost({rec}) {
  return (
    <div style={{paddingTop:'20px'}} className=" singlePost container-fluid">
        <div className=" singlePostWrapper row">
              <img style={{ height: '130px', width: 'auto' }} src={rec.recipe.image} alt="" className="singlePostImg imag" />
          <div className="col-12 singlepost-label">
            <div style={{textAlign:'center'}} className='singlePostHeading'>{rec.recipe.label}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6 singlepost-left'>
            <div className='singlepost-left-item1'>
              <div className='singlepost-headding'>
                Nutrient Info
              </div>
              <div className='singlepost-item-main container'>
                {rec.recipe.digest.map((item,index)=> index<6&&<div className='row'>
                    <span className='col-4 singlepost-item-label'>
                    {item.label}</span><span className='col-2'>:</span> <span className='col-6 singlepost-item-value'>
                  {item.total.toFixed(2)}
                </span>
                  </div>
                )}
              </div>
            </div>
           <div className='singlepost-right-item2'>
              <div className='singlepost-headding'>
              Health Labels
              </div>
              <ul className='singlepost-item-main container'>
              {rec.recipe.healthLabels.map(item=><li>{item}</li>)}
                            </ul>
            </div>
          </div>
          <div className='col-6 singlepost-right'>
          <div className='singlepost-right-item1'>
              <div className='singlepost-headding'>
                Cuisine Type
              </div>
              <ul className='singlepost-item-main container'>
                {rec.recipe.cuisineType.map(item=><li>{item}</li>)}
              </ul>
            </div>
            
            <div className='singlepost-right-item3'>
              <div className='singlepost-headding'>
                Ingredients
              </div>
              <ol className='singlepost-item-main container'>
                {rec.recipe.ingredientLines.map(item=><li>{item}</li>)}
              </ol>
            </div>
          </div>
        </div>
      </div>
  )
}
