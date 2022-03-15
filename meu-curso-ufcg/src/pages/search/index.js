/* eslint-disable no-plusplus */

import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Tooltip } from '@material-ui/core';

import './search.css';
import Navbar from '../../components/navbar/Navbar';
import Autocomplete from '../../components/autocomplete';
import CourseDetails from '../../components/courseDetails';
import IconClose from '../../components/icons/iconClose';
import Loading from '../../components/loading';

import { getAllCourse } from '../../api';

function Search(props) {
  const { change } = props;
  const [courses, setCourses] = useState([]);
  const [selectedCouser, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data } = useQuery('AllCourse', () => getAllCourse(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    const info = data?.data;
    setCourses(info ?? null);
  }, [data]);

  const handleClose = () => setSelectedCourse(null);

  return (
    <Navbar>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <div>
          {!selectedCouser ? (
            <div className="search-content">
              <span>Buscar curso</span>
              <Autocomplete
                suggestion
                loading
                setLoading={setLoading}
                data={courses}
                setSelectedCourse={setSelectedCourse}
                changeCourse={change}
              />
            </div>
          ) : (
            <>
              <div className="profile-edit-info-icon">
                <Tooltip title="fechar">
                  <button
                    onClick={() => handleClose()}
                    type="button"
                    className="profile-icon-button"
                  >
                    <IconClose size="2x" />
                  </button>
                </Tooltip>
              </div>
              <div className="search-courseDetails">
                <CourseDetails id={selectedCouser.id} data={selectedCouser} see />
              </div>
            </>
          )}
        </div>
      )}
    </Navbar>
  );
}

export default Search;
