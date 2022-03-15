import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { Tooltip } from '@material-ui/core';

import BaseButton from '../../components/button';
import Navbar from '../../components/navbar/Navbar';
import IconEdit from '../../components/icons/iconEdit';
import Card from '../../components/card';
import Progressbar from '../../components/progressBar';

import { getUserInfo } from '../../api';
import './profile.css';
import {
  DISCIPLINA_OPT_GERAL,
  DISCIPLINA_OPT_ESPECIFICA,
  STATUS_CONCLUIDA,
} from '../../utils/constants';

function Profile() {
  const [courses, setCourses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [schoolRecords, setSchoolRecords] = useState([]);

  const [email, setEmail] = useState(null);

  const history = useHistory();

  const { data } = useQuery('logged user info', () => getUserInfo(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    const info = data?.data;
    setCourses(info?.courses ?? '');
    setProfile(info?.profile ?? '');
    setSchoolRecords(info?.schoolRecords ?? '');
    setEmail(info?.email ?? '');
  }, [data]);

  const createCourse = () => {
    history.push('/createCourse');
  };
  const changeCourse = () => {
    history.push('/changeCourse');
  };

  function calculaProgresso(type) {
    let creditos = 0;
    let porcentagem = 0;
    if (profile != null && profile.currentCourse) {
      const aux = schoolRecords.filter(
        (e) => e.type === type && e.SchoolRecords.status === STATUS_CONCLUIDA
      );
      aux.forEach((e) => {
        creditos += e.value;
      });
      if (type === DISCIPLINA_OPT_ESPECIFICA)
        porcentagem = (creditos * 100) / profile.currentCourse.minOptSpecific;
      if (type === DISCIPLINA_OPT_GERAL)
        porcentagem = (creditos * 100) / profile.currentCourse.minOptGeneral;
    }
    return porcentagem;
  }

  const totalOptG = calculaProgresso(DISCIPLINA_OPT_GERAL);
  const totalOptE = calculaProgresso(DISCIPLINA_OPT_ESPECIFICA);

  return (
    <Navbar data={data}>
      <div className="profile-flex">
        <div className="profile-info">
          <div className="profile-userInfo">
            <div className="profile-userInfo-aligned">
              <div>
                <p className="label">
                  Nome: {profile != null && profile.name} {profile != null && profile.lastName}
                </p>
              </div>
            </div>
            <div className="profile-userInfo-aligned">
              <p className="label">Email: {email != null && email}</p>
            </div>
            {profile != null && profile.currentCourse && (
              <div className="profile-userInfo-ChangeCourse">
                <p className="label">Mudar de curso</p>
                <BaseButton styles={{ heigh: '70px', width: '130px' }} onClick={changeCourse}>
                  Buscar Curso
                </BaseButton>
              </div>
            )}
          </div>
          <div className="profile-CurrentCourseInfo">
            <div className="profile-userInfo-aligned">
              {profile != null && profile.currentCourse ? (
                <div className="profile-userInfo-course">
                  <p>{profile.currentCourse.name}</p>
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
          </div>
          <div className="profile-edit-info-icon">
            <Tooltip title="editar informações">
              <button
                onClick={() => history.push(`/editProfile`)}
                type="button"
                className="profile-icon-button"
              >
                <IconEdit size="2x" />
              </button>
            </Tooltip>
          </div>
        </div>
        <p>Meus cursos:</p>
        <div className="profile-myCourses">
          <BaseButton
            profile="true"
            styles={{ heigh: '70px', width: '130px' }}
            onClick={createCourse}
          >
            CRIAR CURSO
          </BaseButton>
          {courses.length > 0 &&
            courses.map((course) => <Card key={course.id} id={course.id} data={course} />)}
        </div>
      </div>
    </Navbar>
  );
}

export default Profile;
