import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Intro() {
    const [question, setQuestion] = useState();
    const [answer1, setAnswer1] = useState();
    const [answer2, setAnswer2] = useState();

    function btnActive() {
        document.querySelector('.btn2').removeAttribute('disabled');
        console.log('active')
    }

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
        document.querySelector('.btn2').setAttribute('disabled', 'disabled');
    }, []);

    function pageChanger() {
        console.log('changing...');
        window.location.href='#/test'
      }

    return (
        <div>
            <h1>검사예시</h1>

            <p>직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br />
            가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해 보세요.</p>

            <div className="sample">
                <p className='question'>
                    {question}
                </p>

                <form className="answer" onChange={()=>{
                    btnActive();
                }}>
                    <label><input type="radio" name="sample" />{answer1}</label>
                    <label><input type="radio" name="sample" />{answer2}</label>
                </form>
            </div>

            <br/>

            <button className="btn2" onClick={pageChanger}>검사시작</button>
        </div>
    )
}


