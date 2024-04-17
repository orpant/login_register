import instance from './index';
export const login = (data) => {
  return instance.post('/users/login', data);
};

export const register = (data) => {

  return instance.post('/users/register', data);
};

export const getInfo = () => {
  return instance.get('/users/info');
};
