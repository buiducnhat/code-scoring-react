export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ROLE_ID = {
  admin: 1,
  user: 2,
};

export const ORDER_TYPE = {
  timeASC: 1,
  timeDESC: 2,
  nameASC: 3,
  nameDESC: 4,
  pointASC: 5,
  pointDESC: 6,
};

export const PERMISSION = {
  createExercise: 'create exercise',
  updateExercise: 'update exercise',
  listExercises: 'list exercises',
  submitExercise: 'submit exercise',
  updateUser: 'update user',
};

export const USER_STATUS = {
  active: 1,
  freezed: 2,
};

export const EXERCISE_STATUS = {
  public: 1,
  hiden: 2,
  deleted: 3,
};

export const LANGUAGE_CODE = {
  c: 'C',
  cpp: 'C++',
  java: 'Java',
  python: 'Python',
  node: 'NodeJs',
};
