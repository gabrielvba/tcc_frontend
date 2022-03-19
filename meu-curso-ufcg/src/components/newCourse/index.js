/* eslint-disable react/jsx-boolean-value */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';

import './newCourse.css';
import { createNewCourse, updateCourseByID, deleteCourseByID, getCourseDetails } from '../../api';

const stylesInvalid = {
  label: {
    color: 'red',
  },
};

const stylesValid = {
  label: {
    color: '#F4F4F4',
  },
};

function NewCourse(props) {
  const { id, isCreate } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minOptSpecific, setMinOptSpecific] = useState('');
  const [minOptGeneral, setMinOptGeneral] = useState('');

  const [labelNameStyle, setLabelNameStyle] = useState({});
  const [labelDescriptionStyle, setlabelDescriptionStyle] = useState({});
  const [labelMinOptSpecific, setLabelMinOptSpecific] = useState({});
  const [labelMinOptGeneral, setlabelMinOptGeneral] = useState({});

  const [loading, setLoading] = useState(false);

  const [courseData, setCourseData] = useState(null);
  const history = useHistory();

  const validateName = () => {
    const validation = name === '' || name === null;

    setLabelNameStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateDescription = () => {
    const validation = description === '' || description === null;

    setlabelDescriptionStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateMinOptSpecific = () => {
    const validation = minOptSpecific === '' || minOptSpecific === null;

    setLabelMinOptSpecific(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateMinOptGeneral = () => {
    const validation = minOptGeneral === '' || minOptGeneral === null;

    setlabelMinOptGeneral(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateInfo = () => {
    const valid =
      validateName() && validateDescription() && validateMinOptSpecific && validateMinOptGeneral;
    return valid;
  };

  useEffect(() => {
    const info = courseData?.data;
    setName(info?.name ?? '');
    setDescription(info?.description ?? '');
    setMinOptSpecific(info?.minOptSpecific ?? '');
    setMinOptGeneral(info?.minOptGeneral ?? '');
  }, [courseData]);

  useEffect(() => {
    if (!isCreate) getCourseDetails(id, setCourseData);
  }, []);

  const retunToProfile = () => {
    history.push('/profile');
  };

  const create = async () => {
    if (validateInfo()) {
      const body = {
        newCourse: {
          name,
          description,
          minOptSpecific,
          minOptGeneral,
        },
      };
      await createNewCourse(body, setLoading);
      retunToProfile();
    }
  };

  const update = async () => {
    if (validateInfo()) {
      const body = {
        course: {
          name,
          description,
          minOptSpecific,
          minOptGeneral,
        },
      };
      await updateCourseByID(id, body, setLoading);
      retunToProfile();
    }
  };

  const deleteDiscipline = async () => {
    await deleteCourseByID(id, setLoading);
    retunToProfile();
  };

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <div className="component-newCourse-flex-modal">
          <Input name="Nome:" value={name} onChange={setName} styles={labelNameStyle} />
          <Input
            name="Descrição:"
            value={description}
            onChange={setDescription}
            styles={labelDescriptionStyle}
          />
          <Input
            type="number"
            name="Créditos Mínimo em disciplinas Optativas Gerais"
            value={minOptGeneral}
            onChange={setMinOptGeneral}
            styles={labelMinOptGeneral}
          />
          <Input
            type="number"
            name="Créditos Mínimos em disciplinas Optativas Especificas"
            value={minOptSpecific}
            onChange={setMinOptSpecific}
            styles={labelMinOptSpecific}
          />
          <BaseButton
            onClick={isCreate ? create : update}
            styles={{
              margin: '30px 0px',
              width: '100%',
              fontWeight: 'bold',
            }}
          >
            {isCreate ? 'CRIAR' : 'ATUALIZAR'}
          </BaseButton>
          {!isCreate && (
            <BaseButton
              danger
              onClick={deleteDiscipline}
              styles={{ width: '50%', fontWeight: 'bold' }}
            >
              DELETAR
            </BaseButton>
          )}
        </div>
      )}
    </>
  );
}

export default NewCourse;
