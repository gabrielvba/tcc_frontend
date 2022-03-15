import React, { useState } from 'react';

import { register } from '../../api';
import Input from '../input';
import Loading from '../loading';
import BaseButton from '../button';

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

function Register({ toLogin }) {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [labelNameStyle, setLabelNameStyle] = useState({});
  const [labelLastnameStyle, setLabelLastnameStyle] = useState({});
  const [labelEmailStyle, setLabelEmailStyle] = useState({});
  const [labelPasswordStyle, setLabelPasswordStyle] = useState({});

  const validateName = () => {
    const validation = name === '' || name === null;

    setLabelNameStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateLastname = () => {
    const validation = lastname === '' || lastname === null;

    setLabelLastnameStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

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

  const validateInfo = () => {
    const valid = validateName() && validateLastname() && validateEmail() && validatePassword();
    return valid;
  };

  const registerUser = () => {
    if (validateInfo()) {
      const newUser = {
        user: {
          name,
          lastname,
          email,
          password,
        },
      };
      register(newUser, setLoading, setPassword, toLogin);
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
            value={lastname}
            onChange={setLastName}
            styles={labelLastnameStyle}
          />
          <Input name="EMAIL" value={email} onChange={setEmail} styles={labelEmailStyle} />
          <Input
            name="SENHA"
            type="password"
            value={password}
            onChange={setPassword}
            styles={labelPasswordStyle}
          />
          <BaseButton
            onClick={registerUser}
            styles={{ margin: '30px 0px', width: '100%', fontWeight: 'bold' }}
          >
            CADASTRAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default Register;
