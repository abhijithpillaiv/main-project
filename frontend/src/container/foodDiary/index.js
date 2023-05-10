import React, { useState } from "react";
import Datepicker from "../../components/datepicker/index";
import { CModal, CModalHeader, CModalTitle, CModalBody } from "@coreui/react";
import { useEffect } from "react";
import "./index.css";
import NutritionChart from "../../components/dropdown/index";
import Linechart from "../../components/lineChart/index";
import FoodTable1 from "./foodtable1";
import Addfood from "./addfood";
import { useCookies } from 'react-cookie';
import {cookie} from '../../context/collection'
import Alert from "../../components/alertCui/index";
import axios from "axios";
import { port } from "../../context/collection";

export default function index() {
  const [date, setdate] = useState(new Date());
  const [nut, setnut] = useState("calories");
  const [visible, setvisible] = useState(false);
  const [datesArray, setdatesArray] = useState([]);
  const [chartval, setchartval] = useState(0)
  const [cookies,] = useCookies([cookie]);
  const [confirm, setconfirm] = useState(false);
  const [fooditems, setfooditems] = useState(null);
  const [local_t_strap, setlocal_t_strap] = useState(new Date())
  const [calorieneed, setcalorieneed] = useState(0)

  useEffect(() => {
    const datesArrays = [];
    const today = local_t_strap;
    for (let i = 6; i >= 0; i--) {
      const prevDate = new Date(today);
      prevDate.setDate(today.getDate() - i);
      const formattedDate = prevDate.toLocaleString().split(',')[0]
      datesArrays.push(formattedDate);
    }
    setdatesArray(datesArrays);
  }, [local_t_strap]);

  useEffect(() => {
    if(cookies.data1&&datesArray.length>=7){
          let data={date:datesArray,id:cookies.data1}
          axios.post(port + "/food/getnutritiondated",data).then((res) => {
            setchartval(res.data)
        });          
      }
  }, [datesArray])


  useEffect(() => {
    if (!cookies.data1) {
      setconfirm(true);
    } else {
      let data={date:date,id:cookies.data1}
      axios.post(port + "/food/getfood/",data).then((res) => {
        setfooditems(res.data);
      });
    }
  }, [cookies,date]);
  useEffect(() => {
    if (cookies.data1) {
        axios.get(port + '/api/getDetails/' + cookies.data1).then((res) => {
            if (res.data) {
                const d=res.data.dietplan
                setcalorieneed(res.data.data.cneed[d])
            }      
        })
    }
}, [cookies])
  

  return (
    <>
      <div className="container-fluid ">
        <div className="row fooddiary-main">
          <div className="col-4 fooddiary-left">
            <div className="fooddiary-date fooddiary-item">
              <div className="fooddiary-headding">Select date:</div>
              <Datepicker setlocal_t_strap={setlocal_t_strap} setdate={setdate} />
            </div>

            <div className="fooddiary-nutchart fooddiary-item">
              <div className="fooddiary-headding">Nutrition Chart:</div>
              <NutritionChart setnut={setnut} />
            </div>
            <div className="fooddiary-chart">
              {datesArray && (
                <>
                 {nut==="calories"&&<Linechart
                  nutr={nut + " intake of last 7 days"}
                  labels={datesArray}
                  value={[chartval[0]?chartval[0][0].calories:0,
                    chartval[1]?chartval[1][0].calories:0,
                    chartval[2]?chartval[1][0].calories:0,
                    chartval[3]?chartval[1][0].calories:0,
                    chartval[4]?chartval[4][0].calories:0,
                    chartval[5]?chartval[5][0].calories:0,
                    chartval[6]?chartval[6][0].calories:0]}
                />}
                {nut==="fat"&&<Linechart
                  nutr={nut + " intake of last 7 days"}
                  labels={datesArray}
                  value={[chartval[0]?chartval[0][0].fat :0,
                    chartval[1]?chartval[1][0].fat :0,
                    chartval[2]?chartval[1][0].fat :0,
                    chartval[3]?chartval[1][0].fat :0,
                    chartval[4]?chartval[4][0].fat :0,
                    chartval[5]?chartval[5][0].fat :0,
                    chartval[6]?chartval[6][0].fat :0]}
                />}
                {nut==="carb"&&<Linechart
                  nutr={nut + " intake of last 7 days"}
                  labels={datesArray}
                  value={[chartval[0]?chartval[0][0].carb :0,
                    chartval[1]?chartval[1][0].carb :0,
                    chartval[2]?chartval[1][0].carb :0,
                    chartval[3]?chartval[1][0].carb :0,
                    chartval[4]?chartval[4][0].carb :0,
                    chartval[5]?chartval[5][0].carb :0,
                    chartval[6]?chartval[6][0].carb :0]}
                />}
                {nut==="protein"&&<Linechart
                  nutr={nut + " intake of last 7 days"}
                  labels={datesArray}
                  value={[chartval[0]?chartval[0][0].protein :0,
                    chartval[1]?chartval[1][0].protein :0,
                    chartval[2]?chartval[1][0].protein :0,
                    chartval[3]?chartval[1][0].protein :0,
                    chartval[4]?chartval[4][0].protein :0,
                    chartval[5]?chartval[5][0].protein :0,
                    chartval[6]?chartval[6][0].protein :0]}
                />}
                </>
              )}
            </div>
            {date===new Date().toLocaleString().split(',')[0]&&<div className="fooddiary-addfood">
              <span className="fooddiary-addfood-info">
                {Math.floor(calorieneed-(chartval[6]?chartval[6][0].calories:0))>0?<>
                You have got {Math.floor(calorieneed-(chartval[6]?chartval[6][0].calories:0))} calories remaining</>:
                <>You have exceeded {Math.abs(Math.floor(calorieneed-(chartval[6]?chartval[6][0].calories:0)))} calories</>}
                
              </span>
              <span style={{ marginTop: "5px",paddingLeft:'10px' }}>
                <button onClick={() => setvisible(true)}>Add food</button>
              </span>
              
            </div>}
          </div>
          <div className="col-8 fooddiary-mid">
            <div className="fooddiary-min-heading "> FOOD ITEMS</div>
            {date&&<FoodTable1
              res={fooditems}
              date={date}
            />}
            <div className="personal-diet"><a href="#"> Get personalised diet plan</a></div>

          </div>
        </div>
      </div>
      <CModal
        size="xl"
        alignment="center"
        visible={visible}
        onClose={() => {setvisible(false);window.location.reload()}}
      >
        <CModalHeader>
          <CModalTitle className="fooddiary-addfood-heading">
            Add Food
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Addfood />
        </CModalBody>
      </CModal>
      <Alert
        title={"Login"}
        content={"Login to add food to food diary."}
        label={"Login"}
        link={"/signup"}
        confirm={confirm}
        setconfirm={setconfirm}
      />
    </>
  );
}
