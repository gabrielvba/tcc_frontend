import React from 'react';
import './base.css';

function BaseButton(props) {
  const { danger, profile = false, onClick, children, styles } = props;

  let className = profile ? 'component-button-base-profile' : 'component-button-base-button';

  className += danger ? ' component-button-base-danger' : ' component-button-base-button-color';

  return (
    <button type="button" className={className} onClick={onClick} style={styles}>
      {children}
    </button>
  );
}

export default BaseButton;
