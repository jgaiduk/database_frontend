import React from 'react';
import { MakeAShape, getImgDimensions } from './Shapes';
import styles from '../../styles/OverlayWrapperStyle.css';



const OverlayWrapper = ({annotations, img}) => {
    return (
        <div className={styles.imgOverlayWrap}>
          <img src={img} alt='pic' id='img-main' />
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            xmlns="http://www.w3.org/2000/svg"
            width={'100%'} height={'100%'}
            viewBox="0 0 100 100"
            preserveAspectRatio="none" >
            
            {annotations.map((ann) => {
                return (
                  <MakeAShape 
                      key={ann.id}
                      type={ann.type} 
                      attributes={ann.attributes} />
                );
                
            })}
          </svg>
          </div>        
    );
};

export default OverlayWrapper;
