import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

import { Progress } from 'reactstrap';

import MyNav from './MyNav';

export default function Sample1() {
    const [btnActive, setBtnActive] = useState(false);
    let history = useHistory();

    const btnColor = btnActive ? "info" : "secondary";

    return (
        <div>
            <MyNav text="주요능력효능감검사" />

            <Container>
                <Row>
                    <Col xs="9"><h1 id="test2-h1">검사 예시</h1></Col>
                    <Col xs="3" className="align-bottom"><p id="test2-percent">0%</p></Col>
                </Row>
                <Progress value={0} max={100} />
            </Container>
            <Container id='sample1'>
                <p className="sample1-p">검사지에는 문항과 일치정도가 있습니다. 문항은 자신의 생각이나 행동에 대한 예시입니다. <br/>
                문항을 읽고 자신에게 맞는 점수를 ‘전혀 못한다’ 부터 ‘매우 잘한다’ 에 표시하세요.</p>
                <hr />

                <p className="sample1-p red">※ 아래 제시된 예시문항을 선택해보세요.</p>

                <div id="sample2-question">
                <div id="test2-q">
                    <h5 id="test2-qnum" className="sample2-q">1.</h5>
                    <h5 id="test2-qstring" className="sample2-q">손으로 하는 일을 정확하게 하기</h5>
                </div> 
                <form className="radio-wrap" onChange={() => {
                    setBtnActive(true);
                }}>
                    <input type="radio" name="sample" id={1}/><label for={1}>전혀 못한다</label> 
                    <input type="radio" name="sample" id={2}/><label for={2}>못한다</label> 
                    <input type="radio" name="sample" id={3}/><label for={3}>보통이다</label> 
                    <input type="radio" name="sample" id={4}/><label for={4}>잘한다</label> 
                    <input type="radio" name="sample" id={5}/><label for={5}>매우 잘한다</label> 
                </form>
                <hr/>
                </div>

               
                 
                <Button color={btnColor} disabled={!btnActive} className="btn2" onClick={() => {
                    history.push('/2/test');
                }}>검사시작</Button>
            </Container>
        </div>
    )
}

