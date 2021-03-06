import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Progress, Button } from 'reactstrap';

import MyNav from './MyNav';

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
                <Container key={d.qitemNo} id="question"> 
                  <p id="test1-qnum">{d.qitemNo}.</p>
                  <Row className="test1-radio-wrap">
                    <Col xs="6" className="test1-col-A">
                    <input type="radio" name={"B"+d.qitemNo} value={d.answerScore01} id={d.qitemNo+"-"+d.answerScore01}/><label for={d.qitemNo+"-"+d.answerScore01}>{d.answer01}</label>
                    </Col>
                    <Col xs="6" className="test1-col-B">
                    <input type="radio" name={"B"+d.qitemNo} value={d.answerScore02} id={d.qitemNo+"-"+d.answerScore02}/><label for={d.qitemNo+"-"+d.answerScore02}>{d.answer02}</label>
                    </Col>
                  </Row>
              </Container>
              )
            })
        return qList
    }
    
    function showNextQList(pageNum) {
        document.getElementById(`group${pageNum}`).style.display = "none";
        document.getElementById(`group${pageNum+1}`).style.display = "block";

        const navs = document.querySelectorAll(".test2-nav")
        navs.forEach((e)=> e.classList.remove("test1-color"));
        document.getElementById(`nav${pageNum+1}`).classList.add("test1-color");
    }

    function showPrevQList(pageNum) {
        console.log(pageNum);
        if (pageNum === 1) {
            history.push('/1/sample');
        } else {
            document.getElementById(`group${pageNum}`).style.display = "none";
            document.getElementById(`group${pageNum-1}`).style.display = "block";

            const navs = document.querySelectorAll(".test2-nav")
            navs.forEach((e)=> e.classList.remove("test1-color"));
            document.getElementById(`nav${pageNum-1}`).classList.add("test1-color");
        }
    }
    
    function makeAnswers() {
        const form = document.getElementById('testForm');
        const inputs = form.querySelectorAll('input:checked');
        let answers = ""
        inputs.forEach((x)=>{answers += x.name+"="+x.value+" "});
        return answers;
    }

    return(
        <>
        <MyNav text="?????????????????????" />
        <Container>
          <Row>
            <Col xs="9"><h1 id="test2-h1">?????? ?????? </h1></Col>
            <Col xs="3" className="align-bottom"><p id="test2-percent">{Math.round(count*3.57)}%</p></Col>
          </Row>
          <Progress value={Math.round(count*3.57)} max={100}></Progress>
        </Container>

        <Container id="test">
            <Row>
            <Col xs="3">
                <p className="test2-p">{count}/28</p>
                <hr/>
                <article>
                <p className="test2-nav test1-color" id="nav1">1-4</p>
                <hr/>
                <p className="test2-nav" id="nav2">5-8</p>
                <hr/>
                <p className="test2-nav" id="nav3">9-12</p>
                <hr/>
                <p className="test2-nav" id="nav4">13-16</p>
                <hr/>
                <p className="test2-nav" id="nav5">17-20</p>
                <hr/>
                <p className="test2-nav" id="nav6">21-24</p>
                <hr/>
                <p className="test2-nav" id="nav7">25-28</p>
                <hr/>
                </article>
            </Col>
            <Col xs="9">
            <p className="test1-p">??? ?????? ?????? ?????? ???????????? ??? ????????? ????????? ???????????????.</p>
            <hr/>
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
        }}>??????</Button>
        
        <Button
            color={(count !== 0 && isDone) ? "primary" : "secondary"} 
            className={!(condition && pageNum === 7) ? "show": "hide"}
            onClick={() => {
                setPageNum(pageNum+1);
                console.log("???????????? ?????? ??? ????????? ??????: ", pageNum);
                showNextQList(pageNum);
                setIsDone(false);
            }}
            disabled={!(count !== 0 && isDone)}
        >??????</Button>

        <Button color="primary" className={(condition && pageNum === 7) ? "show": "hide"} onClick={() => {
            makeAnswers();
            props.answersHandler(makeAnswers());
            history.push('/1/completed');
        }}>??????</Button>
            </Col>
            </Row>
        </Container>
        </>
    );
}
