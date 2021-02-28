import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Table } from 'reactstrap';


import './Result.css'

export default function Result(props){
    const [seq, setSeq] = useState();
    const [result, setResult] = useState({});
    const [wow, setWow] = useState([1, 3, 4, 5, 3, 5, 7, 1]);
    const [jobs, setJobs] = useState([]);
    const [jobs2, setJobs2] = useState("");

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
        axios.get(resultURL)
        .then(response => {
            console.log(response);
            console.log(response.data.result);
            setResult(response.data.result);
            const result = response.data.result;
            console.log(result.wonScore.split(' '))
            const wow = result.wonScore.split(' ').map((word) => {return parseInt(word.split('=')[1]);});
            wow.pop();
            console.log("wow", wow)
            setWow(wow);
        })
    }

    useEffect(() => {
        console.log(props.params);
        fetch();
        getJobs();
    }, []);
    
    const rank = wow.slice().sort();
    console.log("rank", rank);
    const rank1 = wow.indexOf(rank[7])+1;
    const rank2 = wow.indexOf(rank[6])+1;
    console.log("rank1", rank1);
    console.log("rank2", rank2);

    function getJobs() {
        const job_school = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${rank1}&no2=${rank2}`
        const job_major = `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${rank1}&no2=${rank2}`

        axios.get(job_school)
        .then(response => {
            console.log("job_school", response.data);
            response.data.map((job)=>{
                return(
                    <li key={job[0]}>{job[1]}</li>
                )
            })
            setJobs(jobs);
        })

        axios.get(job_major)
        .then(response => {
            console.log("job_major", response.data);
            let major2 = ""
            response.data.forEach((job)=>{
                if (job[2] === 2) {
                    major2 = major2 + job[1]+" "
                }
            })
            setJobs2(major2);
        })
        
        

    }
    
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
        <Container>
            <h1 className="main title">직업가치관검사 결과표</h1>
            
            <p className="description">직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. <br/> 
            여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다.<br/> 
            직업가치관검사는 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다.<br/> 
            본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
            
            <Table bordered>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>성별</th>
                        <th>검사일</th>
                    </tr>
                    <tr>
                        <th>{props.params.name}</th>
                        <th>{props.params.gender}</th>
                        <td>{String(result.endDtm).substr(0, 10)}</td>
                    </tr>
                </thead>
            </Table>

            <h2 className="title">나의 직업 가치관</h2>

            <p>직업생활과 관련하여 {props.params.name}님은
            ""과 ""을 가장 중요하게 생각합니다. <br/>
            반면에 ""과 ""을 상대적으로 덜 중요하게 생각합니다.
            </p>


            <div className="chart">
                <Bar 
                    width={1000}
                    height={600}
                    data={data}
                    options={options}
                />
            </div>

            <h2 className="title">나의 가치관과 관련이 높은 직업</h2>

            <div>
                <h4 className="title">종사자 평균 학력별</h4>
                <ul>{jobs}</ul>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>학력</th>
                            <th>직업명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">중졸</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">고졸</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">전문대졸</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">대졸</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">대학원졸</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                    </tbody>
                </Table>
                <ul>{jobs}</ul>    
            </div>
            <div>
                <h4 className="title">종사자 평균 전공별</h4>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>분야</th>
                            <th>직업명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">계열무관</th>
                            <th>{jobs2}</th>
                        </tr>
                        <tr>
                            <th scope="row">인문</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">사회</th>
                            <th>{jobs2}</th>
                        </tr>
                        <tr>
                            <th scope="row">교육</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">공학</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">자연</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">의학</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                        <tr>
                            <th scope="row">예체능</th>
                            <th>인문사회계열교수 직업군인 인문사회계열교수 변리사</th>
                        </tr>
                    </tbody>
                </Table>
                </div>

            <button onClick={()=>{window.location.href='#/';}}>다시 검사하기</button> 
        </Container>
    )
}
