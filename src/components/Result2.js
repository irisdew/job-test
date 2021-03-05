import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

export default function Result() {
    const [graphData, setGraphData] = useState([3, 1, 7, 5, 3, 1, 4, 2, 6])

    function fetch() {
        const postURL = "https://www.career.go.kr/inspct/openapi/test/report";
        const data = {
            "apikey": "238b48bf19364a4f775ccd83b30d13b3",
            "qestrnSeq": "10",
            "trgetSe": "100209",
            "name": "홍길동",
            "gender": "100323",
            "grade": "2",
            "startDtm": 1550466291034,
            "answers": "1,2,3,2,3,2,3,1,2,3,2,3,2,3,1,2,1,2,3,2,3,1,2,4,2,3,2,1,1,2,4,2,2,3,5,1,2,1,2,3,2,2,1,2,3,4,4,4,5"
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
            // setEndDtm(response.data.result.endDtm)
            const pScore = response.data.result.pScore;
            const tScore = response.data.result.tScore;
            const wonScore = response.data.result.wonScore;
            const graphData = tScore.split(' ').map((word) => {return parseInt(word.split('=')[1]);});
            graphData.pop();
            console.log("7. graphData:", graphData);
            setGraphData(graphData);
        })
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

      const [isOpen, setIsOpen] = useState(false);
      
      const toggle = () => setIsOpen(!isOpen);

    return(
        <>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">job-test</NavbarBrand>
              <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                    <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="https://www.career.go.kr/">CareerNet</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                        Option 1
                        </DropdownItem>
                        <DropdownItem>
                        Option 2
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <NavbarText>주요능력효능감검사</NavbarText>
                </Collapse>
            </Navbar>
        <Container id="result2-container">
        <div className='header'>
          <h1 className="result2-title">주요능력효능감검사 결과표</h1>
        </div>
        <hr />
        <Table bordered>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>성별</th>
                    <th>검사일</th>
                </tr>
                <tr>
                    <td>김쿠키</td>
                    <td>남성</td>
                    <td>1997.07.21</td>
                </tr>
            </thead>
        </Table>
        {/* <p>검사점수는 백분위와 T점수로 제시됩니다. 백분위는 비교하는 학생 전체를 100%로 하였을 경우, 본인보다 점수가 낮은 학생들이 몇 %인가를 나타냅니다. T점수는 평균이 50 표준편차가 10인 표준점수로서 같은 학년의 학생들과 비교할 때, 상대적으로 평균 50을 중심으로 어느 위치에 있는가를 알려줍니다.</p> */}
        <Bar data={data} options={options} />
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
                <tr>
                    <td>신체·운동능력</td>
                    <td>기초체력을 바탕으로 효율적으로 몸을 움직이고 동작을 학습할 수 있는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
                <tr>
                    <td>공간·지각능력</td>
                    <td>머릿속으로 그림을 그리며 생각할 수 있는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
                <tr>
                    <td>음악능력</td>
                    <td>노래 부르고 악기를 연주하며, 감상할 수 있는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
                <tr>
                    <td>창의력</td>
                    <td>새롭고 독특한 방식으로 문제를 해결하는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
                <tr>
                    <td>언어능력</td>
                    <td>말과 글로써 자신의 생각과 감정을 표현하며,<br/>다른 사람의 말과 글을 잘 이해할 수 있는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
                <tr>
                    <td>수리·논리능력</td>
                    <td>수리적으로 사고하여 문제를 해결하는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
                <tr>
                    <td>자기성찰능력</td>
                    <td>자신의 생각과 감정을 알며, 자신을 돌아보고 감정을 조절할 수 있는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
                <tr>
                    <td>대인관계능력</td>
                    <td>다른 사람들과 더불어 살아가는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
                <tr>
                    <td>자연친화능력</td>
                    <td>인간과 자연이 서로 연관되어 있음을 이해하며, <br/>자연에 대하여 관심을 가지고 탐구 보호할 수 있는 능력</td>
                    <td>11</td>
                    <td>10%</td>
                    <td>37</td>
                    <td>보완</td>
                </tr>
            </thead>
        </Table>
        <Button className='reBtn' color="info" size="lg" onClick={()=>{}}>다시 검사하기</Button> 
        </Container>
      </>
    )

}