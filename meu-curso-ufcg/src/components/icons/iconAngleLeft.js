import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

function AngleLeft({ size = 'lg', color = '#112D4E', styles = {} }) {
  return <FontAwesomeIcon icon={faAngleLeft} size={size} style={{ color, ...styles }} />;
}

export default AngleLeft;
