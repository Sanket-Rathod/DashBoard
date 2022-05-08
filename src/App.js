
import React, {Component,useState,useEffect} from 'react';
import './App.css';
import ProgressBar from './components/progressBar.js';
import Axios from 'axios';


const App= () => {


  const addOrder = () =>{
    Axios.post('http://localhost:3001/postDispenser', {
      dispenserName : 'C236', 
      val: newVal1,
      
    }).then(()=>{
      console.log("success");
      
    });
  };

  const addOrder2 = () =>{
    Axios.post('http://localhost:3001/postDispenser', {
      dispenserName : 'A148', 
      val: newVal2,
      
    }).then(()=>{
      console.log("success");
      
    });
  };

  var newVal1=428;
  var newVal2=128;
  useEffect(()=>{
 
    setInterval(()=>{
      var initVal1 = newVal1;
      var initVal2 = newVal2;

      var rand = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
      var toggle = Math.floor(Math.random() * 2);

      if(toggle==0){
      newVal1 = initVal1 - rand;
      if(newVal1<0)newVal1=600;
      state1_.progress=Math.floor(newVal1/6);
      console.log(state1_.progress);
      state1_=Object.assign({},state1_);
      setState1(state1_);
      addOrder();
      }
      else {
        newVal2 = initVal2 - rand;
        if(newVal2<0)newVal2 = 400;
        state2_.progress=Math.floor(newVal2/4);
      console.log(state2_.progress);
      state2_=Object.assign({},state2_);
      setState2(state2_);
      addOrder2();
      }
      
      // state1_.progress=Math.floor(newVal1/6);
      // console.log(state1_.progress);
      // state1_=Object.assign({},state1_);
      // setState1(state1_);
      // setState2(state1_);
    }, 3000);
  

}, []);


  var state1_ ={
    size:250,
    progress:40,
    strokeWidth:15,
    circleOneStroke: '#d9edfe',
    circleTwoStroke: '#7ea9e1'
  }
  const [state1,setState1] = useState(state1_);

  var state2_ ={
    size:250,
    progress:55,
    strokeWidth:15,
    circleOneStroke: '#d9edfe',
    circleTwoStroke: '#7ea9e1'
  }
  const [state2,setState2] = useState(state2_);
 
  return (
    <div className="App">
      <div className="App-header">
        <div className="C236" >
        Dispenser C236
        <ProgressBar  {...state1} />
        {state1.progress}
        </div>
        <div className="A148">
        Dispenser A148
        <ProgressBar {...state2} />
        {state2.progress}
        </div>
        
      </div>
    </div>
  );
}

export default App;
