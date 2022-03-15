import React, { useState } from 'react';

import Input from '../input';
import BaseButton from '../button';
import { login } from '../../api';

import './login.css';

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [labelEmailStyle, setLabelEmailStyle] = useState({});
  const [labelPasswordStyle, setLabelPasswordStyle] = useState({});

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

  const validateInfo = () => validateEmail() && validatePassword();

  const logout = async () => {
    await localStorage.removeItem('meu_curso_token');
  };

  const auth = () => {
    if (validateInfo()) {
      const body = {
        email,
        password,
      };
      login(body);
    }
  };

  // const passwordRecovery = () => {
  //   window.location.replace('/passwordRecovery');
  // };

  return (
    <>
      <Input name="EMAIL" value={email} onChange={setEmail} styles={labelEmailStyle} />
      <Input
        type="password"
        name="SENHA"
        value={password}
        onChange={setPassword}
        styles={labelPasswordStyle}
      />
      <BaseButton onClick={auth} styles={{ margin: '30px 0px', width: '100%', fontWeight: 'bold' }}>
        ENTRAR
      </BaseButton>
      <a onClick={logout} className="login-forget-password">
        Esqueceu a senha?
      </a>
    </>
  );
}

export default Login;
