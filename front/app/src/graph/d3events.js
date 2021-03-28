import * as d3 from 'd3'

export function dragStarted(e, d) {
    return
    d.fx = d.x
    d.fy = d.y
}

export function dragged(e, d) {
    //d.px += e.dx
    //d.py += e.dy
    d.x = e.x
    d.y = e.y
    console.log('dragged')
    console.log(e,d)
}

export function dragEnded(e, d) {
    return
    d.fx = null
    d.fy = null
}
