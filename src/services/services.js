import { TOKEN, storage } from '~/storage';
import * as httpRequest from '~/utils/httpRequest';
const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTY1MTc0MjI1OSwiZXhwIjoxNjU0MzM0MjU5LCJuYmYiOjE2NTE3NDIyNTksImp0aSI6ImdremlxN05LcFJrdVJYSVoiLCJzdWIiOjUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.IF9kZeYa8zqAaTmUJFh640ylAb8Lmku2sb2OkPcQ0M0';

export const search = async (q, type = 'less') => {
  try {
    const res = await httpRequest.get('users/search', {
      params: {
        q,
        type,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const suggestAccs = async (page = 1, per_page = 5) => {
  try {
    const res = await httpRequest.get('users/suggested', {
      params: {
        page,
        per_page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const users = async (nickname) => {
  try {
    const res = await httpRequest.get(`users/@${nickname}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Authentication
export const getCurrentUser = async (token) => {
  try {
    const res = await httpRequest.get('auth/me', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
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

// Videos

export const videoList = async (type, page) => {
  try {
     let res = await httpRequest.get(
       'videos',
       {
         params: {
           type,
           page,
         },
       },
       {
         headers: {
           Authorization: 'Bearer ' + storage.get(TOKEN),
           'Content-Type': 'application/json',
         },
       },
    );
    return res.data
  } catch (error) {
    console.log(error)
  }
};

export const getVideo = async (uuid) => {
  try {
    let res = await httpRequest.get(`videos/${uuid}`, {
      headers: {
        Authorization: 'Bearer ' + storage.get(TOKEN),
        'Content-Type': 'application/json',
      },
    });
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// Like
export const likeVideo = async (id) => {
  try {
    let res = await httpRequest.post(
      `videos/${id}/like`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + storage.get(TOKEN),
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const unLikeVideo = async (id) => {
  try {
    let res = await httpRequest.post(
      `videos/${id}/unlike`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + storage.get(TOKEN),
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
