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

export function getCourseDetailsById(id, setCourseData) {
  const url = `/course/${id}`;
  api
    .get(url)
    .then((response) => {
      if (response) {
        setCourseData(response);
      }
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';
      toast.error(msg);
    });
}

export async function getAllCourse() {
  try {
    const url = '/course';

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

export async function editProfileInfo(body, setIsLoading) {
  try {
    setIsLoading(true);

    const result = await api.put('/profile', body);
    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
  return null;
}

export async function editUserInfo(body, setIsLoading) {
  try {
    setIsLoading(true);

    const result = await api.put('/user', body);
    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
  return null;
}

export async function getDisciplineDetails(id, setDisciplineData, setIsLoading) {
  setIsLoading(true);
  api
    .get(`/discipline/${id}`)
    .then((response) => {
      const { data } = response;
      setDisciplineData(data);
      setIsLoading(false);
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';
      setIsLoading(false);
      toast.error(msg);
    });
}

export async function getCourseDetails(id, setCourseData) {
  try {
    const url = `/course/${id}`;
    const result = await api.get(url);
    setCourseData(result);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    toast.error(msg);
  }
  return null;
}

export async function getCourseFluxograma(id) {
  try {
    const url = `/course/${id}`;
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

export async function createNewCourse(body, setLoading) {
  let retorno = null;
  try {
    setLoading(true);
    await api
      .post('/course', body)
      .then((response) => {
        if (response) {
          setLoading(false);
          retorno = response;
          toast('Curso criado com sucesso!');
        }
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setLoading(false);
        toast.error(msg);
      });
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    setLoading(false);
    toast.error(msg);
  }
  return retorno;
}

export async function createSchoolRecords(body, setRefreshHistory, setLoading) {
  let retorno = null;
  try {
    setLoading(true);
    await api
      .post('/user/schoolRecords/', body)
      .then((response) => {
        if (response) {
          retorno = response;
          setRefreshHistory(response);
          toast('Histórico salvo com sucesso!');
          setLoading(false);
        }
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setLoading(false);
        toast.error(msg);
      });
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    setLoading(false);
    toast.error(msg);
  }
  return retorno;
}

export async function createNewDiscipline(body, setLoading) {
  let retorno = null;
  try {
    setLoading(true);
    await api
      .post('/discipline', body)
      .then((response) => {
        if (response) {
          setLoading(false);
          retorno = response;
          toast('Disciplina criada com sucesso!');
        }
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setLoading(false);
        toast.error(msg);
      });
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    setLoading(false);
    toast.error(msg);
  }
  return retorno;
}

export async function updateDisciplineByID(id, body, setLoading) {
  let retorno = null;
  try {
    setLoading(true);
    await api
      .put(`/discipline/${id}`, body)
      .then((response) => {
        if (response) {
          setLoading(false);
          retorno = response;
          toast('Disciplina atualizada com sucesso!');
        }
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setLoading(false);
        toast.error(msg);
      });
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    setLoading(false);
    toast.error(msg);
  }
  return retorno;
}

export async function deleteDisciplineByID(id, setLoading) {
  let retorno = null;
  try {
    setLoading(true);
    await api
      .delete(`/discipline/${id}`)
      .then((response) => {
        if (response) {
          setLoading(false);
          retorno = response;
          toast('Disciplina excluida com sucesso!');
        }
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setLoading(false);
        toast.error(msg);
      });
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    setLoading(false);
    toast.error(msg);
  }
  return retorno;
}

export async function deleteCourseByID(id, setLoading) {
  let retorno = null;
  try {
    setLoading(true);
    await api
      .delete(`/course/${id}`)
      .then((response) => {
        if (response) {
          setLoading(false);
          retorno = response;
          toast('Curso excluido com sucesso!');
        }
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setLoading(false);
        toast.error(msg);
      });
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    setLoading(false);
    toast.error(msg);
  }
  return retorno;
}

export async function updateCourseByID(id, body, setLoading) {
  let retorno = null;
  try {
    setLoading(true);
    await api
      .put(`/course/${id}`, body)
      .then((response) => {
        if (response) {
          setLoading(false);
          retorno = response;
          toast('Disciplina criada com sucesso!');
        }
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setLoading(false);
        toast.error(msg);
      });
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';
    setLoading(false);
    toast.error(msg);
  }
  return retorno;
}
