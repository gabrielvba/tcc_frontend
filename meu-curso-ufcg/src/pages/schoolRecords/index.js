/* eslint-disable no-plusplus */

import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Tooltip } from '@material-ui/core';
import { STATUS_CONCLUIDA } from '../../utils/constants';

import './schoolRecords.css';
import IconArrowDown from '../../components/icons/iconArrowDown';
// import SaveIcon from '../../components/icons/iconSave';

import Navbar from '../../components/navbar/Navbar';
import Fluxograma from '../../components/fluxograma';
import Table from '../../components/table';
import GroupButton from '../../components/groupButton';
import Loading from '../../components/loading';
import FluxogramaOpt from '../../components/fluxogramaOpt';

import { getMyCurrentCourse, getMySchoolRecords, createSchoolRecords } from '../../api';

function SchoolRecords() {
  const [schoolRecords, setSchoolRecords] = useState(null);
  const [disciplines, setDisciplines] = useState(null);
  const [info, setInfo] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(null);
  const [newSchoolRecords, setNewSchoolRecords] = useState([]);
  const [updateSchoolRecords, setUpdateSchoolRecords] = useState([]);
  const [expanded, setExpanded] = useState('panel1');
  const [exibir, setExibir] = useState('fluxograma');
  const [loading, setLoading] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const history = useQuery('logged user schoolRecords', () => getMySchoolRecords(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { data } = useQuery('logged user CurrentCourse', () => getMyCurrentCourse(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const lista = () => {
    setNewSchoolRecords([]);
    setUpdateSchoolRecords([]);
    setExibir('lista');
  };
  const flux = () => {
    setNewSchoolRecords([]);
    setUpdateSchoolRecords([]);
    setExibir('fluxograma');
  };

  const updateRefresh = (schoolRecordsOld, updates, news) => {
    const schoolRecordsOldUpdate = schoolRecordsOld.map((e) => {
      const aux = updates.filter((old) => {
        return e.disciplineId === old.schoolRecord.disciplineId;
      });
      if (aux.length > 0) {
        e.status = aux[0].schoolRecord.status;
      }
      return e;
    });
    const schoolRecordsNews =
      news &&
      news.map((e) => {
        return { schoolRecord: { disciplineId: e, status: STATUS_CONCLUIDA } };
      });

    setRefreshHistory(schoolRecordsOldUpdate.concat(schoolRecordsNews));
  };

  const saveSchoolRecords = async () => {
    createSchoolRecords(
      { schoolRecords: newSchoolRecords, updateSchoolRecords },
      setRefreshHistory,
      setLoading
    );
    updateRefresh(schoolRecords, updateSchoolRecords, newSchoolRecords);
    setNewSchoolRecords([]);
    setUpdateSchoolRecords([]);
    setExibir('fluxograma');
  };

  const changeSchoolRecords = (element) => {
    if (element.status === undefined) {
      if (element.newStatus === STATUS_CONCLUIDA) {
        setNewSchoolRecords(newSchoolRecords.concat(element.id));
      } else {
        setNewSchoolRecords(newSchoolRecords.filter((e) => e !== element.id));
      }
    } else {
      const updateSchoolRecordsFiltered = updateSchoolRecords.filter(
        (e) => e.schoolRecord.disciplineId !== element.id
      );
      const updateSchoolRecord = {
        schoolRecord: { disciplineId: element.id, status: element.newStatus },
      };
      setUpdateSchoolRecords(updateSchoolRecordsFiltered.concat(updateSchoolRecord));
    }
  };

  const changeSchoolRecordsList = (elements) => {
    const news = [];
    const update = [];
    elements.forEach((disciplineId) => {
      const existSchoolRecord = schoolRecords.filter((e) => e.disciplineId === disciplineId);
      if (existSchoolRecord.length <= 0) {
        news.push(disciplineId);
      } else {
        const updateSchoolRecord = { schoolRecord: { disciplineId, status: STATUS_CONCLUIDA } };
        update.push(updateSchoolRecord);
      }
    });
    setNewSchoolRecords(news);
    setUpdateSchoolRecords(update);
  };

  useEffect(() => {
    const infoData = data?.data;
    setDisciplines(infoData?.disciplines ?? null);
    setInfo(infoData ?? null);
  }, [data]);

  useEffect(() => {
    const infoHistory = history?.data?.data;
    setSchoolRecords(infoHistory ?? null);
  }, [history]);

  useEffect(() => {
    const infoRefresh = refreshHistory?.data;
    if (infoRefresh) setSchoolRecords(infoRefresh);
  }, [refreshHistory]);

  return (
    <Navbar>
      <>
        {loading ? (
          <div style={{ marginTop: '400px' }}>
            <Loading />
          </div>
        ) : (
          <div>
            <div className="schoolRecords-flex-menu">
              <div>
                <GroupButton onclick1={flux} onclick2={lista} name1="Fluxograma" name2="Lista" />
              </div>
              <div className="schoolRecords-flex-menu-left">
                <Tooltip title="Salvar disciplinas no seu historico">
                  <div className="schoolRecords-button">
                    <button onClick={saveSchoolRecords} type="button">
                      {/* <SaveIcon  /> */}
                      SALVAR
                    </button>
                  </div>
                </Tooltip>
              </div>
            </div>
            {exibir === 'fluxograma' ? (
              <div>
                <div className="schoolRecords-contente">
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                      expandIcon={<IconArrowDown />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography>Disciplinas Obrigatorias</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Fluxograma
                        changeSchoolRecords={changeSchoolRecords}
                        schoolRecords={schoolRecords}
                        disciplines={disciplines}
                      />
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div className="schoolRecords-contente">
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
                        changeSchoolRecords={changeSchoolRecords}
                        schoolRecords={schoolRecords}
                        disciplines={disciplines}
                        setExibir={setExibir}
                      />
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            ) : (
              <div className="schoolRecords-contente">
                <Table
                  schoolRecords={schoolRecords}
                  disciplines={disciplines}
                  changeSchoolRecordsList={changeSchoolRecordsList}
                />
              </div>
            )}
          </div>
        )}
      </>
    </Navbar>
  );
}

export default SchoolRecords;
