import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default function User(props) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const [nameAlert, setNameAlert] = useState(false);

    let history = useHistory();
    
    function checkName(name) {
      const reg = /^[가-힣]{2,6}$/;
      if(!reg.test(name)) {
        console.log("유효하지 않은 이름");
        setNameAlert(true);
      } else {
        setNameAlert(false);
      }
    }

    function userData() {
      const params = {
        "apikey": "",
        "qestrnSeq": "6",
        "trgetSe": "100209",
        "name": name,
        "gender": gender,
        "grade": "2",
        "startDtm": Date.now()
      }
      console.log(params);
      props.paramsHandler(params);
    }

    const condition = gender !== '' && !(nameAlert) && (name !== '');

    const btnColor = condition ? "primary" : "secondary";

    return (
        <Container id="User">
          <h1 className="user-title title">job-test</h1>
          <Form id="userForm"
            onChange={()=>{
              const userName = document.querySelector('input[name="name"]').value;
              setName(userName);
            }} 
            > 
            <FormGroup onBlur={()=>{
            checkName(name);
            }}>
              <Label for="userName">이름</Label>
              <Input name="name" invalid={nameAlert}/>
              <FormFeedback invalid>이름은 한글 2~6자 이내로 입력해주세요.</FormFeedback>
            </FormGroup>
            <form className="gender" onChange={()=>{
              const userGender = document.querySelector('input[name="gender"]:checked').value;
              console.log(userGender);
              setGender(userGender);
            }}>
              <p className="gender-p">성별</p>
              <div className="gender-radio">
                <label className="male"><input type="radio" name="gender" value="100323"/>남자</label> &ensp;
                <label><input type="radio" name="gender" value="100324"/>여자</label>
              </div>
            </form>
          </Form>

          <Button color={btnColor} disabled={!(condition)} className="btn" onClick={(()=>{
            userData();
            history.push('/intro');
          })}>검사시작</Button>{' '} 
        </Container>
    )
}

