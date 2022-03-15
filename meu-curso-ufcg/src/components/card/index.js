/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Tooltip } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import CourseDetails from '../courseDetails';
import IconEdit from '../icons/iconEdit';
import IconClose from '../icons/iconClose';

import './card.css';

function Card(props) {
  const { id, data } = props;
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editCourse = () => {
    history.push(`/editCourse/${id}`);
  };

  return (
    <>
      <div onClick={handleOpen} className="meu-curso-card">
        <div className="meu-curso-card-info">
          <span className="meu-curso-card-name" key="flipCardFrontKey1">
            {data.name}
          </span>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: 'rgb(160, 207, 255)',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent>
          <div className="component-card-edit">
            <div className="profile-edit-info-icon">
              <Tooltip title="fechar">
                <button onClick={() => handleClose()} type="button" className="profile-icon-button">
                  <IconClose size="2x" />
                </button>
              </Tooltip>
            </div>
            <CourseDetails id={id} data={data} />
            <div className="profile-edit-info-icon">
              <Tooltip title="editar informações">
                <button onClick={() => editCourse()} type="button" className="profile-icon-button">
                  <IconEdit size="2x" />
                </button>
              </Tooltip>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Card;
