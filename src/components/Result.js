import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Result(){
    const [codes, setCodes] = useState();
    
    async function fetch() {
        const url = "https://cors-anywhere.herokuapp.com/https://inspct.career.go.kr/web/psycho/value/report?seq=NTI4NzU4NDQ";
        const response = await (await axios.get(url)).data;
        console.log(typeof(response));
        console.log(response);
        setCodes(response);
    }

    useEffect(() => {
        fetch();
    }, []);

    return(
        <>
        <h1>검사가 완료되었습니다!</h1>
        <div dangerouslySetInnerHTML={{__html: codes}}></div>
        </>
    )
}