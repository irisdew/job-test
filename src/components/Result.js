import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Table, Button } from 'reactstrap';

export default function Result(props){

    const [endDtm, setEndDtm] = useState();
    const [graphData, setGraphData] = useState([3, 1, 7, 5, 3, 1, 4, 2])
    const [school, setSchool] = useState([]);
    const [major, setMajor] = useState([]);
    const [rank, setRank] = useState([]);

    let history = useHistory();

    function fetch() {
        console.log("0. props:", props.params);

        const postURL = "https://www.career.go.kr/inspct/openapi/test/report";
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

        axios.post(postURL, data)
        .then((response) => {
            console.log("1. webResult:", response.data.RESULT.url)
            const seq= response.data.RESULT.url.split('=')[1];
            console.log("2. seq:", seq);
            
            getGraph(seq);
        })
    }
    
    function getGraph(seq) {
        const jsonResult = 'https://inspct.career.go.kr/inspct/api/psycho/report?seq=' + seq;
        console.log("3. jsonResult-url:", jsonResult);

        axios.get(jsonResult)
        .then(response => {
            console.log("4. jsonResult-response:", response);
            console.log("5. endDtm:", response.data.result.endDtm);
            setEndDtm(response.data.result.endDtm)
            const score = response.data.result.wonScore;
            console.log("6. score:", score.split(' '));
            const graphData = score.split(' ').map((word) => {return parseInt(word.split('=')[1]);});
            graphData.pop();
            console.log("7. graphData:", graphData);
            setGraphData(graphData);

            const maxScore = Array.from(new Set(graphData.slice().sort())).reverse();
            console.log("8. rank", maxScore);
            const rank1 = graphData.indexOf(maxScore[0])+1;
            const sameScoreCheck = graphData.indexOf(maxScore[0], rank1)
            let rank2 = null;
            if (sameScoreCheck !== -1) {
                rank2 = sameScoreCheck+1;
            } else {
                rank2 = graphData.indexOf(maxScore[1])+1;
            }
            console.log("9. rank1, rank2:", rank1, rank2);

            setRank([rank1, rank2]);
            getJobs(rank1, rank2);
        })
    }

    useEffect(() => {
        fetch();
    }, []);
    
    function getJobs(rank1, rank2) {
        const job_school = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${rank1}&no2=${rank2}`
        const job_major = `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${rank1}&no2=${rank2}`

        axios.get(job_school)
        .then(response => {
            console.log("10-1. job_school:", response.data);
            
            let school = []
            
            for (let i=0; i<6; i++) {
                school.push(response.data.filter((x) => {
                    return x[2] === i;
                }));  
            }

            console.log("11-1. school:", school);
            setSchool(school);
        })

        axios.get(job_major)
        .then(response => {
            console.log("10-2. job_major:", response.data);

            let major = []
            
            for (let i=0; i<8; i++) {
                major.push(response.data.filter((x) => {
                    return x[2] === i;
                }));  
            }

            console.log("11-2. major:", major);
            setMajor(major);
        })
    }


    const data = {
        labels: ['능력발휘', '자율성', '보수', '안정성', '사회적 인정', '사회봉사', '자기계발', '창의성'],
        datasets: [
            {
                borderWidth: 0,
                data: graphData,
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

    function paintJobs(jobsList) {
        const jobBaseURL = 'https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=';
        return jobsList.map((job) => <a href={jobBaseURL+job[0]} rel='noreferrer' target="_blank">{job[1]}</a>)
    }

    function showJobs(listName) {
        let condition = true;
        if (listName === undefined) {
            condition = false; 
        } else {
            if (listName.length === 0) {
                condition = false;
            }
        }
        return condition ? paintJobs(listName): "결과없음"
    }

    return(
        <Container id>
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
                        <th>{(props.params.gender === "100323") ? "남성" : "여성"}</th>
                        <td>{String(endDtm).substr(0, 10)}</td>
                    </tr>
                </thead>
            </Table>

            <h2 className="title">나의 직업 가치관</h2>

            <p>직업생활과 관련하여 {props.params.name}님이 가장 중요하게 생각하는 가치는 
            "{data.labels[rank[0]-1]}", "{data.labels[rank[1]-1]}" 입니다. <br/>
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
                <Table bordered>
                    <thead>
                        <tr>
                            <th className="standard">학력</th>
                            <th>직업명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">중졸</th>
                            <th>{showJobs(school[1])}</th>
                        </tr>
                        <tr>
                            <th scope="row">고졸</th>
                            <th>{showJobs(school[2])}</th>
                        </tr>
                        <tr>
                            <th scope="row">전문대졸</th>
                            <th>{showJobs(school[3])}</th>
                        </tr>
                        <tr>
                            <th scope="row">대졸</th>
                            <th>{showJobs(school[4])}</th>
                        </tr>
                        <tr>
                            <th scope="row">대학원졸</th>
                            <th>{showJobs(school[5])}</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <br/>
            <div>
                <h4 className="title">종사자 평균 전공별</h4>
                <Table bordered>
                    <thead>
                        <tr>
                            <th className="standard">분야</th>
                            <th>직업명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">계열무관</th>
                            <th>{showJobs(major[0])}</th>
                        </tr>
                        <tr>
                            <th scope="row">인문</th>
                            <th>{showJobs(major[1])}</th>
                        </tr>
                        <tr>
                            <th scope="row">사회</th>
                            <th>{showJobs(major[2])}</th>
                        </tr>
                        <tr>
                            <th scope="row">교육</th>
                            <th>{showJobs(major[3])}</th>
                        </tr>
                        <tr>
                            <th scope="row">공학</th>
                            <th>{showJobs(major[4])}</th>
                        </tr>
                        <tr>
                            <th scope="row">자연</th>
                            <th>{showJobs(major[5])}</th>
                        </tr>
                        <tr>
                            <th scope="row">의학</th>
                            <th>{showJobs(major[6])}</th>
                        </tr>
                        <tr>
                            <th scope="row">예체능</th>
                            <th>{showJobs(major[7])}</th>
                        </tr>
                    </tbody>
                </Table>
                </div>

            <Button className='reBtn' color="primary" size="lg" onClick={()=>{history.push('/');}}>다시 검사하기</Button> 
        </Container>
    )
}
