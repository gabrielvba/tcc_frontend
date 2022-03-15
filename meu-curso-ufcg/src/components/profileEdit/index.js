/* eslint-disable react/jsx-boolean-value */

import React, { useEffect, useState } from 'react';
import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';
import { editProfileInfo } from '../../api';

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

function ProfileEdit({ profile }) {
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [labelNameStyle, setLabelNameStyle] = useState({});
  const [labelLastNameStyle, setlabelLastNameStyle] = useState({});
  const [loading, setLoading] = useState(false);

  const validateName = () => {
    const validation = name === '' || name === null;

    setLabelNameStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validatelastName = () => {
    const validation = lastName === '' || lastName === null;

    setlabelLastNameStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  useEffect(() => {
    function updateState() {
      setName(profile?.name);
      setlastName(profile?.lastName);
    }
    updateState();
  }, [profile]);

  const validateInfo = () => {
    const valid = validateName() && validatelastName();
    return valid;
  };

  const edit = () => {
    if (validateInfo()) {
      setLoading(true);
      const body = {
        newProfile: {
          name,
          lastName,
        },
      };
      editProfileInfo(body, setLoading);
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <>
          <Input name="NOME" value={name} onChange={setName} styles={labelNameStyle} />
          <Input
            name="SOBRENOME"
            value={lastName}
            onChange={setlastName}
            styles={labelLastNameStyle}
          />
          <BaseButton
            onClick={edit}
            styles={{ margin: '30px 0px', width: '100%', fontWeight: 'bold' }}
          >
            SALVAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default ProfileEdit;
