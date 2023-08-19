import * as httpRequest from '~/utils/httpRequest';
import { TOKEN, storage } from '~/storage';

export const getCommentList = async (id) => {
  try {
    let res = await httpRequest.get(`videos/${id}/comments`, {
      headers: {
        Authorization: 'Bearer ' + storage.get(TOKEN),
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (uuid, dataInput) => {
  try {
    let res = await httpRequest.post(
      `videos/${uuid}/comments`,
      JSON.stringify(dataInput),
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

export const likeComment = async (id) => {
  try {
    let res = await httpRequest.post(
      `comments/${id}/like`,
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

export const unLikeComment = async (id) => {
  try {
    let res = await httpRequest.post(
      `comments/${id}/unlike`,
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