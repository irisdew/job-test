import { Container, Button, Progress } from 'reactstrap';

export default function Completed() {
    return (
        <>
        <Container>
            <Progress value={100} max={100} /> 
        </Container>

        <h1 className="title">검사가 완료되었습니다.</h1>
        <p>검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고, <br/>
        중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
        <Button color="primary" size="lg" onClick={() => {
            window.location.href='#/result';
        }}>결과보기</Button>
        </>
    )
}