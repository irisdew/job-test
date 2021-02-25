import React, { useState, useEffect } from 'react';

export default function User() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    
    useEffect(() => {
      document.querySelector('.btn').setAttribute('disabled', 'disabled');
    }, []);

    function nameCheck(name) {
      const reg = /^[가-힣]{2,}$/;
      if(!reg.test(name)) {
        console.log('유효하지 않은 이름');
      }
    }

    function btnActive() {
        document.querySelector('.btn').removeAttribute('disabled');
        console.log('active');
    }

    function pageChanger() {
      console.log('changing...');
      window.location.href='#/intro'
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
    }

    return (
        <>
        <h1>직업가치관검사</h1>
        
          <form className="name" onChange={()=>{
              const userName = document.querySelector('input[name="name"]').value;
              setName(userName);
              if (gender !== '') {
                btnActive();
              }
          }}> 
            <p>이름</p>
            <input name="name" type="text" />
          </form>

          <form className="gender" onChange={()=>{
              const userGender = document.querySelector('input[name="gender"]:checked').value;
              setGender(userGender)
              if (name !== '') {
                 btnActive();
              };
            }}>
            <p>성별</p>
            <label><input type="radio" name="gender" value="100323"/>남자</label>
            <br/>
            <label><input type="radio" name="gender" value="100324"/>여자</label>
          </form>

          <br/>
           
          <button type="button" className="btn" onClick={(()=>{
            pageChanger();
            userData();
          })} >검사시작</button>
        </>
    )
}