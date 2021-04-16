import axios from 'axios';
import { SERVER_URL } from '../../app/constants';

const authenServerEndpoint = `${SERVER_URL}/auth`;

export const authenApi = {
  loginApi: ({ email, password }) => {
    return axios({
      method: 'post',
      url: `${authenServerEndpoint}/login`,
      data: {
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  registerApi: ({ email, name, password }) => {
    return axios({
      method: 'post',
      url: `${authenServerEndpoint}/register`,
      data: {
        email,
        name,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  getUserDataApi: ({ accessToken }) => {
    return axios({
      method: 'get',
      url: `${authenServerEndpoint}/info`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
