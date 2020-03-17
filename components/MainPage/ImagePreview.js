import React, { useContext } from 'react';
import { AppContext } from '../MainStore';
import pako from 'pako';
import _ from 'lodash';
import Canvas from './Canvas';


const parseAnnotations = ({ rawData, visibility }) => {

    const isVisible = (key) => {
        if (_.includes(Object.keys(visibility), key) && visibility[key]) { return true; }
        else { return false; }
    };

    let parsedAnnotations = [];
    rawData.map((a) => {
        if (a.type === 'bbox') {
            if (isVisible('bbox')) {
                parsedAnnotations.push(
                    {
                        'type': 'rectangle',
                        'coords': a.attributes.coordinates,
                        'label': a.attributes.classes[0] || 'undefined'
                    }
                );
            }
        } else if (a.type === 'key_points') {
            if (isVisible('key_points')) {
                parsedAnnotations.push(
                    {
                        'type': 'key_points',
                        'points': a.points,
                        'links': a.links,
                        'label': a.classes[0] || 'undefined'
                    }
                );
            }
        } else if (a.type === 'inst_segm') {
            if (isVisible('inst_segm')) {
                if ('erasepoly' in a.attributes) {
                    parsedAnnotations.push(
                        { 'type': 'polygon', 'coords': a.attributes.erasepoly, 'label': 'erasepoly' }
                    );
                }
                parsedAnnotations.push(
                    {
                        'type': 'polygon',
                        'coords': a.attributes.poly,
                        'label': a.attributes.classes[0] || 'undefined'
                    }
                );
            }
        } else if (a.type === 'sem_segm') {
            if (isVisible('sem_segm')) {
                let binary_data = new Uint8Array(atob(a.attributes.bitmap).split('').map((x) => {
                    return x.charCodeAt(0);
                }));
                let img = pako.inflate(binary_data, { to: 'string' });
                parsedAnnotations.push(
                    { 'type': 'bitmap', 'img': 'data:image/png;base64,' + img, 'label': a.attributes.classes[0] || 'undefined' }
                );
            }
        } else {
            console.log('parsing failed, will not draw', a);
        }
    });
    return parsedAnnotations;
};

const extractAnnotationTypes = (annotations) => {
    let types = {};
    {
        annotations.map((ann) => {
            if (!(ann.type in Object.keys(types))) {
                types[ann.type] = true;
            }
        });
    }
    return types;
};

const ImagePreview = () => {
    const { imgData, annotations,
        annotationTypesVisibility,
        syncAnnotationsVisibility } = useContext(AppContext);
    const types = extractAnnotationTypes(annotations);
    if (!(_.isEmpty(types)) && _.isEmpty(annotationTypesVisibility)) { syncAnnotationsVisibility(types); }
    const parsedAnnotations = parseAnnotations({
        rawData: annotations,
        visibility: annotationTypesVisibility,
    });
    return (
        <Canvas imgSrc={imgData} annotations={parsedAnnotations} />
    );
};

export default ImagePreview;