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

    const group1 = data.data.slice(0, 5);
    const group2 = data.data.slice(5, 10);
    const group3 = data.data.slice(10, 15);
    const group4 = data.data.slice(15, 20);
    const group5 = data.data.slice(20, 25);
    const group6 = data.data.slice(25, );
    
    function qListMaker(group) {
        const qList = group.map((d) => {
            return(
              <form key={d.qitemNo} id="questions" className={d.qitemNo} > 
                  <li key={d.qitemNo}>{d.qitemNo} {d.question}</li>
                  <label><input type="radio" name={d.qitemNo} value={d.answerScore01}/>{d.answer01}</label>
                  <label><input type="radio" name={d.qitemNo} value={d.answerScore02}/>{d.answer02}</label>
              </form>
              )
          })
        
        return qList
    }

    function showNextQList(num) {
        if (num > 5) {
            window.location.href='#/result'
        } else {
            setNum(num+1);
            document.getElementById(`group${num}`).style.display = "none";
            document.getElementById(`group${num+1}`).style.display = "block";
        }
    }

    function showPrevQList(num) {
        setNum(num-1);
        console.log(num);
        if (num < 2) {
            window.location.href='#/intro'
        } else {
            document.getElementById(`group${num}`).style.display = "none";
            document.getElementById(`group${num-1}`).style.display = "block";
        }
    }
    
    useEffect(() => {
        if (num === 1) {
            document.getElementById("group1").style.display = "block"
        } else if (num === 7) {
            window.location.href='#/result'
        }
    })

    return(
        <>
        <h1>검사진행</h1>

        <br/>
        
        <div className="group" id="group1">{qListMaker(group1)}</div>
        <div className="group" id="group2">{qListMaker(group2)}</div>
        <div className="group" id="group3">{qListMaker(group3)}</div>
        <div className="group" id="group4">{qListMaker(group4)}</div>
        <div className="group" id="group5">{qListMaker(group5)}</div>
        <div className="group" id="group6">{qListMaker(group6)}</div>


        <br/>

        <button onClick={()=>{
            showPrevQList(num);
            }}>이전</button>
        <button onClick={()=>{
            console.log(num);
            showNextQList(num);
            }}>다음</button>
        </>
    );
}

