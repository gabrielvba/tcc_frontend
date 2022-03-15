/* eslint-disable no-plusplus */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import './course.css';
import IconArrowDown from '../../components/icons/iconArrowDown';
import Navbar from '../../components/navbar/Navbar';
import Fluxograma from '../../components/fluxograma';
import GroupButton from '../../components/groupButton';
import FluxogramaOpt from '../../components/fluxogramaOpt';
import SearchDiscipline from '../../components/searchDiscipline';

import { getCourseFluxograma } from '../../api';

function Course(props) {
  const { seeCourse = false } = props;
  const { id } = useParams();

  const [disciplines, setDisciplines] = useState(null);
  const [info, setInfo] = useState(null);

  const [filteredList, setFilteredList] = useState(null);
  const [expanded, setExpanded] = useState('panel1');
  const [exibir, setExibir] = useState('allDisciplines');
  const history = useHistory();

  const { data } = useQuery(`infoCourse:${id}`, () => getCourseFluxograma(id), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const allDisciplines = () => {
    setExibir('allDisciplines');
  };
  const flux = () => {
    setExibir('fluxograma');
  };

  useEffect(() => {
    const infoData = data?.data;
    setDisciplines(infoData?.disciplines ?? null);
    setFilteredList(infoData?.disciplines ?? null);
    setInfo(infoData ?? null);
  }, [data]);

  const newDiscipline = () => {
    history.push(`/course/${id}/createDiscipline`);
  };

  const allDisciplinesItem = filteredList && (
    <>
      <SearchDiscipline
        disciplines={disciplines}
        newDiscipline={newDiscipline}
        seeCourse={seeCourse}
      />
    </>
  );

  return (
    <Navbar>
      <div>
        <div className="course-flex course-content">
          <div className="course-flex-row">
            <span className="course-name">{data && data.data && data.data.name}</span>
          </div>
          <div className="course-flex-row">
            <div className="course-flex-menu">
              <GroupButton
                onclick1={flux}
                onclick2={allDisciplines}
                name1="Fluxograma"
                name2="Disciplinas"
              />
            </div>
          </div>
        </div>
        {exibir === 'fluxograma' ? (
          <div>
            <div className="course-content">
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<IconArrowDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>Disciplinas Obrigatorias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Fluxograma disciplines={disciplines} newDiscipline={!seeCourse} />
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="course-content">
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<IconArrowDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>Disciplinas optativas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FluxogramaOpt
                    minOptgeral={info?.minOptGeneral}
                    minOptEspc={info?.minOptSpecific}
                    disciplines={disciplines}
                    setExibir={setExibir}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        ) : (
          <div className="course-content">{allDisciplinesItem}</div>
        )}
      </div>
    </Navbar>
  );
}

export default Course;
