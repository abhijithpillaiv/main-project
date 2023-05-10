import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Singlepost from './singlepost';
import { port } from "../../context/collection";
import { useCookies } from 'react-cookie';
import {cookie} from '../../context/collection'
import axios from "axios";
export default function FoodTable({res}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Food</TableCell>
            <TableCell>Gram</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res&&res.length!==0&&res.map((row,index) => (
            <Row rec={row} key={index}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function Row({rec}) {
  const [open, setOpen] = React.useState(false);
  const [cookies,] = useCookies([cookie]);
  const [gram, setgram] = React.useState(100)

  const addHandler=(rec)=>{
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
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <CIcon  icon={icon.cilChevronTop} size="lg"/> : <CIcon  icon={icon.cilChevronBottom} size="lg"/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {rec.recipe.label}
        </TableCell>
        <TableCell align="right"style={{width:'10%'}}><input style={{width:'50px'}} onChange={(e)=>setgram(e.target.value)} value={gram} type='number'/></TableCell>
        <TableCell align="right">{(rec.recipe.calories/rec.recipe.totalWeight*gram).toFixed(1)}</TableCell>
        <TableCell align="right">{(rec.recipe.digest[1].total/rec.recipe.totalWeight*gram).toFixed(1)}</TableCell>
        <TableCell align="right">{(rec.recipe.digest[2].total/rec.recipe.totalWeight*gram).toFixed(1)}</TableCell>
        <TableCell align="right">{(rec.recipe.digest[0].total/rec.recipe.totalWeight*gram).toFixed(1)}</TableCell>
        <TableCell className="foottable-add"style={{cursor:'pointer',textAlign:'center'}} onClick={()=>addHandler(rec)}><CIcon  icon={icon.cilPlus} size="lg"/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
                {rec&&<Singlepost rec={rec}/>}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
  }