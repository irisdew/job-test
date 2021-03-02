import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

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

    const condition = gender !== '' && !(nameAlert);

    const btnColor = condition ? "primary" : "secondary";

    return (
        <Container id="User">
        <h1 className="user-title title">직업가치관검사</h1>
        
          <form className="name" onChange={()=>{
              const userName = document.querySelector('input[name="name"]').value;
              setName(userName);
          }} onBlur={()=>{
            checkName(name);
          }}> 
            <p className="user-p">이름</p>
            <input name="name" type="text" />
            <p className="name-alert" style={nameAlert ? {display: "block"} : {display: "none"}}>유효하지 않은 이름입니다!</p>
          </form>

          <br/>

          <form className="gender" onChange={()=>{
              const userGender = document.querySelector('input[name="gender"]:checked').value;
              setGender(userGender)
            }}>
            <p className="user-p">성별</p>
            <label><input type="radio" name="gender" value="100323"/>남자</label>
            <br/>
            <label><input type="radio" name="gender" value="100324"/>여자</label>
          </form>

          <br/>

          <Button color={btnColor} size="lg" disabled={!(condition)} className="btn" onClick={(()=>{
            userData();
            history.push('/intro');
          })}>검사시작</Button>{' '} 
        </Container>
    )
}

