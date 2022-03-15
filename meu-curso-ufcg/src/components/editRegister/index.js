import React, { useState, useEffect } from 'react';

import { editUserInfo } from '../../api';
import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';

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

function RegisterEdit({ user }) {
  const [email, setEmail] = useState('');
  const [labelEmailStyle, setLabelEmailStyle] = useState({});
  const [password, setPassword] = useState('');
  const [labelPasswordStyle, setLabelPasswordStyle] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function updateState() {
      setEmail(user);
    }
    updateState();
  }, [user]);

  const validateEmail = () => {
    const validation = email === '' || email === null;
    setLabelEmailStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validatePassword = () => {
    const validation = password === '' || password === null;
    setLabelPasswordStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateInfo = () => validateEmail() || validatePassword();

  const edit = () => {
    if (validateInfo()) {
      setLoading(true);
      const body = {
        newUser: {
          email,
          password,
        },
      };
      editUserInfo(body, setLoading);
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
          <Input name="EMAIL" value={email} onChange={setEmail} styles={labelEmailStyle} />
          <Input
            disabled="true"
            name="SENHA"
            value={password}
            onChange={setPassword}
            styles={labelPasswordStyle}
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

export default RegisterEdit;
