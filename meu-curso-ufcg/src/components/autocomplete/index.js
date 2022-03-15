/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Input from '../input';
import { editProfileInfo } from '../../api';

import './autocomplete.css';

function Autocomplete(props) {
  const {
    data,
    setSelectedCourse,
    suggestion = false,
    option = 'Todas',
    changeCourse = false,
    setLoading,
  } = props;

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const history = useHistory();

  const styleText = suggestion ? 'suggestions' : 'suggestions suggestions-type-2';

  const onChange = (input) => {
    if (!suggestion) {
      const filteredSuggestionsChange = input
        ? data.filter((discipline) => {
            const disciplineType = option === 'Todas' ? true : discipline.type === option;
            return (
              discipline.name.toLowerCase().indexOf(input.toLowerCase()) > -1 && disciplineType
            );
          })
        : data.filter((discipline) => {
            const disciplineType = option === 'Todas' ? true : discipline.type === option;
            return disciplineType;
          });
      setSelectedCourse(filteredSuggestionsChange);
      setFilteredSuggestions(filteredSuggestionsChange);
    } else {
      const filteredSuggestionsChange =
        input &&
        data.filter((course) => {
          return course.name.toLowerCase().indexOf(input.toLowerCase()) > -1;
        });
      setFilteredSuggestions(filteredSuggestionsChange);
    }
    setUserInput(input);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setUserInput('');
    const courseId = e.currentTarget.value;
    const course = data.find((element) => element.id === courseId);
    if (course) {
      setSelectedCourse(course);
    }
  };

  const courseChange = async (e) => {
    const courseId = e.currentTarget.value;
    setLoading(true);
    const body = {
      newProfile: {
        currentCourseId: courseId,
      },
    };
    await editProfileInfo(body, setLoading);
    history.push('/profile');
  };

  const suggestionsListComponent =
    filteredSuggestions.length > 0 ? (
      <ul className={styleText}>
        {filteredSuggestions.map((suggestionFilter) => (
          <li
            value={suggestionFilter.id}
            onClick={!changeCourse ? onClick : courseChange}
            key={suggestionFilter.id}
          >
            {suggestionFilter.name}
          </li>
        ))}
      </ul>
    ) : (
      []
    );

  return (
    <>
      <Input value={userInput} onChange={onChange} onClick={onClick} />
      {suggestion && <div className="suggestions-list">{suggestionsListComponent}</div>}
    </>
  );
}

export default Autocomplete;
