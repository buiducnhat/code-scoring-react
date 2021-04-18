import axios from 'axios';

import { SERVER_URL } from 'src/app/constants';

const imageServerEndpoint = `${SERVER_URL}/images`;

export const imgurApi = {
  uploadImage({ imageFile }) {
    const accessToken = localStorage.getItem('access-token');
    const formData = new FormData();
    formData.append('image', imageFile);
    return axios({
      method: 'post',
      url: `${imageServerEndpoint}/upload/imgur`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });
  },
};
