const socket = io();

const numOfPoint = 30;
const svgEl = document.querySelector(".chart");
const plotEl = document.querySelector(".chart_poly");

plotEl.setAttribute('fill', 'url(#MyGradient)');
let points = []

for (let i = 0; i < numOfPoint; i++) {
    points.push({ x: 100, y: 0 })

}

function createGradient(svg, id, stops) {
    var svgNS = svg.namespaceURI;
    var grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', id);
    for (var i = 0; i < stops.length; i++) {
        var attrs = stops[i];
        var stop = document.createElementNS(svgNS, 'stop');
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
        }
        grad.appendChild(stop);
    }

    var defs = svg.querySelector('defs') ||
        svg.insertBefore(document.createElementNS(svgNS, 'defs'), svg.firstChild);
    defs.innerHTML = ''
    return defs.appendChild(grad);
}



function upd(nw) {
    const h = svgEl.clientHeight
    const w = svgEl.clientWidth

    const coefW = w / 100
    const coefH = h / 100

    points.pop()
    points.push({ x: 0, y: nw.predict * 100 })
    points.push({ x: 100, y: 0 })

    if (points.length > numOfPoint) {
        points.splice(1, 1)
    }


    const pnt = document.querySelector(".chart_point")
    pnt.innerHTML = ''


    let wCount = 0;
    var t = points.map(el => {
        wCount += w / numOfPoint

        var outh = h - el.y * coefH
        const out = `${wCount},${outh}`

        if (el.y) {
            var svgNS = document.querySelector('svg').namespaceURI;

            var n = document.createElementNS(svgNS, 'circle');
            n.setAttribute('cx', wCount + "px");
            n.setAttribute('cy', outh + "px");
            n.setAttribute('r', "4");
            n.setAttribute('stroke', "#f49080");
            n.setAttribute('stroke-width', "5");
            pnt.appendChild(n)
        }



        return out
    }).join(" ")



    var g = []

    for (let index = 0; index < points.length; index++) {
        const element = points[index];
        var o = (index / points.length) * 100

        if (element.y < 70) {
            g.push({ offset: `${o + 3}%`, 'stop-color': "rgba(128, 182, 244, 0.6)" })
        } else {
            g.push({ offset: `${o + 3}%`, 'stop-color': "rgba(244, 144, 128, 0.6)" })
        }
    }


    createGradient(document.querySelector('svg'), 'MyGradient', g);
    plotEl.setAttribute("points", t);
}

socket.on("update", function(msg) {
    upd(msg)
});