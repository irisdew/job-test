import React from 'react';

export default function Child(props) {

    return(
        <button onClick={() => {
            props.toggleFilter('Child에서 바꾸기');
        }}>xxx</button>
    )
}