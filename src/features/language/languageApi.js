import axios from 'axios';

import { SERVER_URL } from 'src/app/constants';

const languageServerEndpoint = `${SERVER_URL}/languages`;

export const languageApi = {
  getAll: () => {
    return axios({
      method: 'get',
      url: `${languageServerEndpoint}`,
    });
  },
};
