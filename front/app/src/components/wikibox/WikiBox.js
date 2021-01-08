import React from 'react'

export default function WikiBox(props) {
    let htmlString = props.html ? props.html: "O:"
    return (
        <div dangerouslySetInnerHTML={{__html: htmlString}}/>
    )
}