import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Table, Button } from 'reactstrap';
import MyNav from './MyNav';

export default function Result(props) {
    const [endDtm, setEndDtm] = useState();
    const [pScore, setPScore] = useState([0,0,0,0,0,0,0,0,0]);
    const [tScore, setTScore] = useState([0,0,0,0,0,0,0,0,0]);
    const [wonScore, setWonScore] = useState([0,0,0,0,0,0,0,0,0]);
    const [graphData, setGraphData] = useState([3, 1, 7, 5, 3, 1, 4, 2, 6])
    const [rank, setRank] = useState([]);

    let history = useHistory()

    function fetch() {
      console.log("0. props:", props.params);

        const postURL = "https://www.career.go.kr/inspct/openapi/test/report";
        const data = {
            "apikey": "238b48bf19364a4f775ccd83b30d13b3",
            "qestrnSeq": "10",
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
            const pScore = response.data.result.pScore;
            const tScore = response.data.result.tScore;
            const wonScore = response.data.result.wonScore;
            setPScore(scoreMaker(pScore));
            setTScore(scoreMaker(tScore));
            setWonScore(scoreMaker(wonScore));
            const graphData = tScore.split(' ').map((word) => {return parseInt(word.split('=')[1]);});
            graphData.pop();
            console.log("7. graphData:", graphData);
            setGraphData(graphData);

            const rank = graphData.slice().sort().reverse();
            console.log("8. rank", rank);
            const best1 = graphData.indexOf(rank[0]);
            const best2 = graphData.indexOf(rank[1]);
            const worst1 = graphData.indexOf(rank[8]);
            const worst2 = graphData.indexOf(rank[7]);
            console.log("9.best1,2 & worst 1,2", best1, best2, worst1, worst2);
            setRank([best1, best2, worst1, worst2]);
        })
    }

    function scoreMaker(data) {
      const score = data.split(' ').map((word) => {return parseInt(word.split('=')[1]);});
      score.pop();
      return score;
    }

    useEffect(() => {
        fetch();
    }, []);

    const data = {
        labels: ['신체·운동능력', '공간·지각능력', '음악능력', '창의력', '언어능력', '수리·논리능력', '자기성찰능력', '대인관계능력', '자연친화능력'],
        datasets: [
          {
            data: graphData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
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
            ],
            borderWidth: 1,
          },
        ],
      }
      
    const options = {
        legend: {
            display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }

    function grade(score) {
      let result = ""
      if (score > 70) {
        result = "충분"
      } else if (score < 30) {
        result = "보완"
      } else {
        result = "보통"
      }
      return result
    } 

    return(
        <>
        <MyNav text="주요능력효능감검사" />
        <Container id="result1-whole">
        <div className='header'>
          <h1 className="main title">주요능력효능감검사 결과표</h1>
        </div>
        <hr />
        <Table bordered size="sm">
            <thead>
                <tr>
                    <th>이름</th>
                    <th>성별</th>
                    <th>검사일</th>
                </tr>
                <tr>
                    <td>{props.params.name}</td>
                    <td>{(props.params.gender === "100323") ? "남성" : "여성"}</td>
                    <td>{String(endDtm).substr(0, 10)}</td>
                </tr>
            </thead>
        </Table>
        {/* <p>검사점수는 백분위와 T점수로 제시됩니다. 백분위는 비교하는 학생 전체를 100%로 하였을 경우, 본인보다 점수가 낮은 학생들이 몇 %인가를 나타냅니다. T점수는 평균이 50 표준편차가 10인 표준점수로서 같은 학년의 학생들과 비교할 때, 상대적으로 평균 50을 중심으로 어느 위치에 있는가를 알려줍니다.</p> */}
        <Bar data={data} options={options} />
        
        <p className="result1-desc">주요 능력 중 {props.params.name}님이 스스로 생각하였을 때 강한 능력은 
            "{data.labels[rank[0]]}", "{data.labels[rank[1]]}" 입니다. <br/>
            상대적으로 약하다고 생각하는 능력은 "{data.labels[rank[2]]}", "{data.labels[rank[3]]}"입니다.</p>
        <hr/>
        
        <Table hover className="result2-table">
            <thead>
                <tr>
                    <th className='ability'>주요능력</th>
                    <th className='definition'>정의</th>
                    <th>원점수</th>
                    <th>백분위</th>
                    <th>T점수</th>
                    <th className='type'>판정유형</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>신체·운동능력</td>
                    <td>기초체력을 바탕으로 효율적으로 몸을 움직이고 <br/>동작을 학습할 수 있는 능력</td>
                    <td>{wonScore[0]}</td>
                    <td>{pScore[0]}%</td>
                    <td>{tScore[0]}</td>
                    <td>{grade(pScore[0])}</td>
                </tr>
                <tr>
                    <td>공간·지각능력</td>
                    <td>머릿속으로 그림을 그리며 생각할 수 있는 능력</td>
                    <td>{wonScore[1]}</td>
                    <td>{pScore[1]}%</td>
                    <td>{tScore[1]}</td>
                    <td>{grade(pScore[1])}</td>
                </tr>
                <tr>
                    <td>음악능력</td>
                    <td>노래 부르고 악기를 연주하며, 감상할 수 있는 능력</td>
                    <td>{wonScore[2]}</td>
                    <td>{pScore[2]}%</td>
                    <td>{tScore[2]}</td>
                    <td>{grade(pScore[2])}</td>
                </tr>
                <tr>
                    <td>창의력</td>
                    <td>새롭고 독특한 방식으로 문제를 해결하는 능력</td>
                    <td>{wonScore[3]}</td>
                    <td>{pScore[3]}%</td>
                    <td>{tScore[3]}</td>
                    <td>{grade(pScore[3])}</td>
                </tr>
                <tr>
                    <td>언어능력</td>
                    <td>말과 글로써 자신의 생각과 감정을 표현하며,<br/>다른 사람의 말과 글을 잘 이해할 수 있는 능력</td>
                    <td>{wonScore[4]}</td>
                    <td>{pScore[4]}%</td>
                    <td>{tScore[4]}</td>
                    <td>{grade(pScore[4])}</td>
                </tr>
                <tr>
                    <td>수리·논리능력</td>
                    <td>수리적으로 사고하여 문제를 해결하는 능력</td>
                    <td>{wonScore[5]}</td>
                    <td>{pScore[5]}%</td>
                    <td>{tScore[5]}</td>
                    <td>{grade(pScore[5])}</td>
                </tr>
                <tr>
                    <td>자기성찰능력</td>
                    <td>자신의 생각과 감정을 알며,<br/> 자신을 돌아보고 감정을 조절할 수 있는 능력</td>
                    <td>{wonScore[6]}</td>
                    <td>{pScore[6]}%</td>
                    <td>{tScore[6]}</td>
                    <td>{grade(pScore[6])}</td>
                </tr>
                <tr>
                    <td>대인관계능력</td>
                    <td>다른 사람들과 더불어 살아가는 능력</td>
                    <td>{wonScore[7]}</td>
                    <td>{pScore[7]}%</td>
                    <td>{tScore[7]}</td>
                    <td>{grade(pScore[7])}</td>
                </tr>
                <tr>
                    <td>자연친화능력</td>
                    <td>인간과 자연이 서로 연관되어 있음을 이해하며, <br/>자연에 대하여 관심을 가지고 탐구 보호할 수 있는 능력</td>
                    <td>{wonScore[8]}</td>
                    <td>{pScore[8]}%</td>
                    <td>{tScore[8]}</td>
                    <td>{grade(pScore[8])}</td>
                </tr>
              </tbody>
        </Table>
        <br/>
        <p className="result1-desc">검사점수는 백분위와 T점수로 제시됩니다. <br/>
        백분위는 비교하는 학생 전체를 100%로 하였을 경우, 본인보다 점수가 낮은 학생들이 몇 %인가를 나타냅니다. <br/>
        T점수는 평균이 50 표준편차가 10인 표준점수로서 같은 학년의 학생들과 비교할 때, <br/>
        상대적으로 평균 50을 중심으로 어느 위치에 있는가를 알려줍니다.</p>
        <hr/>
        <Button className='reBtn' color="info" onClick={()=>{history.push('/');}}>다시 검사하기</Button> 
        </Container>
      </>
    )

}