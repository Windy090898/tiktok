import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, option = {}) => {
  const res = await httpRequest.get(path, option);
  return res.data;
};

export const post = async (path, data = {}, config) => {
  const res = await httpRequest.post(path , data, config);
  return res?.data;
};

export const remove = async (path, config) => {
  const res = await httpRequest.delete(path, config)
  return res?.data;
};

export const patch = async (path, data, config) => {
  const res = await httpRequest.patch(path, data, config);
  return res?.data;
}


export default httpRequest;
