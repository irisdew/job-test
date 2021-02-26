import React, { useState, useEffect } from "react";
export default function ChildResult(props) {
    const [yyy, setYYY] = useState('')
    useEffect(() => {
        setYYY(props.xxx)
    }, [props.xxx]);
    return(
        <h1>{yyy}</h1>
    )
}