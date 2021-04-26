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

export const ORDER_TYPE_PARSED = {
  timeASC: 'Cũ nhất',
  timeDESC: 'Mới nhất',
  nameASC: 'A-Z ▲',
  nameDESC: 'Z-A ▼',
  pointASC: 'Điểm ▲',
  pointDESC: 'Điểm ▼',
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

export const RUN_SUBMIT_EXERCISE_TYPE = {
  run: 1,
  submit: 2,
};

export const MUI_COLOR = {
  primary: '#3f51b5',
  secondary: '#f50057',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  success: '#4caf50',
  gray: '#9e9e9e',
};

export const EDIT_EXERCISE_ACTION = {
  create: 1,
  update: 2,
};
