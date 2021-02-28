import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'reactstrap';

import { Progress } from 'reactstrap';

export default function Intro() {
    const [question, setQuestion] = useState();
    const [answer1, setAnswer1] = useState();
    const [answer2, setAnswer2] = useState();
    const [btnActive, setBtnActive] = useState(false);

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

            <Container>
                <Progress value={0} max={100} /> 
            </Container>

            <h1 className="title">검사예시</h1>

            <p>직업과 관련된 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>

            {/* <article className="valueList">
                <h4>가치</h4>
                <p>능력발휘 : 직업을 통해 자신의 능력을 발휘하는 것입니다.</p>
                <p>자율성 : 일하는 시간과 방식에 대해서 스스로 결정할 수 있는 것입니다</p>

                <p>창의성 : 스스로 아이디어를 내어 새로운 일을 해볼 수 있는 것입니다</p>

                <p>안정성 : 한 직장에서 오랫동안 일할 수 있는 것입니다</p>

                <p>보수 : 직업을 통해 많은 돈을 버는 것을 말합니다</p>

                <p>사회적 인정 : 내가 한 일을 다른 사람에게 인정받는 것입니다</p>

                <p>자기계발 : 직업을 통해 더 배우고 발전할 기회가 있는 것입니다</p>
            </article> */}

            <div className="sample">
                <p className='question'>
                    {question}
                </p>

                <form className="answer" onChange={()=>{
                    setBtnActive(true);
                }}>
                    <label><input type="radio" name="sample" />{answer1}</label>
                    <label><input type="radio" name="sample" />{answer2}</label>
                </form>
            </div>

            <br/>

            <Button color={btnColor} size="lg" disabled={!btnActive} className="btn2" onClick={() => {
                window.location.href='#/test';
            }}>검사시작</Button>
        </div>
    )
}

