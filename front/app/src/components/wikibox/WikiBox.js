import React from 'react'

export default function WikiBox(props) {
    let htmlString = props.signal ? signal(): "O:"
    return (
        <div dangerouslySetInnerHTML={{__html: htmlString}}/>
    )
}