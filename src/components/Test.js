import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Test.css';

export default function Test() {
    const [data, setData] = useState({data: []});
    const [answers, setAnswers] = useState("");
    const [mode, setMode] = useState("group1");

    async function fetch() {
        const response = await axios.get('http://www.career.go.kr/inspct/openapi/test/questions?apikey=238b48bf19364a4f775ccd83b30d13b3&q=6')
        const data = response.data.RESULT;
        console.log(data);
        setData({ data: data });
    }

    useEffect(() => {
        fetch();
    }, []);

    const group1 = data.data.slice(0, 5);
    const group2 = data.data.slice(5, 10);
    const group3 = data.data.slice(10, 15);
    const group4 = data.data.slice(15, 20);
    const group5 = data.data.slice(20, 25);
    const group6 = data.data.slice(25, );
    
    function qListMaker(group) {
        const qList = group.map((d) => {
            return(
              <form id="questions" className={d.qitemNo} onChange={(event)=>{
                  const target = event.target.value;
                  const name = event.target.name;
                  const newAnswer = "B"+name+"="+target;
                  setAnswers(answers+" "+newAnswer)
                  console.log(target);
                  console.log(answers);
                  }}> 
                  <li>{d.qitemNo} {d.question}</li>
                  <label><input type="radio" name={d.qitemNo} value={d.answerScore01}/>{d.answer01}</label>
                  <label><input type="radio" name={d.qitemNo} value={d.answerScore02}/>{d.answer02}</label>
              </form>
              )
          })
        
        return qList
    }
    

    return(
        <>
        <h1>검사진행</h1>

        <br/>
        
        <div>{qListMaker(group1)}</div>
        <div>{qListMaker(group2)}</div>
        <div>{qListMaker(group3)}</div>
        <div>{qListMaker(group4)}</div>
        <div>{qListMaker(group5)}</div>
        <div>{qListMaker(group6)}</div>

        <br/>

        <button>이전</button>
        <button>다음</button>
        </>
    );
}

