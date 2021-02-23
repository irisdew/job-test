import React, { useState } from 'react';

export default function User() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    function nameCheck(name) {
      const reg = /^[가-힣]{2,}$/;
      if(!reg.test(name)) {
        console.log('유효한 이름');
      }
    }

    function btnActive() {
        document.querySelector('.btn').removeAttribute('disabled');
        console.log('active')
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
            <label><input type="radio" name="gender" value="male"/>남자</label>
            <br/>
            <label><input type="radio" name="gender" value="female"/>여자</label>
          </form>

          <br/>
        
          <button className="btn" disabled onClick={()=>{console.log(gender, name)}}>검사시작</button>
        </>
    )
}