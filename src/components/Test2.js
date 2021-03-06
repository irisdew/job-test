import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Progress, Button } from 'reactstrap';
import MyNav from './MyNav';

import '../App.css';

export default function Test2() {
    const [questions, setQuestions] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [count, setCount] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [condition, setCondition] = useState(false);
    let history = useHistory();

    async function getData() {
        const response = await axios.get('http://www.career.go.kr/inspct/openapi/test/questions?apikey=238b48bf19364a4f775ccd83b30d13b3&q=10');
        const data = response.data.RESULT;
        console.log(data);
        
        let groups = [];
        for (let i=1; i<8; i++) {
            groups.push(data.slice(7*i-7, 7*i))
        }
        console.log(groups);

        const questions = groups.map((group, index) => {
            return(
                <div className="group" id={"group"+(index+1)}>{qListMaker(group)}</div>
            )
        })

        setQuestions(questions);

        if (pageNum === 1) {
            document.getElementById("group1").style.display = "block"
        } 
    }

    useEffect(() => {
        getData();
    }, [])

    function qListMaker(group) {
        const qList = group.map((d) => {
            return(
                <div key={d.qitemNo} id="test2-question">
                  <div id="test2-q">
                    <h5 id="test2-qnum">{d.qitemNo}. </h5> 
                    <h5 id="test2-qstring">{d.question}</h5>
                  </div> 
                  <form className="radio-wrap" action ='#'>
                    <input type="radio" name={d.qitemNo} value={d.answerScore01} id={d.qitemNo+"-"+d.answerScore01}/><label for={d.qitemNo+"-"+d.answerScore01}>{d.answer01}</label> 
                    <input type="radio" name={d.qitemNo} value={d.answerScore02} id={d.qitemNo+"-"+d.answerScore02}/><label for={d.qitemNo+"-"+d.answerScore02}>{d.answer02}</label> 
                    <input type="radio" name={d.qitemNo} value={d.answerScore03} id={d.qitemNo+"-"+d.answerScore03}/><label for={d.qitemNo+"-"+d.answerScore03}>{d.answer03}</label> 
                    <input type="radio" name={d.qitemNo} value={d.answerScore04} id={d.qitemNo+"-"+d.answerScore04}/><label for={d.qitemNo+"-"+d.answerScore04}>{d.answer04}</label> 
                    <input type="radio" name={d.qitemNo} value={d.answerScore05} id={d.qitemNo+"-"+d.answerScore05}/><label for={d.qitemNo+"-"+d.answerScore05}>{d.answer05}</label> 
                  </form>
                  <hr/>
              </div>
              )
            })
        return qList
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

    function showNextQList(pageNum) {
        document.getElementById(`group${pageNum}`).style.display = "none";
        document.getElementById(`group${pageNum+1}`).style.display = "block";
    }

    function makeAnswers() {
        const form = document.getElementById('test2Form');
        const inputs = form.querySelectorAll('input:checked');
        let answerString = ""
        inputs.forEach((x)=>{answerString += x.value+","});
        console.log("answers:", answerString.slice(0, -1));
        return(answerString.slice(0, -1));
    }

        const [isOpen, setIsOpen] = useState(false);
      
        const toggle = () => setIsOpen(!isOpen);

    return (
        <>
        <MyNav text="주요능력효능감검사" />
        
        <Container>
              <Row>
                <Col xs="9"><h1 id="test2-h1">검사진행 </h1></Col>
                <Col xs="3" className="align-bottom"><p id="test2-percent">{Math.round(count*2.04)}%</p></Col>
              </Row>
                
            <Progress color="info" value={Math.round(count*2.04)} max={100}></Progress>
        </Container>
        
        <Container>
            <Row>
              <Col xs="3">
                <p className="test2-p">{count}/49</p>
                <hr/>
                <article>
                <p className="test2-nav">1-7</p>
                <hr/>
                <p className="test2-nav">8-14</p>
                <hr/>
                <p className="test2-nav">15-21</p>
                <hr/>
                <p className="test2-nav">21-28</p>
                <hr/>
                <p className="test2-nav">29-35</p>
                <hr/>
                <p className="test2-nav">36-42</p>
                <hr/>
                <p className="test2-nav">43-49</p>
                <hr/>
                </article>
              </Col>
              <Col xs="9">
                <p className="test2-p">다음 문장이 나타내는 바를 얼마나 잘 할 수 있는지, 해당되는 정도에 표시하여 주십시오.</p>
                <hr/>
                <form id='test2Form' onChange={()=>{
                    const currentChecked = document.querySelectorAll('input:checked').length;
                    console.log("count:", currentChecked);
                    setCount(currentChecked);
                    if (currentChecked === 49) {
                        console.log('count 49');
                        setCondition(true);
                    } else if (currentChecked % 7 === 0) {
                        setIsDone(true);
                    } 
                }}>
                  {questions}
                </form>
                <Row className="test2-Btns">
                    <Button className="test2-prevBtn" color="info" onClick={() => {
                        setPageNum(pageNum-1);
                        console.log(pageNum);
                        showPrevQList(pageNum);
                        setIsDone(true);
                    }}>이전</Button>
                    
                    <Button
                        color={(count !== 0 && isDone) ? "info" : "secondary"}
                        className={!(condition && pageNum === 7) ? "show": "hide"}
                        onClick={() => {
                            setPageNum(pageNum+1);
                            console.log("다음버튼 클릭 후 페이지 번호: ", pageNum);
                            showNextQList(pageNum);
                            setIsDone(false);
                        }}
                        disabled={!(count !== 0 && isDone)}
                        >다음</Button>

                    <Button 
                        color="info" 
                        className={(condition && pageNum === 7) ? "show": "hide"} 
                        onClick={() => {
                            makeAnswers();
                            // history.push('/completed');
                        }}>
                            완료
                    </Button>
                </Row>
              </Col>
            </Row>
            
           
            

        </Container>
    </>
    )
    }