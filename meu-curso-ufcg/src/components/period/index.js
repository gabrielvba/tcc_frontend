/* eslint-disable react/button-has-type */
import React from 'react';

import './period.css';

function Period(props) {
  const { periodNumber } = props;

  return (
    <>
      <div className="period-component">
        <div className="period-component-info">
          <p key="flipCardFrontKey1">{periodNumber}º Periodo</p>
        </div>
      </div>
    </>
  );
}

export default Period;
