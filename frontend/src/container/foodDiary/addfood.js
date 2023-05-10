import React from "react";
import FoodTable  from "./foodtable_addfood";
import Search from "../../components/search/index";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import DD from "../../components/search/dropdown";
import axios from "axios";
import add from '../../assets/add.png'
import { CChart } from '@coreui/react-chartjs'
import {CSpinner} from '@coreui/react';
import { Link } from 'react-router-dom';

export default function Addfood() {
  const [recip, setrecip] = useState(null);
  const [diet, setdiet] = useState([]);
  const [res, setres] = useState([]);

  const [img, setimg] = useState(null);
  const [Preview, setPreview] = useState('');
  const [toggle, settoggle] = useState(null);

  const clickHandler = () => {
    var join = diet.join("");
    axios
      .get(
        "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          recip +
          "&app_id=d2645311&app_key=905c24c8760889ee37fccc59931366f0" +
          join
      )
      .then((response) => {
        setres(response.data.hits);
      });
  };

  const handleUploadImage = async() => {
    settoggle(true)
    const data = new FormData();
    data.append('file', img);
    data.append('filename', 'filename');
    axios({
        method: "post",
        url: 'http://localhost:5000/upload',
         data: data,
    }).then((response) => {
      if (response.data.value.includes('_')) {
        setrecip(response.data.value.replace(/_/g, " "))
      }
        clickHandler()
        settoggle(false)
    })
}
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 fooddiary-left">
          <div className="fooddiary-date fooddiary-item">
            <div className="container-fluid blog-search">
              <div className="row">
                <div className="col-9">
                  <Search setrecipe={setrecip} />
                </div>
                <div className="addfood-search-btn col-3">
                  <Button
                    onClick={clickHandler}
                    className="addfood-btn"
                    size="sm"
                    variant="outline-success"
                  >
                    Search
                  </Button>
                </div>
              </div>
              <div className="row">
                <div style={{ paddingTop: "6px" }} className="col-12">
                  <DD setdiet={setdiet} />
                </div>
              </div>
            </div>
          </div>
          <div className="fooddiary-date fooddiary-item">
            <div className="fooddiary-headding">Upload image:</div>
            <div style={{ padding: '10px' }}>
                            <img style={{ height: '100px', width: 'auto' }} src={Preview ? Preview : add} alt="img" />
                            <div style={{ paddingTop: '50px' }}>
                                <input onChange={(e) => { setimg(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])) }} type="file" />
                            </div>
                            <br />
                            <div >
                                <button onClick={handleUploadImage} className='btn btn-success'>Upload</button>
                                {toggle?<span style={{paddingLeft:'30px'}}><CSpinner size='sm' color="danger"/></span>:null}
                            </div>
                        </div>
          </div>
          <div>
            
          </div>
        </div>
        <div className="col-8 fooddiary-mid">
          <div className="fooddiary-min-heading "> FOOD ITEMS</div>
          <FoodTable res={res} />
        </div>
      </div>
    </div>
  );
}
