import React, { useState, useEffect } from 'react';
import './fluxograma.css';
import CardDiscipline from '../cardDiscipline';
import Period from '../period';
import { DISCIPLINA_OBRIGATORIA } from '../../utils/constants';

function Fluxograma(props) {
  const { disciplines, schoolRecords, changeSchoolRecords, newDiscipline = false } = props;
  const [matriz, setMatriz] = useState(null);
  const [dependecy, setDependecy] = useState([]);
  const [lastPeriod, setLastPeriod] = useState(0);

  const getLastPeriod = () => {
    if (lastPeriod === 0) {
      let last = 0;
      if (disciplines) {
        disciplines.forEach((element) => {
          if (element.period > last) last = element.period;
        });
        setLastPeriod(last + 1);
        return last + 1;
      }
    }
    return lastPeriod;
  };

  const schoolRecordsUpdate = () => {
    const disciplinesFiltered =
      disciplines && disciplines.filter((e) => e.type === DISCIPLINA_OBRIGATORIA);
    if (schoolRecords && schoolRecords !== null) {
      const disciplinesAtt =
        disciplinesFiltered &&
        disciplinesFiltered.map((e) => {
          const aux = schoolRecords && schoolRecords.filter((h) => h.disciplineId === e.id);
          if (aux.length > 0) {
            return { ...e, status: aux[0].status };
          }
          return e;
        });
      const matrizaux = [];
      const x = getLastPeriod();
      for (let index = 0; index < x; index += 1) {
        const element =
          disciplinesAtt !== null &&
          disciplinesAtt.filter((e) => {
            return e.period === index;
          });
        matrizaux.push(element);
      }
      setMatriz(matrizaux);
    }
  };

  function createMatriz() {
    if (schoolRecords) {
      schoolRecordsUpdate();
    } else {
      const disciplinesFiltered =
        disciplines && disciplines.filter((e) => e.type === DISCIPLINA_OBRIGATORIA);
      const matrizaux = [];
      const x = getLastPeriod();
      for (let index = 0; index < x; index += 1) {
        const element =
          disciplinesFiltered !== null &&
          disciplinesFiltered.filter((e) => {
            return e.period === index;
          });
        matrizaux.push(element);
      }
      setMatriz(matrizaux);
    }
  }

  useEffect(() => {
    createMatriz();
  }, [disciplines]);

  useEffect(() => {
    schoolRecordsUpdate();
  }, [schoolRecords]);

  return (
    <div className="fluxograma-component-flex">
      {matriz &&
        matriz.map((periodArray, index) => {
          return (
            <div key={'period'.concat(index)} className="fluxograma-component-flex-period">
              {periodArray && periodArray.length > 0 && <Period periodNumber={index} />}
              {periodArray &&
                periodArray.map((discipline) => {
                  return (
                    <CardDiscipline
                      isFluxograma
                      isEdit={newDiscipline}
                      changeSchoolRecords={changeSchoolRecords}
                      dependecy={dependecy}
                      setDependecy={setDependecy}
                      key={discipline.id}
                      id={discipline.id}
                      discipline={discipline}
                      status={discipline.status}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}

export default Fluxograma;
