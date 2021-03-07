import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Table, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import MyNav from './MyNav';

import Value from './Value';

export default function Result(props){

    const [endDtm, setEndDtm] = useState();
    const [graphData, setGraphData] = useState([3, 1, 7, 5, 3, 1, 4, 2])
    const [school, setSchool] = useState([]);
    const [major, setMajor] = useState([]);
    const [rank, setRank] = useState([]);
    const [valueTable1, setValueTable1] = useState(null);
    const [valueTable2, setValueTable2] = useState(null);

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
            setValueTable1(<Value num={rank1-1} />);
            setValueTable2(<Value num={rank2-1} />);
        })
    }

    useEffect(() => {
        fetch();
    });
    
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
                borderWidth: 1,
                data: graphData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                  ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                  ]
            }
        ]
    }

    const options = {
        responseive: true,
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
        maintainAspectRatio: true
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
    
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const majorName = ["계열무관", "인문", "사회", "교육", "공학", "자연", "의학", "예체능"]
    const majorTableElements = majorName.map((x, index) => {
        return(
        <tr className={(showJobs(major[index])==="결과없음")? "hide": null}>
            <th scope="row">{x}</th>
            <td>{showJobs(major[index])}</td>
        </tr>
        )
    })

    const schoolName = ["중졸", "고졸", "전문대졸", "대졸", "대학원졸"]
    const schoolTableElements = schoolName.map((x, index) => {
        return(
        <tr className={(showJobs(school[index+1])==="결과없음")? "hide": null}>
            <th scope="row">{x}</th>
            <td>{showJobs(school[index+1])}</td>
        </tr>
        )
    })


    return(
        <>
        <MyNav text="직업가치관검사" />
<Container id="result1-whole">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            결과표
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            직업정보
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
            <Container id="result1">
            <h1 className="main title">직업가치관검사 결과표</h1>
            <hr/>

            <Table bordered size="sm">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>성별</th>
                        <th>검사일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.params.name}</td>
                        <td>{(props.params.gender === "100323") ? "남성" : "여성"}</td>
                        <td>{String(endDtm).substr(0, 10)}</td>
                    </tr>
                </tbody>
            </Table>

            <div className="chart">
                <Bar 
                    width={1000}
                    height={600}
                    data={data}
                    options={options}
                />
            <p className="result1-desc">직업생활과 관련하여 {props.params.name}님이 가장 중요하게 생각하는 가치는 
            "{data.labels[rank[0]-1]}", "{data.labels[rank[1]-1]}" 입니다. </p>
            <p className="result1-desc">직업가치관은 직업선택에 중요한 기준이 되며, 직업가치관을 충족시키는 직업을 가지면 만족도가 높아집니다.<br/>
            여러 학자들에 따르면 자신의 직업가치가 충족되는 직업환경에서 근무할 때 높은 만족도를 경험한다고 합니다. <br/>
            아래의 설명을 읽어보고, 직업선택과 직업생활에 도움을 받아보세요. <br/><br/>
            </p>

            </div>

            {valueTable1}
            {valueTable2}

            <hr/>
        </Container>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
            <Container id="job-result1">
            <h1 className="main title">직업가치관과 관련이 높은 직업</h1>
            <br/>
            <p className="result1-desc">{props.params.name}님이 가장 중요하게 생각하는 가치인 
            "{data.labels[rank[0]-1]}", "{data.labels[rank[1]-1]}"을(를) 만족시킬 수 있는 직업은 다음과 같습니다. <br/>
            </p>

            <div>
                <h5 className="title">- 종사자 평균 학력별</h5>
                <Table hover>
                    <thead>
                        <tr>
                            <th className="standard">학력</th>
                            <th>직업명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schoolTableElements}
                    </tbody>
                </Table>
            </div>
            <hr/>
            <div>
                <h5 className="title">- 종사자 평균 전공별</h5>
                <Table hover>
                    <thead>
                        <tr>
                            <th className="standard">전공</th>
                            <th>직업명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {majorTableElements}
                    </tbody>
                </Table>
                </div>
                <hr/>
        </Container>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      <Button className='reBtn' color="primary" onClick={()=>{history.push('/');}}>다시 검사하기</Button>
    </Container>
    
        </>
    )
}
