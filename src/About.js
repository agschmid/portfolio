import React, {useEffect} from 'react';
import Test from './Test.js'


export default function About(props){   
    const pageColor = "#D5D3C5"
    const setBackgroundColor = props.setBackgroundColor;
    useEffect(() => {
        setBackgroundColor(pageColor);
    }, [setBackgroundColor]);

    return (
        <>
            <h2>About Page</h2>
            <Test></Test>
        </>
    )
}


