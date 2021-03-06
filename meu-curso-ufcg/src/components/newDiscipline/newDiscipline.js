import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Radio from '@material-ui/core/Radio';

import IconArrowLeft from '../icons/iconArrowLeft';
import BaseButton from '../button';
import Input from '../input';
import Loading from '../loading';
import Autocomplete from '../autocomplete';

import './newDiscipline.css';

import {
  createNewDiscipline,
  updateDisciplineByID,
  deleteDisciplineByID,
  getDisciplineDetails,
  getCourseDetailsById,
} from '../../api';
import {
  DISCIPLINA_OPT_GERAL,
  DISCIPLINA_OPT_ESPECIFICA,
  DISCIPLINA_OBRIGATORIA,
} from '../../utils/constants';

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

function NewDiscipline(props) {
  const { id, isCreate } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState(null);
  const [summary, setSummary] = useState('');
  const [period, setPeriod] = useState(null);
  const [type, setType] = useState(DISCIPLINA_OBRIGATORIA);
  const [value, setValue] = useState('');

  const [disciplineData, setDisciplineData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const [disciplines, setDisciplines] = useState([]);
  const [dependecyList, setDependecyList] = useState([]);
  const [loading, setLoading] = useState();

  const history = useHistory();
  const backToCourse = () => {
    history.push(`/course/${id}`);
  };
  const backToProfile = () => {
    history.push(`/course/${disciplineData.courseId}`);
  };

  useEffect(() => {
    const info = disciplineData;
    setName(info?.name ?? '');
    setDescription(info?.description ?? '');
    setCode(info?.code ?? code);
    setSummary(info?.summary ?? '');
    setPeriod(info?.period ?? period);
    setType(info?.type ?? DISCIPLINA_OBRIGATORIA);
    setValue(info?.value ?? 4);
  }, [disciplineData]);

  useEffect(() => {
    if (!isCreate) getDisciplineDetails(id, setDisciplineData, setLoading);
    if (isCreate) getCourseDetailsById(id, setCourseData);
  }, []);

  useEffect(() => {
    const info = courseData?.data;
    setDisciplines(info?.disciplines ?? []);
  }, [courseData]);

  useEffect(() => {
    setDependecyList(disciplineData?.dependency ?? []);
    if (disciplineData?.courseId) getCourseDetailsById(disciplineData.courseId, setCourseData);
  }, [disciplineData]);

  const [labelNameStyle, setLabelNameStyle] = useState({});
  // const [labelDescriptionStyle, setlabelDescriptionStyle] = useState({});

  const validateName = () => {
    const validation = name === '' || name === null;

    setLabelNameStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  // const validateDescription = () => {
  //   const validation = description === '' || description === null;

  //   setlabelDescriptionStyle(validation ? stylesInvalid : stylesValid);

  //   return !validation;
  // };

  const validateInfo = () => {
    const valid = validateName();
    return valid;
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const addDependency = (discipina) => {
    const aux = dependecyList && dependecyList.filter((e) => e.id !== discipina.id);
    aux.push(discipina);
    setDependecyList(aux);
  };

  const create = async () => {
    if (validateInfo()) {
      const dependencias = dependecyList.map((e) => e.id);
      const body = {
        discipline: {
          name,
          description,
          code: code ?? 0,
          summary,
          period: period ?? 1,
          type,
          value,
          courseId: id,
          dependencias,
        },
      };
      console.log(body);
      await createNewDiscipline(body, setLoading);
      backToCourse();
    }
  };

  const update = async () => {
    if (validateInfo()) {
      const oldDependency = disciplineData.dependency.map((e) => e.id);
      const dependecyListIds = dependecyList.map((e) => e.id);
      const dependencias = dependecyListIds.filter((e) => !oldDependency.includes(e));
      const removeDependencies = oldDependency.filter((e) => !dependecyListIds.includes(e));
      console.log(code);

      const body = {
        discipline: {
          name,
          description,
          code: code ?? 0,
          summary,
          period: period ?? 1,
          type,
          value,
          dependencias,
          removeDependencies,
        },
      };
      console.log(body);
      await updateDisciplineByID(id, body, setLoading);
      backToProfile();
    }
  };

  const deleteDiscipline = async () => {
    await deleteDisciplineByID(id, setLoading);
    backToProfile();
  };

  const removeDependecy = (e) => {
    const aux = dependecyList.filter((element) => element.id !== e);
    setDependecyList(aux);
  };
  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <div className="component-newDiscipline-flex-row">
          <div>
            <button
              key="back"
              type="button"
              className="editDiscipline-back-icon"
              onClick={() =>
                history.push(isCreate ? `/course/${id}` : `/course/${disciplineData.courseId}`)
              }
            >
              <IconArrowLeft size="2x" styles={{ zIndex: 4, color: '#FFFFFF' }} />
            </button>
          </div>
          <div className="component-newDiscipline-flex-modal">
            <div className="component-newDiscipline-form">
              <Input name="Nome" value={name} onChange={setName} styles={labelNameStyle} />
              <Input
                name="Descri????o"
                value={description}
                onChange={setDescription}
                // styles={labelDescriptionStyle}
              />
              {/* <Input
                name="Ementa"
                value={summary}
                onChange={setSummary}
              /> */}
              <div className="component-newDiscipline-flex-row">
                <div className="component-newDiscipline-flex-row-uni">
                  <Input type="number" name="C??digo" value={code} onChange={setCode} />
                </div>
                <div className="component-newDiscipline-flex-row-uni">
                  <Input type="number" name="Per??odo" value={period} onChange={setPeriod} />
                </div>
                <div className="component-newDiscipline-flex-row-uni">
                  <Input type="number" name="Cr??ditos" value={value} onChange={setValue} />
                </div>
              </div>
              <div className="component-newDiscipline-flex-row">
                <Radio
                  color="primary"
                  checked={type === DISCIPLINA_OBRIGATORIA}
                  onChange={handleChange}
                  value={DISCIPLINA_OBRIGATORIA}
                  name="radio-buttons"
                  inputProps={{ 'aria-label': DISCIPLINA_OBRIGATORIA }}
                />
                <p>{DISCIPLINA_OBRIGATORIA}</p>
                <Radio
                  color="primary"
                  checked={type === DISCIPLINA_OPT_ESPECIFICA}
                  onChange={handleChange}
                  value={DISCIPLINA_OPT_ESPECIFICA}
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'optEsp' }}
                />
                <p>{DISCIPLINA_OPT_ESPECIFICA}</p>
                <Radio
                  color="primary"
                  checked={type === DISCIPLINA_OPT_GERAL}
                  onChange={handleChange}
                  value={DISCIPLINA_OPT_GERAL}
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'optG' }}
                />
                <p>{DISCIPLINA_OPT_GERAL}</p>
              </div>
              <div className="component-newDiscipline-form-dependency">
                <p>Adicionar dependencias:</p>
                <Autocomplete
                  suggestion
                  data={disciplines}
                  setSelectedCourse={addDependency}
                  setLoading={setLoading}
                />
                <div className="component-newDisciplineComponent-tags">
                  {dependecyList &&
                    dependecyList.length > 0 &&
                    dependecyList.map((e) => (
                      <span key={e.id} onClick={() => removeDependecy(e.id)} className="tag">
                        {e.name}
                      </span>
                    ))}
                </div>
              </div>
              <div className="component-newDiscipline-form-button">
                <BaseButton
                  onClick={isCreate ? create : update}
                  styles={{ margin: '30px 0px', width: '100%', fontWeight: 'bold' }}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewDiscipline;
