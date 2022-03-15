/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { STATUS_PENDENTE, STATUS_CONCLUIDA } from '../../utils/constants';
import './cardDisciplineOpt.css';

function CardDisciplineOpt(props) {
  const { id, name, status, changeSchoolRecords = false, addDisciplineOpt } = props;
  const [type, setType] = useState(status);

  let className = 'cardDisciplineOpt-card';
  className +=
    type && type === STATUS_CONCLUIDA ? ' cardDisciplineOpt-complete' : ' cardDisciplineOpt-defaut';

  const update = () => {
    const newStatus = type === STATUS_CONCLUIDA ? STATUS_PENDENTE : STATUS_CONCLUIDA;
    setType(newStatus);
    changeSchoolRecords({ id, status, newStatus });
  };

  const addOpt = () => {
    addDisciplineOpt('lista');
  };

  return (
    <>
      <div onClick={changeSchoolRecords ? update : addOpt} className={className}>
        <span className="cardDisciplineOpt-card-name">{name}</span>
      </div>
    </>
  );
}

export default CardDisciplineOpt;
