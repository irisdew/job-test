import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { Progress } from 'reactstrap';

=======
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;
>>>>>>> 75d6dc638a71c231352f80710e16aa666742aa1b
import './Test.css';
import { Container } from 'react-bootstrap';

export default function Test() {
    const [data, setData] = useState({data: []});
    const [num, setNum] = useState(1);
<<<<<<< HEAD
    const [val, setVal] = useState(0);
    const [pageJustChanged, setPageJustChanged] = useState(false);
=======
    const [answers, setAnswers] = useState("");
>>>>>>> 75d6dc638a71c231352f80710e16aa666742aa1b

    async function fetch() {
        const response = await axios.get('http://www.career.go.kr/inspct/openapi/test/questions?apikey=238b48bf19364a4f775ccd83b30d13b3&q=6')
        const data = response.data.RESULT;
        console.log(data);
        setData({ data: data });
    }
    
    useEffect(() => {
        fetch();
    }, [num]);

    useEffect(() => {
        if (num === 1) {
            document.getElementById("group1").style.display = "block"
        } else if (num === 7) {
            window.location.href='#/completed';
        }
    }, [num]);
    
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
                  <label><input type="radio" name={"B"+d.qitemNo} value={d.answerScore01}/>{d.answer01}</label> &ensp;
                  <label><input type="radio" name={"B"+d.qitemNo} value={d.answerScore02}/>{d.answer02}</label>
              </div>
              )
<<<<<<< HEAD
            })
=======
          })
        
>>>>>>> 75d6dc638a71c231352f80710e16aa666742aa1b
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
    

    function testData() {
        const form = document.getElementById('testForm');
        const inputs = form.querySelectorAll('input:checked');
        //const vals = inputs.map((input)=>{console.log(input.input.value)})
        console.log(inputs);
        let sss = ""
        inputs.forEach((x)=>{sss += x.name+"="+x.value+" "});
        console.log(sss);
        return(sss);
    }

    return(
        <>
        <Container>
            <Progress value={Math.round(val*3.57)} max={100} /> 
        </Container>

        <h1>검사진행</h1>

        <br/>

        <form id="testForm" onChange={()=>{
            const count = document.querySelectorAll('input:checked').length;
            console.log("count:", count);
<<<<<<< HEAD
            setVal(count);
            if (count % 5 === 1) {
                setPageJustChanged(false);
=======
            if (count % 5 === 0 | count === 28) {
                document.querySelector('.nextBtn').removeAttribute('disabled');
>>>>>>> 75d6dc638a71c231352f80710e16aa666742aa1b
            }
        }}>
        <div className="group" id="group1">{qListMaker(group1)}</div>
        <div className="group" id="group2">{qListMaker(group2)}</div>
        <div className="group" id="group3">{qListMaker(group3)}</div>
        <div className="group" id="group4">{qListMaker(group4)}</div>
        <div className="group" id="group5">{qListMaker(group5)}</div>
        <div className="group" id="group6">{qListMaker(group6)}</div>
        </form>


        <br/>

        <button onClick={() => {
            showPrevQList(num);
        }}>이전</button>
        
        <button
            className="nextBtn"
            onClick={() => {
                console.log(num);
                showNextQList(num);
                setPageJustChanged(true);
            }}
            // if (count % 5 === 0) {
            //     document.querySelector('.nextBtn').removeAttribute('disabled');
            // } else if (count === 28) {            
            //     document.querySelector('.nextBtn').style.display = "none";
            // }
            disabled={!(val % 5 === 0 && pageJustChanged === false)}
        >다음</button>

        <button onClick={() => {
            testData();
            setAnswers(testData());
            console.log("answer state값", answers);
        }}>현재결과</button>
        </>
    );
}

