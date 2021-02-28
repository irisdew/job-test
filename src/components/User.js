import React, { useState } from 'react';
import { Button } from 'reactstrap';

export default function User(props) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    
    function checkName(name) {
      const reg = /^[가-힣]{2,6}$/;
      if(!reg.test(name)) {
        alert('이름이 올바르지 않습니다');
        return false;
      }
      return true;
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

    const condition = gender !== '' && checkName(name);

    const btnColor = condition ? "primary" : "secondary";

    return (
        <>
        <h1 className="title">직업가치관검사</h1>
        
          <form className="name" onChange={()=>{
              const userName = document.querySelector('input[name="name"]').value;
              setName(userName);
          }} onBlur={()=>{
            checkName(name);
          }}> 
            <p>이름</p>
            <input name="name" type="text" />
          </form>

          <form className="gender" onChange={()=>{
              const userGender = document.querySelector('input[name="gender"]:checked').value;
              setGender(userGender)
            }}>
            <p>성별</p>
            <label><input type="radio" name="gender" value="100323"/>남자</label>
            <br/>
            <label><input type="radio" name="gender" value="100324"/>여자</label>
          </form>

          <br/>

          <Button color={btnColor} size="lg" disabled={!(condition)} className="btn" onClick={(()=>{
            window.location.href='#/intro';
            userData();
          })}>검사시작</Button>{' '} 
        </>
    )
}
