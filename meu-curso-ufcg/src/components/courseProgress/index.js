import React, { useState, useEffect } from 'react';
// import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

import { getCourseDetailsById } from '../../api';
import Progressbar from '../progressBar';
import BaseButton from '../button';

import {
  DISCIPLINA_OPT_GERAL,
  DISCIPLINA_OPT_ESPECIFICA,
  STATUS_CONCLUIDA,
  DISCIPLINA_OBRIGATORIA,
} from '../../utils/constants';

import './courseProgress.css';

function CourseProgress(props) {
  const { profile, schoolRecords } = props;

  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentCourseDisciplines, setCurrentCourseDisciplines] = useState(null);

  const history = useHistory();

  function calculaProgresso(type) {
    let creditos = 0;
    let porcentagem = 0;
    if (currentCourse !== null && currentCourse) {
      const aux = schoolRecords.filter(
        (e) =>
          e.type === type &&
          e.courseId === currentCourse.id &&
          e.SchoolRecords.status === STATUS_CONCLUIDA
      );
      aux.forEach((e) => {
        creditos += e.value;
      });
      if (type === DISCIPLINA_OPT_ESPECIFICA)
        porcentagem = (creditos * 100) / currentCourse.minOptSpecific;
      if (type === DISCIPLINA_OPT_GERAL)
        porcentagem = (creditos * 100) / currentCourse.minOptGeneral;
      if (type === DISCIPLINA_OBRIGATORIA) {
        if (currentCourseDisciplines) {
          let min = 1;
          currentCourseDisciplines.data.disciplines.forEach((e) => {
            if (e.type === DISCIPLINA_OBRIGATORIA) min += e.value;
          });
          porcentagem = (creditos * 100) / min;
        }
      }
    }
    return porcentagem;
  }

  const totalOptG = calculaProgresso(DISCIPLINA_OPT_GERAL);
  const totalOptE = calculaProgresso(DISCIPLINA_OPT_ESPECIFICA);
  const totalO = calculaProgresso(DISCIPLINA_OBRIGATORIA);

  useEffect(() => {
    if (currentCourse && currentCourse.id) {
      getCourseDetailsById(currentCourse.id, setCurrentCourseDisciplines);
    }
  }, [currentCourse]);

  useEffect(() => {
    const info = profile?.currentCourse;
    setCurrentCourse(info ?? null);
  }, [profile]);

  // useEffect(() => {
  //   return () => {
  //     setCurrentCourse(null);
  //     setCurrentCourseDisciplines(null);
  //   };
  // }, []);

  const changeCourse = () => {
    history.push('/changeCourse');
  };

  return (
    <>
      <div className="profile-userInfo-aligned">
        {profile != null && profile.currentCourse ? (
          <div className="profile-userInfo-course">
            <p>{profile.currentCourse.name}</p>
            <span>Obrigatórias</span>
            <Progressbar bgcolor="aquamarine" progress={totalO} height={30} />
            <span>Optativas gerais</span>
            <Progressbar bgcolor="aquamarine" progress={totalOptG} height={30} />
            <span>Optativas especificas</span>
            <Progressbar bgcolor="aquamarine" progress={totalOptE} height={30} />
          </div>
        ) : (
          <div className="profile-userInfo-course">
            <p className="label">Você não está vinculado a nenhum curso</p>
            <BaseButton styles={{ heigh: '70px', width: '130px' }} onClick={changeCourse}>
              Buscar Curso
            </BaseButton>
          </div>
        )}
      </div>
    </>
  );
}

export default CourseProgress;
