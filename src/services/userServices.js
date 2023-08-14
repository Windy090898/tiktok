import { TOKEN, storage } from '~/storage';
import * as httpRequest from '~/utils/httpRequest';

export const suggestAccs = async (page = 1, per_page = 5, except='') => {
  try {
    const res = await httpRequest.get(
      'users/suggested',
      {
        params: {
          page,
          per_page,
          except,
        },
        headers: {
          Authorization: 'Bearer ' + storage.get(TOKEN),
          'Content-Type': 'application/json',
        },
      },
      // {
      //   headers: {
      //     Authorization: 'Bearer ' + storage.get(TOKEN),
      //     'Content-Type': 'application/json',
      //   },
      // },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response.data.message,
    };
  }
};

export const totalPageSuggestAccs = async () => {
  try {
    const res = await httpRequest.get(
      'users/suggested',
      {
        headers: {
          Authorization: 'Bearer ' + storage.get(TOKEN),
          'Content-Type': 'application/json',
        },
      },
    );
    return res.meta.pagination.total_pages;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (nickname) => {
  try {
    const res = await httpRequest.get(`users/@${nickname}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};




