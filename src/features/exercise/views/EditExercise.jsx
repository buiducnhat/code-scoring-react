import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  TextField,
  Chip,
  Card,
  Box,
  Checkbox,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  colors,
} from '@material-ui/core';
import { ExpandMore as ExpandIcon } from '@material-ui/icons';
import { Formik } from 'formik';
import * as yup from 'yup';

import { EDIT_EXERCISE_ACTION } from 'src/app/constants';
import { setToast } from 'src/features/ui/uiSlice';
import {
  fetchCreateExercise,
  fetchExerciseDetail,
  fetchUpdateExercise,
  resetCurrentExercise,
} from 'src/features/exercise/exerciseSlice';
import { fetchListLanguage } from 'src/features/language/languageSlice';
import Toast from 'src/components/Toast';
import Editor from 'src/features/exercise/components/Editor';
import LoadingScreen from 'src/components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    listStyle: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: '100%',
  },
  languagesInput: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  margin1: {
    margin: theme.spacing(1),
  },
  testCase: {
    width: '100%',
  },
  ioArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  ioDataArea: {
    backgroundColor: '#ecf0f1',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
  },
}));

const EditExercise = (props) => {
  const { exerciseId } = props.match.params;
  const { action } = props.location.state || EDIT_EXERCISE_ACTION.create;

  const dispatch = useDispatch();

  const classes = useStyles();

  // global state
  const languages_gs = useSelector((state) => state.languageSlice.languages);
  const currentExercise_gs = useSelector((state) => state.exerciseSlice.currentExercise);
  const isFetchingExerciseDetail_gs = useSelector(
    (state) => state.exerciseSlice.isPendingFetchExerciseDetail
  );
  const isCreatingExercise_gs = useSelector(
    (state) => state.exerciseSlice.isPendingFetchCreateExercise
  );
  const isUpdatingExercise_gs = useSelector(
    (state) => state.exerciseSlice.isPendingFetchUpdateExercise
  );

  // local state
  const [content_ls, setContent_ls] = useState('');
  const [languages_ls, setLanguages_ls] = useState([]);
  const [languagesId_ls, setLanguagesId_ls] = useState([]);
  const [testCases_ls, setTestCases_ls] = useState(currentExercise_gs.testCases || []);
  const [currentTestCase_ls, setCurrentTestCase_ls] = useState({});
  const [openTestCaseDialog_ls, setOpenTestCaseDialog_ls] = useState(false);

  const handleDeleteLanguages = (languageToDelete) => () => {
    setLanguages_ls((languages) =>
      languages.filter((language) => language.language_id !== languageToDelete.language_id)
    );
    setLanguagesId_ls((languagesId) =>
      languagesId.filter((languageId) => languageId !== languageToDelete.language_id)
    );
  };

  const handleAddTestCase = () => {
    setTestCases_ls([...testCases_ls, currentTestCase_ls]);
    setOpenTestCaseDialog_ls(false);
  };

  const handleSubmit = (data) => {
    const exerciseData = Object.assign({}, data, {
      point: Number.parseInt(data.point),
      content: content_ls,
      languages: languagesId_ls,
      testCases: testCases_ls,
    });
    if (action === EDIT_EXERCISE_ACTION.create && exerciseData) {
      dispatch(fetchCreateExercise({ ...exerciseData }));
    } else if (action === EDIT_EXERCISE_ACTION.update && exerciseData) {
      dispatch(fetchUpdateExercise({ ...exerciseData, exerciseId }));
    }
    // return;
  };

  useEffect(() => {
    dispatch(fetchListLanguage());
    action === EDIT_EXERCISE_ACTION.update &&
      exerciseId &&
      dispatch(fetchExerciseDetail({ exerciseId }));
  }, [dispatch, action, exerciseId]);

  useEffect(() => {
    if (action === EDIT_EXERCISE_ACTION.update) {
      setLanguages_ls(
        languages_gs.filter((language) =>
          currentExercise_gs.languages?.includes(language.language_id)
        )
      );
      console.log(currentExercise_gs.languages);
      setLanguagesId_ls(
        currentExercise_gs.languages || languages_gs.map((language) => language.language_id)
      );
    } else {
      setLanguages_ls(languages_gs);
      setLanguagesId_ls(languages_gs.map((language) => language.language_id));
    }
  }, [currentExercise_gs, action, languages_gs]);

  // useEffect(() => {
  //   setTestCases_ls(currentExercise_gs.testCases || []);
  // }, [currentExercise_gs]);

  useEffect(() => {
    if (action === EDIT_EXERCISE_ACTION.create) {
      dispatch(resetCurrentExercise());
    }
  }, [dispatch, action]);

  // useEffect(() => {
  //   dispatch(
  //     setToast({
  //       open: !isCreatingExercise_gs,
  //       content: 'Chạy code thành công, xem kết quả ở phần Test case!',
  //       type: 'success',
  //       position: {
  //         vertical: 'top',
  //         horizontal: 'right',
  //       },
  //     })
  //   );
  // }, []);

  return (
    <Container>
      {isFetchingExerciseDetail_gs ? (
        <LoadingScreen />
      ) : (
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.editorWrap}>
            <Formik
              initialValues={
                action === EDIT_EXERCISE_ACTION.update
                  ? { ...currentExercise_gs }
                  : {
                      title: '',
                      point: 0,
                      content: '',
                      testCases: [],
                      languages: languagesId_ls || [],
                    }
              }
              enableReinitialize
              onSubmit={handleSubmit}
              validationSchema={yup.object().shape({
                title: yup
                  .string()
                  .max(255, 'Tiêu đề không quá 255 ký tự')
                  .required('Tiêu đề không được để trống'),
                point: yup
                  .number()
                  .positive('Điểm số tối thiểu bằng 0')
                  .integer('Điểm số là số nguyên')
                  .required('Điểm không được để trống'),
              })}
            >
              {(formikProp) => {
                const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formikProp;
                return (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.title && errors.title)}
                          fullWidth
                          helperText={touched.title && errors.title}
                          label="Tiêu đề"
                          margin="normal"
                          name="title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.point && errors.point)}
                          fullWidth
                          helperText={touched.point && errors.point}
                          label="Điểm số"
                          margin="normal"
                          name="point"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.point}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Card className={classes.languagesInput} variant="outlined">
                          {languages_ls.length ? (
                            languages_ls.map((language, index) => (
                              <li key={language.language_id}>
                                <Chip
                                  color="primary"
                                  className={classes.chip}
                                  label={language.name}
                                  onDelete={handleDeleteLanguages(language)}
                                />
                              </li>
                            ))
                          ) : (
                            <Checkbox
                              color="primary"
                              onChange={() => {
                                setLanguages_ls(languages_gs);
                                setLanguagesId_ls(
                                  languages_gs.map((language) => language.language_id)
                                );
                              }}
                            />
                          )}
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Dialog
                          open={openTestCaseDialog_ls}
                          onClose={() => setOpenTestCaseDialog_ls(false)}
                        >
                          <DialogTitle>Thêm test case</DialogTitle>
                          <DialogContent>
                            <TextField
                              label="Input"
                              margin="normal"
                              fullWidth
                              value={currentTestCase_ls.input}
                              onChange={(event) =>
                                setCurrentTestCase_ls({
                                  ...currentTestCase_ls,
                                  input: event.target.value,
                                })
                              }
                            />
                            <TextField
                              label="Output"
                              margin="normal"
                              fullWidth
                              value={currentTestCase_ls.output}
                              onChange={(event) =>
                                setCurrentTestCase_ls({
                                  ...currentTestCase_ls,
                                  output: event.target.value,
                                })
                              }
                            />
                            <TextField
                              label="Thời gian giới hạn"
                              margin="normal"
                              fullWidth
                              value={currentTestCase_ls.limitedTime}
                              onChange={(event) =>
                                setCurrentTestCase_ls({
                                  ...currentTestCase_ls,
                                  limitedTime: event.target.value,
                                })
                              }
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button color="primary" onClick={() => setOpenTestCaseDialog_ls(false)}>
                              Hủy
                            </Button>
                            <Button color="primary" onClick={handleAddTestCase}>
                              Thêm
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Button
                          size="large"
                          color="primary"
                          variant="outlined"
                          onClick={() => setOpenTestCaseDialog_ls(true)}
                        >
                          Thêm test case
                        </Button>
                      </Grid>

                      <Grid xs={12}>
                        <Box className={classes.margin1}>
                          <Accordion variant="outlined">
                            <AccordionSummary
                              expandIcon={<ExpandIcon />}
                            >{`Test case`}</AccordionSummary>
                            <AccordionDetails>
                              <Box className={classes.testCase}>
                                {testCases_ls.length > 0 &&
                                  testCases_ls.map((testCase, index) => (
                                    <Accordion key={index} variant="outlined">
                                      <AccordionSummary
                                        expandIcon={<ExpandIcon />}
                                        style={{ backgroundColor: colors.grey[100] }}
                                      >
                                        {`Test case ${index + 1}`}
                                      </AccordionSummary>
                                      <AccordionDetails
                                        style={{ backgroundColor: colors.grey[50] }}
                                      >
                                        <Box>
                                          <TextField
                                            label="Input"
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            inputProps={{
                                              readOnly: true,
                                            }}
                                            value={testCase.input}
                                          />
                                          <TextField
                                            label="Output"
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            inputProps={{
                                              readOnly: true,
                                            }}
                                            value={testCase.output}
                                          />
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  ))}
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Editor content={currentExercise_gs.content} setContent={setContent_ls} />
                      </Grid>

                      <Grid item xs={6}></Grid>

                      <Grid item container xs={6} direction="row" justify="flex-end">
                        <Button
                          variant="contained"
                          size="large"
                          style={{ marginRight: 20 }}
                          onClick={() => props.history.goBack()}
                        >
                          Hủy
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          disabled={isCreatingExercise_gs || isUpdatingExercise_gs}
                          type="submit"
                        >
                          {action === EDIT_EXERCISE_ACTION.update ? `Cập nhật` : `Tạo mới`}
                          {(isCreatingExercise_gs || isUpdatingExercise_gs) && (
                            <CircularProgress
                              size={24}
                              color="inherit"
                              style={{ marginLeft: 10 }}
                            />
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default EditExercise;
