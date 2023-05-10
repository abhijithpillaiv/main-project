import React, { useState } from 'react'
import "./posts.css";
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { port } from "../../../context/collection";
import { useCookies } from 'react-cookie';
import {cookie} from '../../../context/collection'
import axios from "axios";
import { CModal,CButton, CModalHeader, CModalTitle,CModalFooter, CModalBody } from "@coreui/react";

export default function Posts({setsrch,srch,posts}) {
  const [cookies,] = useCookies([cookie]);
  const [gram, setgram] = React.useState(100)
  const [visible, setVisible] = useState(false)

  const clickhandler=(post)=>{
    setsinglePost(true)
    setsrch(false)
    setrec(post)
    console.log(post);
  }
  useEffect(() => {
    if(srch){
      setsinglePost(false)
    }
  }, [srch])
  

  const clickHandleradd = (rec) => {
    setVisible(!visible)
    const today=new Date().toLocaleString().split(',')[0]

    // Data cleaning before update
    rec.recipe.calories=(rec.recipe.calories/rec.recipe.totalWeight)*gram
    for (let index = 0; index < 6; index++) {
      rec.recipe.digest[index].total=(rec.recipe.digest[index].total/rec.recipe.totalWeight)*gram
    }
    let nut_val={'calories':rec.recipe.calories,'fat':rec.recipe.digest[0].total,'protein':rec.recipe.digest[2].total,'carb':rec.recipe.digest[1].total}
    delete rec.recipe.totalNutrients
    delete rec.recipe.totalDaily
    delete rec.recipe.totalTime
    delete rec.recipe.yield
    delete rec.recipe.dietLabels
    delete rec.recipe.cautions
    delete rec.recipe.ingredients
    delete rec.recipe.uri
    delete rec.recipe.images
    delete rec.recipe.source
    delete rec.recipe.url
    delete rec.recipe.shareAs
    delete rec.recipe.mealType
    delete rec.recipe.dishType
    rec.recipe.gram=gram

    const data ={date:today,id:cookies.data1,nut_val:nut_val,rec:rec}
    if (cookies.data1) {
      axios.post(port + "/food/setfood/",data).then((res) => {
        window.alert(rec.recipe.label+" has been added to today's meal.")
      });    
   }
    
    }
  
  const [singlePost, setsinglePost] = useState(false)
  const [rec, setrec] = useState(null)
  return !singlePost?
    <div className="posts">
      {posts ? posts.hits.map((post) => (
         <div className="post">
         <img className="postImg" src={post.recipe.image} alt="image" />
         <div className="postInfo">
             <span onClick={()=>clickhandler(post)} className="postTitle">{post.recipe.label}</span>
           <hr />
         </div>
   
       </div>
      )) : <h1> Waiting for the post</h1>}
    </div>
  :
  // Single post section
<div style={{paddingTop:'20px'}} className=" singlePost container-fluid">
  <div className="singlePostWrapper row">
    <div className="col-12">
        <img style={{ height: '100%', width: 'auto' }} src={rec.recipe.image} alt="" className="singlePostImg imag" />
    </div>
    <div className="col-12 singlepost-label">
      <div style={{textAlign:'center'}} className='singlePostHeading'>{rec.recipe.label}</div>
      <Button onClick={()=>clickHandleradd(rec)} className='col-2 btn' size="sm" variant="outline-success">Add food</Button>
    </div>
  </div>
  <div className='row'>
    <div className='col-6 singlepost-left'>
      <div className='singlepost-left-item1'>
        <div className='singlepost-headding'>
          Nutrient Info
        </div>
        <div className='singlepost-item-main container'>
          {rec.recipe.digest.map((item)=>(
          <div className='row'>
              <span className='col-4 singlepost-item-label'>
              {item.label}</span><span className='col-2'>:</span> <span className='col-6 singlepost-item-value'>
            {item.total.toFixed(2)}
          </span>
            </div>
          ))}
        </div>
      </div>
     <div className='singlepost-right-item2'>
        <div className='singlepost-headding'>
          Caution
        </div>
        <ul className='singlepost-item-main container'>
          {rec.recipe.cautions.map(item=><li>{item}</li>)}
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
      <div className='singlepost-left-item2'>
      <div className='singlepost-headding'>
          Health Labels
        </div>
        <ul>{rec.recipe.healthLabels.map(item=><li>{item}</li>)}</ul>
      </div>
    </div>
  </div>
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Set gram</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Set the amount you eat (in grams) default value is set to 100g
        <input type='number' value={gram} onChange={(e)=>setgram(e.target.value)}></input>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
</div>
}
