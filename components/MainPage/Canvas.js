import React from 'react';
import { fabric } from 'fabric';
import _ from 'lodash';


var stringToColour = function (str) {
    if (str === 'undefined') { return 'black'; }
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
};

class Canvas extends React.Component {

    constructor(props) {

        super(props);
        this._isMounted = false;
        this.state = {
            annotations: props.annotations,
            backgroundImgSrc: props.imgSrc,
        };

        this.drawShapes = this.drawShapes.bind(this);
        this.makeCircle = this.makeCircle.bind(this);
        this.drawRect = this.drawRect.bind(this);
        this.drawPolygon = this.drawPolygon.bind(this);
        this.makeLine = this.makeLine.bind(this);
        this.drawColorizedBitmap = this.drawColorizedBitmap.bind(this);
        this.scalePointX = this.scaleX.bind(this);
        this.scalePointY = this.scaleY.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.fabricCanvas = new fabric.StaticCanvas('f', { renderOnAddRemove: false });
    }

    componentDidUpdate() {
        this.state.annotations = this.props.annotations;
        this.state.backgroundImgSrc = this.props.imgSrc;
        this.fabricCanvas.clear();
        if (this._isMounted) {
            this.background.onload = () => {
                this.fabricCanvas.setDimensions({ width: this.background.width, height: this.background.height });
            };
        }
        this.drawShapes();
        this.fabricCanvas.renderAll();
    }

    shouldComponentUpdate(nextProps) {
        console.log('nextProps', nextProps);
        if (nextProps.imgSrc != this.props.imgSrc) {
            console.log('canvas will update, new imgSrc');
            return true;
        } else if (nextProps.annotations.length != this.props.annotations.length) {
            console.log('canvas will update, annotations changes');
            return true;
        } else { return false; }
    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log('component will unmount');
    }

    drawColorizedBitmap(imgSrc, label) {
        const colorFilter = new fabric.Image.filters.BlendColor({
            color: stringToColour(label),
            mode: 'tint',
            alpha: 1
        });

        fabric.Image.fromURL(imgSrc, (img) => {
            img.scaleToHeight(this.background.height);
            img.scaleToWidth(this.background.width);
            img.filters.push(colorFilter);
            img.applyFilters();
            img.set({ opacity: 0.5 });
            img.set('selectable', false);
            this.fabricCanvas.add(img);
            this.fabricCanvas.sendToBack(img);
            this.fabricCanvas.renderAll();
        },
            { crossOrigin: 'anonymous' });
    }

    drawShapes() {
        console.log('drawing shapes');
        this.state.annotations.map((annot) => {
            if (annot.type === 'rectangle') { this.drawRect(annot.coords, annot.label); }
            else if (annot.type === 'key_points') { this.drawKeypoints(annot.points, annot.links, annot.label); }
            else if (annot.type === 'circle') { this.makeCircle(annot.coords, annot.label); }
            else if (annot.type === 'polygon') { this.drawPolygon(annot.coords, annot.label); }
            else if (annot.type === 'bitmap') { this.drawColorizedBitmap(annot.img, annot.label); }
            else { console.log('cannot draw', annot); }
        });
        console.log('STOP');
    }

    drawKeypoints(points, links, label) {
        const lineColor = stringToColour(label);
        let circles = {};
        {
            Object.entries(points).map(([k, v]) => {
                const circ = this.makeCircle(v.coordinate);
                circ.fill = lineColor;
                circles[k] = circ;
            });
        }

        const lines = links.map((link) => {
            const [start, end] = link;
            const startCoord = circles[start].getCenterPoint();
            const endCoord = circles[end].getCenterPoint();
            const line = this.makeLine([startCoord.x, startCoord.y, endCoord.x, endCoord.y]);
            line.stroke = lineColor;
            line.fill = lineColor;
            return line;
        });
        { lines.map((line) => { this.fabricCanvas.add(line); }); }

        {
            Object.entries(circles).map(([label, circ]) => {
                const newLabel = new fabric.Text(label, {
                    left: circ.left + circ.width,
                    top: circ.top - 1 / 2 * circ.height,
                    fill: 'black',
                    stroke: lineColor,
                    selectable: false, evented: false,
                });
                this.fabricCanvas.add(circ);
                this.fabricCanvas.add(newLabel);
                this.fabricCanvas.bringForward(newLabel);
            });
        }
    }

    makeCircle(coords) {
        const [cx, cy] = [this.scaleX(coords[0]), this.scaleY(coords[1])];
        const keyPoint = new fabric.Circle({
            radius: 10,
            fill: 'black',
            top: cy, left: cx,
            selectable: false,
            evented: false
        });
        return keyPoint;
    }

    makeLine(coords) {
        const newLine = new fabric.Line(coords, {
            fill: 'black',
            stroke: 'black',
            strokeWidth: 3,
            selectable: false,
            evented: false,
        });
        return newLine;
    }

    drawRect(coords, label) {
        const customColor = stringToColour(label);
        const [x, y] = [this.scaleX(coords[0][0]), this.scaleY(coords[0][1])];
        const [lowerRight_x, lowerRight_y] = [this.scaleX(coords[1][0]), this.scaleY(coords[1][1])];
        const width = lowerRight_x - x;
        const height = lowerRight_y - y;

        const rect = new fabric.Rect({
            top: y, left: x,
            height: height, width: width,
            fill: customColor,
            opacity: 0.4,
            selectable: false,
            hasControls: false,
            hasRotatingPoint: false,
        });
        const stroke = new fabric.Rect({
            top: y, left: x,
            height: height, width: width,
            fill: 'rgba(0,0,0,0)',
            strokeWidth: 5,
            stroke: customColor,
            opacity: 0.6,
            selectable: false,
        });

        this.fabricCanvas.add(rect);
        this.fabricCanvas.add(stroke);

        const labelText = new fabric.Text(label, { left: x, top: y, fill: customColor, selectable: false });
        this.fabricCanvas.add(labelText);
    }

    drawPolygon(coords, label) {
        const customColor = stringToColour(label);
        const polyCoords = coords.map((c) => { return { x: this.scaleX(c[0]), y: this.scaleY(c[1]) }; });
        const poly = new fabric.Polygon(polyCoords, { fill: customColor, opacity: 0.7, selectable: false });
        const strokeLine = new fabric.Polygon(polyCoords, { stroke: customColor, strokeWidth: 5, fill: 'transparent', opacity: 1, selectable: false });
        this.fabricCanvas.add(poly);
        this.fabricCanvas.add(strokeLine);
        // if (label === 'erasepoly') {this.fabricCanvas.bringForward(polyLine);}
        const cp = poly.getCenterPoint();
        const labelText = new fabric.Text(label, { left: cp.x, top: cp.y, fill: customColor, stroke: 'black', selectable: false });
        this.fabricCanvas.add(labelText);
    }

    scaleY(pt) { return pt * this.background.height | 0; }

    scaleX(pt) { return pt * this.background.width | 0; }

    render() {
        console.log('canvas render', this.props.annotations.length, 'annotations');
        return (
            <div className='canvas-wrapper'
                style={{ position: 'relative' }}>

                <img ref={(b) => { this.background = b; }}
                    src={this.props.imgSrc} alt=''
                    style={{ maxWidth: '100%', position: 'absolute', top: '0px', left: '0px' }} />
                <canvas id='f'
                    ref={node => { this.state.canvas = node; }}
                    style={{ border: '2px solid yellow', position: 'absolute', top: '0px', left: '0px', opacity: 1 }} />

            </div>
        );
    }
}

export default Canvas;