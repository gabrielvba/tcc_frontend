import React from 'react';

const ProgressBar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height,
    width: '100%',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    margin: '20px',
  };

  const Childdiv =
    progress > 100
      ? {
          height: '100%',
          width: '100%',
          backgroundColor: bgcolor,
          borderRadius: 40,
          textAlign: 'right',
        }
      : {
          height: '100%',
          width: `${progress}%`,
          backgroundColor: bgcolor,
          borderRadius: 40,
          textAlign: 'right',
        };

  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
