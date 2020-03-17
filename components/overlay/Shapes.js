import React from 'react';
import '../../styles/ShapesStyles.css';


var stringToColour = function(str) {
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


const Rectangle = (key, attributes) => {
    const [x, y] = attributes.coordinates[0].map(pt => pt * 100 | 0);
    const [lowerRight_x, lowerRight_y] = attributes.coordinates[1]
                                                .map(pt => pt * 100 | 0);
    const width = lowerRight_x - x;
    const height = lowerRight_y - y;
    return (
        <rect key={key} x={x} y={y} width={width} height={height} />
        );
};

const Circle = (key, attributes) => {
    const [cx, cy] = attributes.coordinates.map(pt => pt * 100 | 0);
    return (
        <circle key={key} cx={cx} cy={cy} r='10' />
    );
};

const Polygon = (key, attributes) => {
    const points = attributes.poly
                  .map(pt => pt.map(coord => (coord * 100) | 0))
                  .map(pt => pt.join(','))
                  .join(' ');
    return <polygon key={key} points={points} />;
};


const MakeAShape = ({key, type, attributes}) => {
    if (type === 'bbox') {
        return Rectangle(key, attributes);
    } else if (type === 'key_point') {
        return Circle(key, attributes);
    } else if (type === 'inst_segm') {
        return Polygon(key, attributes);
    } else if (type === 'sem_segm') {
        return Bitmap(key, attributes);
    }
    else {return '';}

};

const myCoolLinkPng = 'https://toppng.com/public/uploads/preview/water-texture-water-11562884439s4ftxqmf62.png';

const Bitmap = (key, attributes) => {
    const imgSrc = attributes.src;
    const imgId = attributes.id;

    return (
        <image xlinkHref={imgSrc} id={imgId} alt='bitmap' border='0' 
        x='0' y='0' height={'100%'} width={'100%'} key={key}
        preserveAspectRatio="none" />
    );
};


export {MakeAShape};
