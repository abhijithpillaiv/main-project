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
import { useEffect } from 'react';
import { useState } from 'react';
import Singlepost from './singlepost';
import axios from "axios";
import { port } from "../../context/collection";
function Row({istoday, row}) {
  const [open, setOpen] = React.useState(false);
  const deleteHandler=(id,userid)=>{
    console.log("in");
    axios.get(port + "/food/dltfood/"+id+'/'+userid).then((res) => {
      window.alert(row.rec.recipe.label+" is removed from today's meal.")
      window.location.reload()
    });
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
          {row.rec.recipe.label}
        </TableCell>
        <TableCell align="right"style={{width:'10%'}}>{row.rec.recipe.gram}</TableCell>
        <TableCell align="right">{row.rec.recipe.calories.toFixed(1)}</TableCell>
        <TableCell align="right">{row.rec.recipe.digest[1].total.toFixed(1)}</TableCell>
        <TableCell align="right">{row.rec.recipe.digest[2].total.toFixed(1)}</TableCell>
        <TableCell align="right">{row.rec.recipe.digest[0].total.toFixed(1)}</TableCell>
        {istoday&&<TableCell className="foottable-dlt"style={{cursor:'pointer',textAlign:'center'}} onClick={()=>deleteHandler(row._id,row.id)}><CIcon  icon={icon.cilX} size="lg"/></TableCell>}      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
                {row.rec&&<Singlepost rec={row.rec}/>}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function FoodTable({date,res}) {
  useEffect(() => {
    const today=new Date().toLocaleString().split(',')[0]
    if(today==date){
      setistoday(true)
    }else{
      setistoday(false)
    }
  }, [date])
  const [istoday, setistoday] = useState(null)
  useEffect(() => {
    console.log(res);
  }, [res])
  
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
            {istoday&&<TableCell align="right">Delete</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {res&&res.length!==0&&res.map((row,index) => (
            <Row istoday={istoday} row={row} key={index}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}