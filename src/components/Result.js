import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Result(props){
    const [seq, setSeq] = useState();
    
    const [name, setName] = useState("김쿠키");
    const [gender, setGender] = useState("중성");
    const [date, setDate] = useState("3000-03-03")
    
    async function fetch() {
        const url = "https://www.career.go.kr/inspct/openapi/test/report";
        const data = {
            "apikey": "238b48bf19364a4f775ccd83b30d13b3",
            "qestrnSeq": "6",
            "trgetSe": "100209",
            "name": "김쿠키",
            "gender": "100324",
            "grade": "2",
            "startDtm": 1614239340425,
            "answers": "B1=1 B2=3 B3=5 B4=7 B5=9 B6=11 B7=13 B8=15 B9=17 B10=19 B11=21 B12=23 B13=25 B14=27 B15=29 B16=31 B17=33 B18=35 B19=37 B20=39 B21=41 B22=43 B23=45 B24=47 B25=49 B26=51 B27=53 B28=55"
          }
        axios.post(url, data)
        .then((response) => {
            console.log("web-result:", response.data.RESULT.url)
            const seq= response.data.RESULT.url.split('=')[1];
            console.log(seq);
            setSeq(seq);
        })
    }
    
    async function graph() {
        const resultURL = 'https://inspct.career.go.kr/inspct/api/psycho/report?seq=' + seq;
        // console.log(resultURL);
        const response = await axios.get(resultURL)
        console.log(response);
    }


    useEffect(() => {
        fetch();
    }, []);

    return(
        <>
        <h1>검사가 완료되었습니다!</h1>
        
        <p>{props.answers}</p>
        
        <button onClick={()=>{
            console.log('결과보기');
            graph();
        }}>결과보기</button>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>성별</th>
                        <th>검사일</th>
                    </tr>
                    <tr>
                        <th>{props.params.name}</th>
                        <th>{props.params.gender}</th>
                        <td>{date}</td>
                    </tr>
                </thead>
            </table>
        </div>

        <button>다시 검사하기</button> 
        </>
    )
}