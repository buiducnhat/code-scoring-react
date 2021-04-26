import axios from 'axios';

import { SERVER_URL, ORDER_TYPE } from 'src/app/constants';

const exerciseServerEndpoint = `${SERVER_URL}/exercises`;

export const exerciseApi = {
  listExercise: ({ accessToken, page, pageSize, order, title }) => {
    page = page || 1;
    pageSize = pageSize || 10;
    order = order || ORDER_TYPE.timeDESC;
    title = title || '';

    return axios({
      method: 'get',
      url: `${exerciseServerEndpoint}/list/?page=${page}&pageSize=${pageSize}&order=${order}&title=${title}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getExerciseDetail: ({ accessToken, exerciseId }) => {
    return axios({
      method: 'get',
      url: `${exerciseServerEndpoint}/detail/${exerciseId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createExercise: ({ accessToken, title, content, point, testCases, languages }) => {
    return axios({
      method: 'post',
      url: `${exerciseServerEndpoint}/create`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        title,
        content,
        point,
        testCases,
        languages,
      },
    });
  },

  updateExercise: ({
    accessToken,
    exerciseId,
    title,
    content,
    point,
    testCases,
    languages,
    status,
  }) => {
    return axios({
      method: 'put',
      url: `${exerciseServerEndpoint}/update/${exerciseId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        title,
        content,
        point,
        testCases,
        languages,
        status,
      },
    });
  },

  updateExerciseStatus: ({ accessToken, exerciseId, status }) => {
    return axios({
      method: 'post',
      url: `${exerciseServerEndpoint}/status/${exerciseId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        status,
      },
    });
  },

  runExercise: ({ accessToken, exerciseId, scriptCode, languageId, codeFile }) => {
    const formData = new FormData();
    formData.append('languageId', languageId);
    formData.append('scriptCode', scriptCode);
    formData.append('code', codeFile);

    return axios({
      method: 'post',
      url: `${exerciseServerEndpoint}/run/${exerciseId}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });
  },

  submitExercise: ({ accessToken, exerciseId, scriptCode, languageId, codeFile }) => {
    const formData = new FormData();
    formData.append('languageId', languageId);
    formData.append('scriptCode', scriptCode);
    formData.append('code', codeFile);

    return axios({
      method: 'post',
      url: `${exerciseServerEndpoint}/submit/${exerciseId}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });
  },
};
