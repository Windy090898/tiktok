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

export const createNewVideo = async (dataInput, handleProgress) => {
  try {
    let res = await httpRequest.post('/videos', dataInput, {
      headers: {
        Authorization: 'Bearer ' + storage.get(TOKEN),
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: handleProgress,
    });
    return res.data;
  } catch (error) {
    console.log(error.request.response);
  }
};

export const deleteVideo = async (id) => {
  try {
    let res = await httpRequest.remove(`/videos/${id}`, {
      headers: {
        Authorization: 'Bearer ' + storage.get(TOKEN),
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error.request.response);
  }
};

export const updateVideo = async (id, dataInput) => {
  try {
    await httpRequest.post(`videos/${id}?_method=PATCH`, dataInput, {
      headers: {
        Authorization: 'Bearer ' + storage.get(TOKEN),
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.log(error.request.response);
  }
};

export const getUserVideo = async (id) => {
  try {
    let res = await httpRequest.get(`users/${id}/videos`, {
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

export const getLikedVideos = async (id) => {
  try {
    let res = await httpRequest.get(`users/${id}/liked-videos`, {
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
