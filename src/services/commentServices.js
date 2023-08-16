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