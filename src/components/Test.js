import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Progress, Button } from 'reactstrap';

import './Test.css';
import { Container } from 'react-bootstrap';

export default function Test(props) {
    const [data, setData] = useState({data: []});
    const [pageNum, setPageNum] = useState(1);
    const [val, setVal] = useState(0);
    // const [pageJustChanged, setPageJustChanged] = useState(false);
    
    const [condition, setCondition] = useState(false);

    async function fetch() {
        const response = await axios.get('http://www.career.go.kr/inspct/openapi/test/questions?apikey=238b48bf19364a4f775ccd83b30d13b3&q=6');
        const data = response.data.RESULT;
        console.log(data);
        setData({ data: data });
    }
    
    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if (pageNum === 1) {
            document.getElementById("group1").style.display = "block"
        } 
    }, [pageNum]);
    
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
                  <p key={d.qitemNo}>{d.qitemNo}. {d.question}</p>
                  <label><input type="radio" name={"B"+d.qitemNo} value={d.answerScore01}/>{d.answer01}</label> &ensp;&ensp;&ensp;&ensp;
                  <label><input type="radio" name={"B"+d.qitemNo} value={d.answerScore02}/>{d.answer02}</label>
              </div>
              )
            })
        return qList
    }
    
    function showNextQList(pageNum) {
        // if (pageNum > 5) {
        //     document.querySelector('.finished').style.display = "block";
        // } else {
            setPageNum(pageNum+1);
            document.getElementById(`group${pageNum}`).style.display = "none";
            document.getElementById(`group${pageNum+1}`).style.display = "block";
        // }
    }

    function showPrevQList(pageNum) {
        setPageNum(pageNum-1);
        console.log(pageNum);
        if (pageNum < 2) {
            window.location.href='#/intro'
        } else {
            document.getElementById(`group${pageNum}`).style.display = "none";
            document.getElementById(`group${pageNum-1}`).style.display = "block";
        }
    }
    

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
        <Container>
            <Progress value={Math.round(val*3.57)} max={100} /> 
        </Container>

        <h1>검사진행</h1>

        <br/>

        <form id="testForm" onChange={()=>{
            const count = document.querySelectorAll('input:checked').length;
            console.log("count:", count);
            setVal(count);
            if (count % 5 === 1) {
                // setPageJustChanged(false);
            } else if (count === 28) {
                console.log('count 28');
                setCondition(true);
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

        <Button color="primary" onClick={() => {
            showPrevQList(pageNum);
            // setPageJustChanged(false);
        }}>이전</Button>
        
        <Button
            color={(val % 5 === 0 && val !== 0) ? "primary" : "secondary"} 
            className={!(condition) ? "show": "hide"}
            onClick={() => {
                console.log(pageNum);
                showNextQList(pageNum);
                // setPageJustChanged(true);
            }}
            disabled={!(val % 5 === 0 && val !== 0)}
            // disabled={!(val % 5 === 0 && pageJustChanged === false)}
        >다음</Button>

        <Button color="primary" className={condition ? "show": "hide"} onClick={() => {
            testData();
            props.answersHandler(testData());
            window.location.href='#/completed';
        }}>완료</Button>
        </>
    );
}
