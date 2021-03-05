import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Table } from 'reactstrap';

import { Progress } from 'reactstrap';

import MyNav from './MyNav';

export default function Sample1() {
    const [question, setQuestion] = useState();
    const [answer1, setAnswer1] = useState();
    const [answer2, setAnswer2] = useState();
    const [btnActive, setBtnActive] = useState(false);
    let history = useHistory();

    async function fetch() {
        const response = await axios.get('http://www.career.go.kr/inspct/openapi/test/questions?apikey=238b48bf19364a4f775ccd83b30d13b3&q=6')
        const sample = response.data.RESULT[0];
        console.log(sample);
        setQuestion(sample.question);
        setAnswer1(sample.answer01);
        setAnswer2(sample.answer02);
    }

    useEffect(() => {
        fetch();
    }, []);

    const btnColor = btnActive ? "primary" : "secondary";

    return (
        <div>
            <MyNav text="직업가치관검사" />

            <Container>
                <Row>
                    <Col xs="9"><h1 id="test2-h1">검사 예시</h1></Col>
                    <Col xs="3" className="align-bottom"><p id="test2-percent">0%</p></Col>
                </Row>
                <Progress value={0} max={100} />
            </Container>
            <Container id='sample1'>
                <p className="sample1-p">직업과 관련된 가치 중에 자신에게 더 중요한 가치를 선택하세요.</p>
                <hr />
                <Table id="sample1-table" size="sm">
                    <tbody>
                        <tr>
                            <th scope="row" className="standard">능력발휘</th>
                            <td>직업을 통해 자신의 능력을 발휘하는 것입니다.</td>
                        </tr>
                        <tr>
                            <th scope="row">자율성</th>
                            <td>일하는 시간과 방식에 대해서 스스로 결정할 수 있는 것입니다.</td>
                        </tr>
                        <tr>
                            <th scope="row">창의성</th>
                            <td>스스로 아이디어를 내어 새로운 일을 해볼 수 있는 것입니다.</td>
                        </tr>
                        <tr>
                            <th scope="row">안정성</th>
                            <td>한 직장에서 오랫동안 일할 수 있는 것입니다.</td>
                        </tr>
                        <tr>
                            <th scope="row">보수</th>
                            <td>직업을 통해 많은 돈을 버는 것을 말합니다.</td>
                        </tr>
                        <tr>
                            <th scope="row">사회적 인정</th>
                            <td>내가 한 일을 다른 사람에게 인정받는 것입니다.</td>
                        </tr>
                        <tr>
                            <th scope="row">자기계발</th>
                            <td>직업을 통해 더 배우고 발전할 기회가 있는 것입니다.</td>
                        </tr>
                    </tbody>
                </Table>
                <Container id="sample1-question" onChange={() => {
                    setBtnActive(true);
                }}>
                    <p id="test1-qnum">1.</p>
                    <Row className="test1-radio-wrap" id="sample1-radio-wrap">
                        <Col xs="6" className="test1-col-A">
                            <input type="radio" name="sample" className="test1-col-A" id="sample-A" /><label for="sample-A">{answer1}</label>
                        </Col>
                        <Col xs="6" className="test1-col-B">
                            <input type="radio" name="sample" className="test1-col-B" id="sample-B" /><label for="sample-B">{answer2}</label>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
                
                <Button color={btnColor} disabled={!btnActive} className="btn2" onClick={() => {
                    history.push('/1/test');
                }}>검사시작</Button>
            </Container>
        </div>
    )
}

