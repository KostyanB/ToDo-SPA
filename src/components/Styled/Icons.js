import React from 'react';
import IconsSvg from '../../img/icons.svg';

const Icons = ({ name, fill, stroke, width, height }) => {

    return(
        <svg className={`icon-${name}`} fill={fill} stroke={stroke} width={width} height={height}>
            <use xlinkHref={`${IconsSvg}#${name}`} />
        </svg>
    )
}

export default Icons;