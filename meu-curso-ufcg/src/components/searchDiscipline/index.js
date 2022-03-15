/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

import CardDiscipline from '../cardDiscipline';
import Filter from '../filter';
import BaseButton from '../button';
import './searchDiscipline.css';

function SearchDiscipline(props) {
  const { disciplines, newDiscipline = false, seeCourse = false } = props;
  const [selectedValue, setSelectedValue] = useState('Todas');
  const [filteredList, setFilteredList] = useState(null);

  useEffect(() => {
    const info = disciplines;
    setFilteredList(info ?? null);
  }, [disciplines]);

  return (
    <>
      <Filter
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        disciplines={disciplines}
        setFilteredList={setFilteredList}
      />
      <div className="searchDisciplines-searchDisciplinesComponent-flex">
        {!seeCourse && newDiscipline && (
          <BaseButton
            profile="true"
            styles={{ heigh: '70px', width: '130px' }}
            onClick={() => newDiscipline()}
          >
            Criar Disciplina
          </BaseButton>
        )}
        {filteredList &&
          filteredList.map((discipline) => {
            return (
              <CardDiscipline
                isEdit={newDiscipline && !seeCourse}
                key={discipline.id}
                id={discipline.id}
                discipline={discipline}
                status={discipline.status}
              />
            );
          })}
      </div>
    </>
  );
}

export default SearchDiscipline;
