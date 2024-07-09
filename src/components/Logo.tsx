import React from 'react';
import Svg, {Path, Polygon} from 'react-native-svg';

const CustomIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40">
    <Path
      fill="#fe9526"
      d="M20,14l-1.7,3h-3.5l-4.4-7.5c-0.8-1.4-0.3-3.3,1.1-4.1s3.3-0.4,4.1,1.1L20,14z"
    />
    <Path
      fill="#595bd4"
      d="M27,35c-1,0-2-0.5-2.6-1.5L20,26l-4.4,7.6C15,34.5,14,35,13,35c-2.2,0.1-3.8-2.6-2.6-4.5l4.4-7.5h10.4l4.4,7.5C30.8,32.4,29.2,35.1,27,35z"
    />
    <Path
      fill="#167ffc"
      d="M36,20c0,1.7-1.3,3-3,3h-7.8l-3.5-6L20,14l4.4-7.6c0.8-1.4,2.7-1.9,4.1-1.1s1.9,2.7,1.1,4.1L25.2,17H33C34.7,17,36,18.3,36,20z"
    />
    <Path
      fill="#53d86a"
      d="M18.3,17l-3.5,6H7c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3H18.3z"
    />
    <Polygon fill="#0064dc" points="25.2 23 14.8 23 18.3 17 20 14 21.7 17" />
  </Svg>
);

export default CustomIcon;
