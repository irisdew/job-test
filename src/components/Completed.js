import { Container, Row, Col, Button, Progress } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import MyNav from './MyNav';

export default function Completed(props) {
    let history = useHistory();
    const text = (props.type === "1") ? "직업가치관검사" : "주요능력효능감검사";

    return (
        <>
        <MyNav text={text}/>

        <Container id="sample1">
                <Row>
                    <Col xs="9"><h1 id="test2-h1">검사가 완료되었습니다.</h1></Col>
                    <Col xs="3" className="align-bottom"><p id="test2-percent">100%</p></Col>
                </Row>
                <Progress color={(props.type === "1") ? "primary" : "info"} value={100} max={100} />
                <hr />
                <p className={(props.type === "1") ? "sample1-p" : "hide"}>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. <br/>
                직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다.<br/> 
                직업가치관검사는 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다.<br/> 
                본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>

                <p className={!(props.type === "1") ? "sample1-p" : "hide"}>효능감이란 어떤 상황에서 적절한 행동을 할 수 있다는 기대와 신념입니다.<br/> 
                9개 주요 능력과 관련된 활동들에 대한 자신감이 전체 대학생과 비교할 때 어느 수준인지를 알아보세요.<br/> 
                9개 주요 능력과 관련된 과제에 대한 자신감의 점수가 결과로 제공됩니다.</p>

                <br/>
                <Button color={(props.type === "1") ? "primary" : "info"} onClick={() => {
                    history.push(`/${props.type}/result`);
                }}>결과보기</Button>
            </Container>
        </>
    )
}