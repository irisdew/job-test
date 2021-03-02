import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Progress, Button } from 'reactstrap';

import './Test.css';
import { Container } from 'react-bootstrap';

export default function Test(props) {
    const [data, setData] = useState({data: []});
    const [pageNum, setPageNum] = useState(1);
    const [count, setCount] = useState(0);
    const [isDone, setIsDone] = useState(false); 
    
    const [condition, setCondition] = useState(false);

    let history = useHistory();

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
    
    const group1 = data.data.slice(0, 4);
    const group2 = data.data.slice(4, 8);
    const group3 = data.data.slice(8, 12);
    const group4 = data.data.slice(12, 16);
    const group5 = data.data.slice(16, 20);
    const group6 = data.data.slice(20, 24);
    const group7 = data.data.slice(24, 28);
    
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
        document.getElementById(`group${pageNum}`).style.display = "none";
        document.getElementById(`group${pageNum+1}`).style.display = "block";
    }

    function showPrevQList(pageNum) {
        console.log(pageNum);
        if (pageNum === 1) {
            history.push('/intro');
        } else {
            document.getElementById(`group${pageNum}`).style.display = "none";
            document.getElementById(`group${pageNum-1}`).style.display = "block";
        }
    }
    
    function makeAnswers() {
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
            <Progress value={Math.round(count*3.57)} max={100}></Progress> <p className="percentage">{Math.round(count*3.57)}%</p>
        </Container>

        <h1>검사진행</h1>

        <br/>

        <Container id="test">
        <form id="testForm" onChange={()=>{
            const currentChecked = document.querySelectorAll('input:checked').length;
            console.log("count:", currentChecked);
            setCount(currentChecked);
            if (currentChecked === 28) {
                console.log('count 28');
                setCondition(true);
            } else if (currentChecked % 4 === 0) {
                setIsDone(true);
            }
        }}>
        <div className="group" id="group1" onChange={()=>{
            if (document.querySelectorAll('input:checked').length === 4) {
                setIsDone(true);
            }
        }}>{qListMaker(group1)}</div>
        <div className="group" id="group2">{qListMaker(group2)}</div>
        <div className="group" id="group3">{qListMaker(group3)}</div>
        <div className="group" id="group4">{qListMaker(group4)}</div>
        <div className="group" id="group5">{qListMaker(group5)}</div>
        <div className="group" id="group6">{qListMaker(group6)}</div>
        <div className="group" id="group7">{qListMaker(group7)}</div>
        </form>


        <br/>

        <Button className="prevBtn" color="primary" onClick={() => {
            setPageNum(pageNum-1);
            console.log(pageNum);
            showPrevQList(pageNum);
            setIsDone(true);
        }}>이전</Button>
        
        <Button
            color={(count !== 0 && isDone) ? "primary" : "secondary"} 
            className={!(condition && pageNum === 7) ? "show": "hide"}
            onClick={() => {
                setPageNum(pageNum+1);
                console.log("다음버튼 클릭 후 페이지 번호: ", pageNum);
                showNextQList(pageNum);
                setIsDone(false);
            }}
            disabled={!(count !== 0 && isDone)}
        >다음</Button>

        <Button color="primary" className={(condition && pageNum === 7) ? "show": "hide"} onClick={() => {
            makeAnswers();
            props.answersHandler(makeAnswers());
            history.push('/completed');
        }}>완료</Button>
        </Container>
        </>
    );
}
