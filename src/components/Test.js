import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Test.css';

export default function Test(props) {
    const [data, setData] = useState({data: []});
    const [num, setNum] = useState(1);
    const [val, setVal] = useState(1);

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
              <div key={d.qitemNo} id="question"> 
                  <li key={d.qitemNo}>{d.qitemNo} {d.question}</li>
                  <label><input type="radio" name={"B"+d.qitemNo} value={d.answerScore01}/>{d.answer01}</label> &ensp;&ensp;&ensp;&ensp;
                  <label><input type="radio" name={"B"+d.qitemNo} value={d.answerScore02}/>{d.answer02}</label>
              </div>
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
        document.querySelector('.nextBtn').setAttribute('disabled', 'disabled');
        if (num === 1) {
            document.getElementById("group1").style.display = "block"
        } else if (num === 7) {
            window.location.href='#/result'
        }
    })

    function testData() {
        const form = document.getElementById('testForm');
        const inputs = form.querySelectorAll('input:checked');
        console.log(inputs);
        let sss = ""
        inputs.forEach((x)=>{sss += x.name+"="+x.value+" "});
        console.log(sss);
        return(sss);
    }

    return(
        <>
        <div>
            <Progress value={val*10} max={100} /> 
        </div>

        <h1>검사진행</h1>

        <br/>

        <form id="testForm" onChange={()=>{
            const count = document.querySelectorAll('input:checked').length;
            console.log("count:", count);
            if (count % 5 === 0) {
                document.querySelector('.nextBtn').removeAttribute('disabled');
            } else if (count === 28) {            
                document.querySelector('.nextBtn').style.display = "none";
            }
            //setVal(count);
        }}>
        <div className="group" id="group1">{qListMaker(group1)}</div>
        <div className="group" id="group2">{qListMaker(group2)}</div>
        <div className="group" id="group3">{qListMaker(group3)}</div>
        <div className="group" id="group4">{qListMaker(group4)}</div>
        <div className="group" id="group5">{qListMaker(group5)}</div>
        <div className="group" id="group6">{qListMaker(group6)}</div>
        </form>


        <br/>

        <button onClick={()=>{
            showPrevQList(num);
            }}>이전</button>
        <button className="nextBtn" onClick={()=>{
            console.log(num);
            showNextQList(num);
            }}>다음</button>

        <button onClick={() => {
            testData();
            props.answersHandler(testData());
            window.location.href='#/result';
        }}>검사완료</button>
        </>
    );
}

