import React, { useState, useEffect } from 'react';
import './fluxogramaOpt.css';
import CardDisciplineOpt from '../cardDisciplineOpt';
import {
  DISCIPLINA_OPT_GERAL,
  DISCIPLINA_OPT_ESPECIFICA,
  DISCIPLINA_OBRIGATORIA,
  STATUS_CONCLUIDA,
} from '../../utils/constants';

function FluxogramaOpt(props) {
  const { disciplines, schoolRecords, changeSchoolRecords, minOptgeral, minOptEspc, setExibir } =
    props;
  const [optCompleteEsp, setOptCompleteEsp] = useState([]);
  const [optCompleteG, setOptCompleteG] = useState([]);
  const [optIncompleteEsp, setOptIncompleteEsp] = useState([]);
  const [optIncompleteG, setOptIncompleteG] = useState([]);

  function calculaOpt(atual, type) {
    const minOpt = type === DISCIPLINA_OPT_GERAL ? minOptgeral : minOptEspc;
    const diference = minOpt - atual;

    if (diference % 4 === 0) {
      return diference / 4;
    }
    return diference / 4 + 1;
  }

  function pushIncompleteOpt(disciplinesOptComplete) {
    const disciplinesOptIncompleteG = [];
    const disciplinesOptIncompleteEsp = [];
    let minOptG = 0;
    let minOptE = 0;
    if (disciplinesOptComplete)
      disciplinesOptComplete.forEach((e) => {
        if (e.type === DISCIPLINA_OPT_GERAL && e.status === STATUS_CONCLUIDA) {
          minOptG += e.value;
        } else if (e.type === DISCIPLINA_OPT_ESPECIFICA && e.status === STATUS_CONCLUIDA) {
          minOptE += e.value;
        }
      });
    for (let index = 0; index < calculaOpt(minOptG, DISCIPLINA_OPT_GERAL); index += 1) {
      disciplinesOptIncompleteG.push({ name: DISCIPLINA_OPT_GERAL });
    }
    for (let index = 0; index < calculaOpt(minOptE, DISCIPLINA_OPT_ESPECIFICA); index += 1) {
      disciplinesOptIncompleteEsp.push({ name: DISCIPLINA_OPT_ESPECIFICA });
    }
    setOptIncompleteG(disciplinesOptIncompleteG);
    setOptIncompleteEsp(disciplinesOptIncompleteEsp);
  }

  const schoolRecordsUpdate = () => {
    const opts = disciplines && disciplines.filter((e) => e.type !== DISCIPLINA_OBRIGATORIA);
    if (schoolRecords && schoolRecords !== null) {
      const optsStatus =
        opts &&
        opts.map((e) => {
          const aux =
            schoolRecords &&
            schoolRecords.filter((h) => h.disciplineId === e.id && h.status === STATUS_CONCLUIDA);
          if (aux.length > 0) {
            return { ...e, status: aux[0].status };
          }
          return e;
        });
      const disciplinesOptCompleteEsp =
        optsStatus &&
        optsStatus.filter(
          (e) => e.type === DISCIPLINA_OPT_ESPECIFICA && e.status === STATUS_CONCLUIDA
        );
      const disciplinesOptCompleteG =
        optsStatus &&
        optsStatus.filter((e) => e.type === DISCIPLINA_OPT_GERAL && e.status === STATUS_CONCLUIDA);
      setOptCompleteEsp(disciplinesOptCompleteEsp);
      setOptCompleteG(disciplinesOptCompleteG);
      pushIncompleteOpt(optsStatus);
    } else {
      pushIncompleteOpt([]);
    }
  };

  useEffect(() => {
    schoolRecordsUpdate();
  }, [disciplines]);

  useEffect(() => {
    schoolRecordsUpdate();
  }, [schoolRecords]);

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  return (
    <div className="fluxogramaOpt-component">
      <div className="fluxogramaOpt-component-flex">
        {optCompleteG &&
          optCompleteG.map((discipline) => {
            return (
              <CardDisciplineOpt
                key={discipline.id}
                id={discipline.id}
                name={discipline.name}
                status={discipline.status}
                changeSchoolRecords={changeSchoolRecords}
              />
            );
          })}
        {optIncompleteG &&
          optIncompleteG.map((element, index) => {
            return (
              <CardDisciplineOpt
                key={generateKey(`optIncompleteG${index}`)}
                name={element.name}
                addDisciplineOpt={setExibir}
              />
            );
          })}
      </div>
      <div className="fluxogramaOpt-component-flex">
        {optCompleteEsp &&
          optCompleteEsp.map((discipline) => {
            return (
              <CardDisciplineOpt
                key={discipline.id}
                id={discipline.id}
                name={discipline.name}
                status={discipline.status}
                changeSchoolRecords={changeSchoolRecords}
              />
            );
          })}
        {optIncompleteEsp &&
          optIncompleteEsp.map((element, index) => {
            return (
              <CardDisciplineOpt
                key={generateKey(`optIncompleteEsp${index}`)}
                name={element.name}
                addDisciplineOpt={setExibir}
              />
            );
          })}
      </div>
    </div>
  );
}
export default FluxogramaOpt;
