import * as httpRequest from '~/utils/httpRequest';

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



