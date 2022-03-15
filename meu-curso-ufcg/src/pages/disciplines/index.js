/* eslint-disable no-plusplus */

import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import './disciplines.css';
import Navbar from '../../components/navbar/Navbar';
import SearchDiscipline from '../../components/searchDiscipline';

import { getMyCurrentCourse } from '../../api';

function Disciplines() {
  const [disciplines, setDisciplines] = useState(null);

  const { data } = useQuery('logged user CurrentCourse', () => getMyCurrentCourse(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    const info = data?.data;
    setDisciplines(info?.disciplines ?? null);
  }, [data]);

  return (
    <Navbar>
      <SearchDiscipline disciplines={disciplines} />
    </Navbar>
  );
}

export default Disciplines;
