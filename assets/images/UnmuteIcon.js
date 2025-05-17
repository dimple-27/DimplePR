import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const UnmuteIcon = ({ size = 32, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Speaker body */}
    <Path
      d="M5 9V15H9L14 20V4L9 9H5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Small wave */}
    <Path
      d="M16 9.35C16.6 10.1 16.6 11.1 16 11.85"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Big wave */}
    <Path
      d="M18 7C19.8 9 19.8 13 18 15"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
