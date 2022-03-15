import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function GroupButton(props) {
  const { onclick1, onclick2, name1, name2 } = props;

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="contained primary button group">
        <Button onClick={onclick1}>{name1}</Button>
        <Button onClick={onclick2}>{name2}</Button>
      </ButtonGroup>
    </div>
  );
}
export default GroupButton;
