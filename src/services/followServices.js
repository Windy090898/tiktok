import { TOKEN, storage } from '~/storage';
import * as httpRequest from '~/utils/httpRequest'

export const follow = async (id) => {
    try {
        let res = await httpRequest.post(
          `users/${id}/follow`,
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
        return {
          error: error.response.data.message,
        };
    }
}

export const unFollow = async (id) => {
  try {
    let res = await httpRequest.post(
      `users/${id}/unfollow`,
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
    return {
      error: error.response.data.message,
    };
  }
};

export const getFollowList = async (page) => {
  try {
    let res = await httpRequest.get(`me/followings?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + storage.get(TOKEN),
        'Content-Type': 'application/json',
      },
    });
    return res;  
  } catch (error) {
    console.log(error)
    return {
      error: error.response.data.message,
    };
  }
}