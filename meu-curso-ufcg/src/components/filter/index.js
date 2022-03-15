import React, { useEffect } from 'react';

import Radio from '@material-ui/core/Radio';
import Autocomplete from '../autocomplete';
import {
  DISCIPLINA_OPT_GERAL,
  DISCIPLINA_OPT_ESPECIFICA,
  DISCIPLINA_OBRIGATORIA,
} from '../../utils/constants';

import './filter.css';

function Filter(props) {
  const { selectedValue, setSelectedValue, disciplines, setFilteredList } = props;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (selectedValue !== 'Todas') {
      const filteredDisciplines =
        disciplines && disciplines.filter((e) => e.type === selectedValue);
      setFilteredList(filteredDisciplines);
    } else {
      setFilteredList(disciplines);
    }
  }, [selectedValue]);

  return (
    <div className="filter-flex">
      <Autocomplete option={selectedValue} data={disciplines} setSelectedCourse={setFilteredList} />
      <p>Todas</p>
      <Radio
        color="primary"
        checked={selectedValue === 'Todas'}
        onChange={handleChange}
        value="Todas"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'Todas' }}
      />
      <p>Obrigatorias</p>
      <Radio
        color="primary"
        checked={selectedValue === DISCIPLINA_OBRIGATORIA}
        onChange={handleChange}
        value={DISCIPLINA_OBRIGATORIA}
        name="radio-buttons"
        inputProps={{ 'aria-label': { DISCIPLINA_OBRIGATORIA } }}
      />
      <p>Optativas Especificas</p>
      <Radio
        color="primary"
        checked={selectedValue === DISCIPLINA_OPT_ESPECIFICA}
        onChange={handleChange}
        value={DISCIPLINA_OPT_ESPECIFICA}
        name="radio-buttons"
        inputProps={{ 'aria-label': 'optEsp' }}
      />
      <p>Optativas Gerais</p>
      <Radio
        color="primary"
        checked={selectedValue === DISCIPLINA_OPT_GERAL}
        onChange={handleChange}
        value={DISCIPLINA_OPT_GERAL}
        name="radio-buttons"
        inputProps={{ 'aria-label': 'optG' }}
      />
    </div>
  );
}

export default Filter;
