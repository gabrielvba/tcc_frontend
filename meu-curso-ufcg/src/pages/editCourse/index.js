import React from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

import NewCourse from '../../components/newCourse/index';
import IconArrowLeft from '../../components/icons/iconArrowLeft';

import './editCourse.css';

function EditCourse(props) {
  const { create } = props;

  const history = useHistory();
  const { id } = useParams();

  return (
    <div className="editCourse-background">
      <div>
        <button
          key="back"
          type="button"
          className="editCourse-back-icon"
          onClick={() => history.push('/profile')}
        >
          <IconArrowLeft size="2x" styles={{ zIndex: 4, color: '#FFFFFF' }} />
        </button>
      </div>
      <div className="editCourse-form">
        <div>
          <img
            src="https://cdn.discordapp.com/attachments/837038192355311627/937833279548186684/teste2.png"
            className="editCourse-logo"
            alt="homemate's logo"
          />
        </div>
        <div className="editCourse-content">
          <NewCourse id={id} isCreate={create} />
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
