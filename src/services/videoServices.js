import * as httpRequest from '~/utils/httpRequest';
import { TOKEN, storage } from '~/storage';

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
    return res;
  } catch (error) {
    console.log(error);
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
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

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
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

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
