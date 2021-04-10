import React from 'react'

// # Simple slider component.
export default function Slider({id, minVal, maxVal, defaultVal, callback, txt}) {
	return (
		<div className='slidercontainer' >
			<p> {txt} </p>
			<input
				className='slider'
				type='range'
				id={id}
				min={minVal}
				max={maxVal}
				defaultValue={defaultVal}
				onChange={callback}
			/>
		</div>	
	)
}
