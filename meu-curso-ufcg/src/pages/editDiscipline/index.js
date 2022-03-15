import React from 'react';
import { useParams } from 'react-router-dom';
import NewDiscipline from '../../components/newDiscipline/newDiscipline';

import './editDiscipline.css';

function EditDiscipline(props) {
  const { create } = props;

  const { id } = useParams();

  return (
    <div className="editDiscipline-background">
      <div className="editDiscipline-form">
        <div>
          <img
            src="https://cdn.discordapp.com/attachments/837038192355311627/937833279548186684/teste2.png"
            className="editDiscipline-logo"
            alt="homemate's logo"
          />
        </div>
        <div className="editDiscipline-content">
          <NewDiscipline id={id} isCreate={create} />
        </div>
      </div>
    </div>
  );
}

export default EditDiscipline;
