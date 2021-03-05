import { Container, Row, Col, Button, Progress } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import MyNav from './MyNav';

export default function Completed() {
    let history = useHistory();

    return (
        <>
        <MyNav text="직업가치관검사" />

        <Container id="sample1">
                <Row>
                    <Col xs="9"><h1 id="test2-h1">검사가 완료되었습니다.</h1></Col>
                    <Col xs="3" className="align-bottom"><p id="test2-percent">100%</p></Col>
                </Row>
                <Progress value={100} max={100} />
                <hr />
                <p className="sample1-p">직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. <br/> 
            직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다.<br/> 
            직업가치관검사는 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다.<br/> 
            본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>

                <br/>
                <Button color="primary" onClick={() => {
                    history.push('/1/result');
                }}>결과보기</Button>
            </Container>
        </>
    )
}