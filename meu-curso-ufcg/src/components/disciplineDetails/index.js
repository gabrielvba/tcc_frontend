/* eslint-disable react/no-array-index-key */

// import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router';

import { getDisciplineDetails } from '../../api';
import Loading from '../loading';

import './disciplineDetails.css';

function DisciplineDetails(props) {
  const { id } = props;

  //  const { id } = useParams();
  //  const history = useHistory();

  const [discipline, setDisciplineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDisciplineDetails(id, setDisciplineData, setIsLoading);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {discipline && (
            <div
              key={`disciplineDetails_${id}`}
              className="disciplineDetails-disciplineDetailsComponent-flex"
            >
              <div className="disciplineDetails-disciplineDetailsComponent-info">
                <p>Nome:</p>
                <p>{discipline.name}</p>
              </div>
              <p>Descrição:</p>
              <div className="disciplineDetails-disciplineDetailsComponent-info-description">
                <p>{discipline.description}</p>
              </div>
              <div className="disciplineDetails-disciplineDetailsComponent-info">
                <p>Tipo:</p>
                <p>{discipline.type}</p>
                <p>Creditos:</p>
                <p>{discipline.value}</p>
                <p>codigo:</p>
                <p>{discipline.code}</p>
              </div>
              <p>Dependencias:</p>
              <div className="disciplineDetails-disciplineDetailsComponent-info-dependency">
                {discipline.dependency.map((e) => (
                  <p key={`Dependency${e.id}ofDiscipline${id}`}>{e.name}</p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default DisciplineDetails;
