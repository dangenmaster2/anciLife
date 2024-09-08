// AutoCode.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const AnciLifeLogo = ({ width = 24, height = 24, color = '#000' }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M3.292,20.708a1,1,0,0,1,0-1.411L6.12,16.469A8.041,8.041,0,0,1,8.03,7.041C13.072,2,20.9,3.1,20.9,3.1S22,10.928,16.959,15.97a8.041,8.041,0,0,1-9.428,1.91L4.7,20.708A1,1,0,0,1,3.292,20.708Z"
      fill={color}
    />
  </Svg>
);

export default AnciLifeLogo;
