import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const MuteIcon = ({ size = 32, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Mute cross */}
    <Path
      d="M9 9L15 15M15 9L9 15"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Speaker */}
    <Path
      d="M5 9V15H9L14 20V4L9 9H5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
