import React from 'react'
import GRAPHCONFIG from '../../graph/config.js'
import Slider from '../slider/Slider.js'

// # Component for user-facing configurations for complete app.
export default function ConfigBox() {
	return (
		<div>
			<p> Changes applied will affect next graph interaction </p>
			{/* Slider for adjusting how many neighs a node can have (max). */}
			<Slider
				id='graphNeighCountSlider'
				minVal={2}
				maxVal={10}
				defaultVal={GRAPHCONFIG.graphNeighbourCount}
				callback={(e) => {GRAPHCONFIG.graphNeighbourCount = parseInt(e.target.value)}}
				txt="Max number of neighbours per node."
			/>
			{/* Slider for adjusting how many generations a node can live (max). */}
			<Slider
				id='graphGenerationCountSlider'
				minVal={2}
				maxVal={10}
				defaultVal={GRAPHCONFIG.graphGenerationCount}
				callback={(e) => {GRAPHCONFIG.graphGenerationCount = parseInt(e.target.value)}}
				txt="Lifetime of nodes (1 lifetime = 1 click)"
			/>
			{/* Adjuster/multipler of node sizes. */}
			<Slider
				id='nodeSizeMultiplierSlider'
				minVal={GRAPHCONFIG.nodeSizeMin}
				maxVal={GRAPHCONFIG.nodeSizeMax}
				defaultVal={GRAPHCONFIG.nodeSizeMultiplier}
				callback={(e) => {GRAPHCONFIG.nodeSizeMultiplier= parseInt(e.target.value)}}
				txt="Node size multiplier"
			/>
			{/* Adjuster for brightness on nodes*/}
			<Slider
				id='nodeColorBrightnessSlider'
				minVal={GRAPHCONFIG.nodeColorBrightnessMin}
				maxVal={GRAPHCONFIG.nodeColorBrightnessMax}
				defaultVal={GRAPHCONFIG.nodeColorBrightness}
				callback={(e) => {GRAPHCONFIG.nodeColorBrightness= parseInt(e.target.value)}}
				txt="Node brighness"
			/>
			<Slider
				id='linkDistanceSlider'
				minVal={GRAPHCONFIG.linkDistanceMin}
				maxVal={GRAPHCONFIG.linkDistanceMax}
				defaultVal={GRAPHCONFIG.linkDistanceMultiplier}
				callback={(e) => {GRAPHCONFIG.linkDistanceMultiplier= parseInt(e.target.value)}}
				txt="Link distance multiplier"
			/>



		</div>
	)
}
