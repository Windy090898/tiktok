import { TOKEN, storage } from '~/storage';
import * as httpRequest from '~/utils/httpRequest';
const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTY1MTc0MjI1OSwiZXhwIjoxNjU0MzM0MjU5LCJuYmYiOjE2NTE3NDIyNTksImp0aSI6ImdremlxN05LcFJrdVJYSVoiLCJzdWIiOjUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.IF9kZeYa8zqAaTmUJFh640ylAb8Lmku2sb2OkPcQ0M0';

// Authentication
export const getCurrentUser = async () => {
  try {
    const res = await httpRequest.get('auth/me', {
      headers: {
        Authorization: 'Bearer ' + storage.get(TOKEN),
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCurrentUser = async (dataInput) => {
  try {
    const res = await httpRequest.post(`auth/me?_method=PATCH`, dataInput, {
      headers: {
        Authorization: 'Bearer ' + storage.get(TOKEN),
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (inputData) => {
  try {
    const res = await httpRequest.post(
      'auth/register',
      JSON.stringify(inputData),
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      },
    );
    return res;
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};

export const signin = async (inputData) => {
  try {
    const res = await httpRequest.post(
      'auth/login',
      JSON.stringify(inputData),
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      },
    );
    return res;
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};

export const signout = async (token) => {
  try {
    await httpRequest.post(
      'auth/logout',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};
