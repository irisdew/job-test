import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Appp() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [question, setQuestion] = useState();
    const [answer1, setAnswer1] = useState();
    const [answer2, setAnswer2] = useState();


    useEffect(() => {
        document.querySelector('.btn').setAttribute('disabled', 'disabled');
        document.querySelector('.btn2').setAttribute('disabled', 'disabled');
        fetch();
    }, []);

    function nameCheck(name) {
        const reg = /^[가-힣]{2,}$/;
        if (!reg.test(name)) {
            console.log('유효하지 않은 이름');
        }
    }

    function btnActive(target) {
        document.querySelector(target).removeAttribute('disabled');
        console.log('active');
    }

    function pageChanger(target) {
        console.log('changing...');
        window.location.href = target
    }

    function userData() {
        const params = {
            "apikey": "",
            "qestrnSeq": "6",
            "trgetSe": "100209",
            "name": name,
            "gender": gender,
            "grade": "2",
            "startDtm": Date.now()
        }
        console.log(params);
    }

    async function fetch() {
        const response = await axios.get('http://www.career.go.kr/inspct/openapi/test/questions?apikey=238b48bf19364a4f775ccd83b30d13b3&q=6')
        const sample = response.data.RESULT[0];
        console.log(sample);
        setQuestion(sample.question);
        setAnswer1(sample.answer01);
        setAnswer2(sample.answer02);
    }

    return (
        <>

        <div className="user">
            <h1>직업가치관검사</h1>

            <form className="name" onChange={() => {
                const userName = document.querySelector('input[name="name"]').value;
                setName(userName);
                if (gender !== '') {
                    btnActive();
                }
            }}>
                <p>이름</p>
                <input name="name" type="text" />
            </form>

            <form className="gender" onChange={() => {
                const userGender = document.querySelector('input[name="gender"]:checked').value;
                setGender(userGender)
                if (name !== '') {
                    btnActive('.btn');
                };
            }}>
                <p>성별</p>
                <label><input type="radio" name="gender" value="100323" />남자</label>
                <br />
                <label><input type="radio" name="gender" value="100324" />여자</label>
            </form>

            <br />

            <button type="button" className="btn" onClick={(() => {
                pageChanger('#/intro');
                userData();
            })} >검사시작</button>
        </div>

        <div className="intro">
            <h1>검사예시</h1>

            <p>직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br />
                가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해 보세요.</p>

            <div className="sample">
                <p className='question'>
                    {question}
                </p>

                <form className="answer" onChange={() => {
                    btnActive('.btn2');
                }}>
                    <label><input type="radio" name="sample" />{answer1}</label>
                    <label><input type="radio" name="sample" />{answer2}</label>
                </form>
            </div>

            <br />

            <button className="btn2" onClick={pageChanger('#/test')}>검사시작</button>
        </div>



        </>
    )


}