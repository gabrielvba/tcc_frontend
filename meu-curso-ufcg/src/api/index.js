import { toast } from 'react-toastify';
import api from './api';

export async function getUserInfo() {
  try {
    const url = '/user/me';

    const result = await api.get(url);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    toast.error(msg);
  }
  return null;
}

export async function getMyCurrentCourse() {
  try {
    const url = '/course/me';

    const result = await api.get(url);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    toast.error(msg);
  }
  return null;
}

export async function getMySchoolRecords() {
  try {
    const url = '/user/schoolRecords';

    const result = await api.get(url);
    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    toast.error(msg);
  }
  return null;
}

export async function register(user, setLoading, setPassword, toLogin) {
  console.log('chamou');
  setLoading(true);
  api
    .post('/user', user)
    .then((response) => {
      if (response) {
        setLoading(false);
        setPassword('');

        toast('Cadastro realizado com sucesso!');
        toLogin();
      }
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';

      setLoading(false);
      toast.error(msg);
    });
}

export async function login(body) {
  api
    .post('/auth/login', body)
    .then(async (response) => {
      const { token, user } = response.data;
      console.log(token);
      await localStorage.setItem('meu_curso_token', token);
      toast(`Bem-vindo de volta ${user.name}!`);
      window.location.replace('/profile');
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';
      toast.error(msg);
    });
}
