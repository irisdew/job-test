import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Test.css';

export default function Test() {
    const [data, setData] = useState({data: []});
    const [answers, setAnswers] = useState("");
    const [num, setNum] = useState(1);

    async function fetch() {
        const response = await axios.get('http://www.career.go.kr/inspct/openapi/test/questions?apikey=238b48bf19364a4f775ccd83b30d13b3&q=6')
        const data = response.data.RESULT;
        console.log(data);
        setData({ data: data });
    }

    useEffect(() => {
        fetch();
    }, []);

    const group = data.data.slice(num*5-5, num*5);
    
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

    const questions = qListMaker(group);

    if (num === 7) {
        window.location.href='#/result'
    }

    return(
        <>
        <h1>검사진행</h1>

        <br/>
        
        <div>{questions}</div>

        <br/>

        <button onClick={()=>{
            setNum(num-1);
            console.log(num);}}>이전</button>
        <button onClick={()=>{
            setNum(num+1);
            console.log(num);}}>다음</button>
        </>
    );
}

