/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import BaseButton from '../button';
import Loading from '../loading';
import { editProfileInfo } from '../../api';

import './courseDetails.css';

function CourseDetails(props) {
  const { id, data, see = false } = props;
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const seeCourse = () => {
    history.push(`/seeCourse/${id}`);
  };
  const myCourse = () => {
    history.push(`/course/${id}`);
  };

  const edit = async () => {
    setLoading(true);
    const body = {
      newProfile: {
        currentCourseId: id,
      },
    };
    await editProfileInfo(body, setLoading);
    history.push('/profile');
  };

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <>
          {data && (
            <div className="courseDetails-courseDetailsComponent-flex">
              <div className="courseDetails-courseDetailsComponent-info">
                <p>Curso:</p>
                <p>{data.name}</p>
              </div>
              <p>Descrição:</p>
              <div className="courseDetails-courseDetailsComponent-info-description">
                <p>{data.description}</p>
              </div>
              <p>Minimo de creditos em disciplinas:</p>
              <div className="courseDetails-courseDetailsComponent-info">
                <p>Optativas especificas:</p>
                <p>{data.minOptSpecific}</p>
                <p>Optativas Gerais:</p>
                <p>{data.minOptGeneral}</p>
              </div>
              <div className="courseDetails-courseDetailsComponent-info-button">
                <BaseButton
                  onClick={see ? seeCourse : myCourse}
                  className="flip-card-back-button flip-card-back-button-see-page"
                >
                  Ver Curso
                </BaseButton>
                {see && (
                  <BaseButton
                    onClick={edit}
                    className="flip-card-back-button flip-card-back-button-see-page"
                  >
                    Entrar no curso
                  </BaseButton>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CourseDetails;
