import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import './Result.css'

export default function Result(props){
    const [seq, setSeq] = useState();
    const [result, setResult] = useState({});
    const [wow, setWow] = useState([1, 3, 4, 5, 3, 5, 7, 1]);
    const [rank1, setRank1] = useState();
    const [rank2, setRank2] = useState();

    async function fetch() {
        const url = "https://www.career.go.kr/inspct/openapi/test/report";
        const data = {
            "apikey": "238b48bf19364a4f775ccd83b30d13b3",
            "qestrnSeq": "6",
            "trgetSe": "100209",
            "name": props.params.name,
            "gender": props.params.gender,
            "grade": "2",
            "startDtm": props.params.startDtm,
            "answers": props.answers
          }
        axios.post(url, data)
        .then((response) => {
            console.log("web-result:", response.data.RESULT.url)
            const seq= response.data.RESULT.url.split('=')[1];
            console.log(seq);
            graph(seq);
        })
    }
    
    async function graph(seq) {
        const resultURL = 'https://inspct.career.go.kr/inspct/api/psycho/report?seq=' + seq;
        // console.log(resultURL);
        const response = await axios.get(resultURL)
        console.log(response.data.result);
        setResult(response.data.result)
        .then(()=>{
            console.log(result.wonScore.split(' '))
            const wow = result.wonScore.split(' ').map((word) => {return parseInt(word.split('=')[1]);});
            wow.pop();
            console.log("wow", wow)
        })
        console.log("전체 결과:", response)
    }

    useEffect(() => {
        console.log(props.params);
        fetch();
    }, []);
    
    const data = {
        labels: ['능력발휘', '자율성', '보수', '안정성', '사회적 인정', '사회봉사', '자기계발', '창의성'],
        datasets: [
            {
                borderWidth: 0,
                data: wow,
                backgroundColor: ["#f3a683", "#f5cd79", "#f8a5c2", "#63cdda", "#778beb", "#e77f67", "#b8e994", "#ea8685"]
            }
        ]
    }

    const options = {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    stepSize: 1,
                }
            }]
        },
        maintainAspectRatio: false
    }


    return(
        <>
        <h1>직업가치관검사 결과표</h1>
        
        <button onClick={()=>{
            console.log('결과보기');
            graph(seq);
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
                        <td>{result.endDtm}</td>
                    </tr>
                </thead>
            </table>

            <p>{props.answers}</p>

            <div className="chart">
            <Bar 
                data={data}
                width={300}
                height={200}
                options={options}
            />
            </div>

        </div>

        <button>다시 검사하기</button> 
        </>
    )
}