/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Tooltip } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import './cardDiscipline.css';
import DisciplineDetails from '../disciplineDetails';
import IconEdit from '../icons/iconEdit';
import IconClose from '../icons/iconClose';
import { STATUS_PENDENTE, STATUS_CONCLUIDA } from '../../utils/constants';

function CardDiscipline(props) {
  const {
    id,
    discipline,
    status,
    dependecy,
    setDependecy,
    changeSchoolRecords = false,
    isFluxograma = false,
    isEdit = false,
  } = props;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(status);
  const history = useHistory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let className = 'discipline-card';
  className += dependecy && dependecy.includes(id) ? ' cardDiscipline-alert' : '';
  className +=
    type && type === STATUS_CONCLUIDA ? ' cardDiscipline-complete' : ' cardDiscipline-defaut';

  const editDiscipline = () => {
    history.push(`/editDiscipline/${id}`);
  };

  const start = () => {
    if (isFluxograma) {
      const disciplineDependecy = discipline.dependency.map((e) => e.id);
      const disciplineUnlock = discipline.discipline.map((e) => e.id);
      setDependecy(disciplineDependecy.concat(disciplineUnlock));
    }
  };

  const leave = () => {
    if (isFluxograma) setDependecy([]);
  };

  const update = () => {
    if (isFluxograma) {
      const newStatus = type === STATUS_CONCLUIDA ? STATUS_PENDENTE : STATUS_CONCLUIDA;
      setType(newStatus);
      changeSchoolRecords({ id, status, newStatus });
    }
  };

  return (
    <>
      <div
        onMouseOut={leave}
        onMouseOver={start}
        onClick={changeSchoolRecords ? update : handleOpen}
        className={className}
      >
        <span className="cardDiscipline-title" key="cardDiscipline-name">
          {discipline.name}
        </span>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#8ec6c5',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent>
          <div className="component-cardDiscipline-edit">
            <div className="profile-edit-info-icon">
              <Tooltip title="fechar">
                <button onClick={() => handleClose()} type="button" className="profile-icon-button">
                  <IconClose size="2x" />
                </button>
              </Tooltip>
            </div>
            <DisciplineDetails id={id} />
            {isEdit && (
              <div className="discipline-edit-info-icon">
                <Tooltip title="editar informações">
                  <button
                    onClick={() => editDiscipline()}
                    type="button"
                    className="profile-icon-button"
                  >
                    <IconEdit size="2x" />
                  </button>
                </Tooltip>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CardDiscipline;
