import MyNav from './MyNav';
import { Container, Row, Col, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export default function Intro() {
    let history = useHistory();
    
    return (
        <>
        
        <MyNav />

        <Container>
        
        <h1>검사 선택</h1>
        <hr />
        
        <Row id="choose-row">
            
            <Col class="col-md-4 col-lg-4 col-sm-4">    
                <label>
                <input type="radio" name="product" value="test1" class="card-input-element" />
                    <div id="card-A" class="panel panel-default card-input">
                    <h4 class="panel-heading">직업가치관검사</h4>
                    <div class="panel-body">
                        Job Value Test
                    </div>
                    </div>
                </label>   
            </Col>

            <Col class="col-md-4 col-lg-4 col-sm-4">
                <label>
                <input type="radio" name="product" value="test2" class="card-input-element" />
                    <div id="card-B" class="panel panel-default card-input">
                    <h4 class="panel-heading">주요능력효능감검사</h4>
                    <div class="panel-body">
                        Ability Self-Confidence Test
                    </div>
                    </div>
                </label>
            </Col>
            
        </Row>
        
        <Row id="choose-btn">
            <Button color="info" onClick={() => {
                const selectedTest = document.querySelector('input:checked').value;
                console.log(selectedTest);
                if (selectedTest === "test1") {
                    history.push('/1/sample');
                } else if (selectedTest === "test2") {
                    history.push('/2/sample');
                }
            }}>검사시작</Button>
        </Row>
        
        </Container>

        </>
    )
}