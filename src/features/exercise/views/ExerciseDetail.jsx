import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Input,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  LinearProgress,
  CircularProgress,
  TextField,
  colors,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  CloudUpload as UploadIcon,
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
  Close as WrongIcon,
  Favorite as HeartIcon,
  Person as PersonIcon,
} from '@material-ui/icons';

import { exerciseApi } from 'src/features/exercise/exerciseApi';
import { listRoute } from 'src/app/listRoute';
import useCheckLogIn from 'src/hooks/useCheckLogIn';
import { MUI_COLOR, EDIT_EXERCISE_ACTION } from 'src/app/constants';
import {
  fetchExerciseDetail,
  fetchSubmitExercise,
  fetchRunExercise,
  resetRunAndSubmit,
} from 'src/features/exercise/exerciseSlice';
import { fetchListLanguage } from 'src/features/language/languageSlice';
import { setToast } from 'src/features/ui/uiSlice';
import LoadingScreen from 'src/components/LoadingScreen';
import Toast from 'src/components/Toast';
import DialogToLogin from 'src/components/DialogToLogin';

const useStyles = makeStyles((theme) => ({
  root: {
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  commonPaperWrap: {
    padding: theme.spacing(4),
  },
  contentWrap: {
    marginTop: theme.spacing(8),
  },
  testCasesArea: {
    padding: theme.spacing(2),
  },
  testCase: {
    width: '100%',
  },
  submitArea: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submitAreaButton: {
    margin: theme.spacing(1),
  },
  uploadFileInput: {
    display: 'none',
    minWidth: 120,
  },
  extraInfo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(2),
  },
}));

const ExerciseDetail = (props) => {
  const dispatch = useDispatch();
  const navigation = useHistory();

  const classes = useStyles();

  // global state
  const [isLoggedIn_gs, userData_gs] = useCheckLogIn();
  const currentExercise_gs = useSelector((state) => state.exerciseSlice.currentExercise);
  const language_gs = useSelector((state) => state.languageSlice.languages);
  const runResult_gs = useSelector((state) => state.exerciseSlice.runResult);
  const isRunningExercise_gs = useSelector(
    (state) => state.exerciseSlice.isPendingFetchRunExercise
  );
  const submittedResult_gs = useSelector((state) => state.exerciseSlice.submittedResult);
  const isSubmittingExercise_gs = useSelector(
    (state) => state.exerciseSlice.isPendingFetchSubmitExercise
  );

  // local state
  const { exerciseId } = props.match.params;
  const [uploadedFile_ls, setUploadedFile_ls] = useState(null);
  const [languageId_ls, setLanguageId_ls] = useState(1);
  const [openSelect_ls, setOpenSelect_ls] = useState(false);
  const [openLoginDialog_ls, setOpenLoginDialog_ls] = useState(false);
  const isAuthor = userData_gs?.user_id === currentExercise_gs.created_by || false;
  const [currentResult_ls, setCurrentResult_ls] = useState(null);

  const handleUploadButton = () => {
    !isLoggedIn_gs && setOpenLoginDialog_ls(true);
  };

  const handleUpload = (event) => {
    setUploadedFile_ls(event.target.files[0]);
  };

  const handleRunExercise = () => {
    dispatch(
      fetchRunExercise({
        exerciseId,
        scriptCode: '',
        languageId: languageId_ls,
        codeFile: uploadedFile_ls,
      })
    );
  };

  const handleSubmitExercise = () => {
    dispatch(
      fetchSubmitExercise({
        exerciseId,
        scriptCode: '',
        languageId: languageId_ls,
        codeFile: uploadedFile_ls,
      })
    );
  };

  // reset run and submit in testcases
  useEffect(() => {
    dispatch(resetRunAndSubmit());
  }, [dispatch]);

  // fetch exercise detail and language
  useEffect(() => {
    dispatch(fetchExerciseDetail({ exerciseId }));
    dispatch(fetchListLanguage());
  }, [dispatch, exerciseId]);

  // use effect for toast when run code
  useEffect(() => {
    dispatch(
      setToast({
        open: !isRunningExercise_gs && runResult_gs.length,
        content: 'Chạy code thành công, xem kết quả ở phần Test case!',
        type: 'success',
        position: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    );
  }, [dispatch, isRunningExercise_gs, runResult_gs.length]);

  // use effect for toast when submit
  useEffect(() => {
    dispatch(
      setToast({
        open: !isSubmittingExercise_gs && submittedResult_gs.message,
        content: 'Nộp bài thành công!',
        type: 'success',
        position: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    );
  }, [dispatch, isSubmittingExercise_gs, submittedResult_gs]);

  // set highlight for code in content
  useEffect(() => {
    const script = document.createElement('script');
    const script2 = document.createElement('script');
    script.async = true;
    script2.async = true;
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js`;
    script2.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js`;
    if (currentExercise_gs.content) {
      document.body.appendChild(script);
      document.body.appendChild(script2);
      return () => {
        document.body.removeChild(script);
        document.body.removeChild(script2);
      };
    }
  }, [currentExercise_gs.content]);

  // fetch result of exercise
  useEffect(() => {
    exerciseApi
      .getResultOfExerciseByUser({
        accessToken: localStorage.getItem('access-token'),
        exerciseId,
      })
      .then((response) => setCurrentResult_ls(response.data));
    // .catch(error=);
  }, [exerciseId]);

  return (
    <Container className={classes.root}>
      {!currentExercise_gs ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={2}>
          <DialogToLogin
            needOpen={openLoginDialog_ls}
            setNeedOpen={setOpenLoginDialog_ls}
            lastUrl={`${listRoute.exerciseDetailEndpoint}/${exerciseId}`}
          />
          <Grid container item spacing={2} md={9} className={classes.contentWrap}>
            <Grid item xs={12}>
              <Paper className={classes.commonPaperWrap} elevation={5}>
                <Typography variant="h4" color="primary" style={{ marginBottom: '2rem' }}>
                  {currentExercise_gs.title}
                </Typography>

                <div dangerouslySetInnerHTML={{ __html: currentExercise_gs.content }} />

                {isAuthor && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      color="primary"
                      size="large"
                      onClick={() =>
                        navigation.push(`${listRoute.updateExerciseEndpoint}/${exerciseId}`, {
                          action: EDIT_EXERCISE_ACTION.update,
                        })
                      }
                    >
                      Sửa bài
                    </Button>
                  </div>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Accordion className={classes.testCasesArea} elevation={5}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {`Test case thử`}
                    {isRunningExercise_gs && <LinearProgress size="small" />}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className={classes.testCase}>
                    {currentExercise_gs.testCases?.length &&
                      currentExercise_gs.testCases.map((testCase, index) => (
                        <Accordion key={index}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {`Test case ${index + 1}`}
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box width="100%">
                              <Box>
                                <TextField
                                  label="Input"
                                  fullWidth
                                  multiline
                                  variant="outlined"
                                  margin="normal"
                                  inputProps={{ readOnly: true }}
                                  value={testCase.input}
                                />
                                <TextField
                                  label="Output"
                                  fullWidth
                                  multiline
                                  variant="outlined"
                                  margin="normal"
                                  inputProps={{ readOnly: true }}
                                  value={testCase.output}
                                />
                                <TextField
                                  label="Giới hạn thời gian (mili giây)"
                                  fullWidth
                                  variant="outlined"
                                  margin="normal"
                                  inputProps={{ readOnly: true }}
                                  value={testCase.limited_time || ''}
                                />
                              </Box>
                              {runResult_gs?.length > 0 && (
                                <Box>
                                  <TextField
                                    label="Kết quả chạy"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    variant="outlined"
                                    inputProps={{ readOnly: true }}
                                    value={
                                      runResult_gs[index].userOutput ||
                                      runResult_gs[index].error ||
                                      null
                                    }
                                  />
                                  {runResult_gs[index].result ? (
                                    <CheckIcon style={{ color: 'green' }} />
                                  ) : (
                                    <WrongIcon color="error" />
                                  )}
                                </Box>
                              )}
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.commonPaperWrap} elevation={5}>
                <Typography variant="h6">{'Khu vực nộp bài'}</Typography>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Ngôn ngữ</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={openSelect_ls}
                      onClose={() => setOpenSelect_ls(false)}
                      onOpen={() => setOpenSelect_ls(true)}
                      value={languageId_ls}
                      onChange={(event) => setLanguageId_ls(event.target.value)}
                    >
                      {language_gs.map((language, index) => (
                        <MenuItem key={index} value={language.language_id}>
                          {language.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <Button
                  className={[classes.inputWrap, classes.submitAreaButton]}
                  variant="contained"
                  color="primary"
                  component="label"
                  onClick={handleUploadButton}
                >
                  <Input
                    className={classes.uploadFileInput}
                    disabled={!isLoggedIn_gs}
                    id="contained-button-file"
                    type="file"
                    onChange={handleUpload}
                    draggable
                  />
                  <UploadIcon />
                </Button>
                {isLoggedIn_gs && uploadedFile_ls && (
                  <React.Fragment>
                    <Input value={uploadedFile_ls.name} disabled />
                    <Button
                      className={classes.submitAreaButton}
                      component="button"
                      variant="outlined"
                      color="primary"
                      onClick={handleRunExercise}
                    >
                      {'Chạy code'}
                    </Button>
                    <Button
                      className={classes.submitAreaButton}
                      component="button"
                      variant="outlined"
                      color="primary"
                      onClick={handleSubmitExercise}
                    >
                      {'Nộp bài'}
                      {isSubmittingExercise_gs && (
                        <CircularProgress style={{ marginLeft: '1rem' }} size={20} />
                      )}
                    </Button>
                    <Toast />
                  </React.Fragment>
                )}
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={2} item md={3} className={classes.contentWrap}>
            <Grid item xs={12}>
              <Paper className={[classes.commonPaperWrap, classes.extraInfo]} elevation={5}>
                <Avatar
                  className={classes.avatar}
                  src={`https://i.pravatar.cc/150?u=${currentExercise_gs.author}`}
                />
                <Chip
                  style={{ marginBottom: '1rem' }}
                  color="primary"
                  icon={<PersonIcon />}
                  label={`Tác giả: ${currentExercise_gs.author}`}
                />
                <Chip
                  style={{ marginBottom: '1rem' }}
                  color="secondary"
                  icon={<HeartIcon />}
                  label={`Điểm tối đa: ${currentExercise_gs.point}`}
                />
                {submittedResult_gs.message && (
                  <Chip
                    style={{
                      backgroundColor:
                        parseInt(submittedResult_gs.totalScore) ===
                        parseInt(currentExercise_gs.point)
                          ? MUI_COLOR.success
                          : MUI_COLOR.warning,
                      color: '#fff',
                    }}
                    color="primary"
                    icon={<CheckCircleIcon color="action" />}
                    label={`Kết quả: ${parseInt(submittedResult_gs.totalScore)}/${
                      currentExercise_gs.point
                    }`}
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.commonPaperWrap} elevation={5}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Kết quả đã nộp</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {currentResult_ls &&
                        currentResult_ls.testCase.map((testCase, index) => (
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography>{`Test case ${index + 1}:`}</Typography>
                            {testCase.check ? (
                              <CheckIcon style={{ color: 'green' }} />
                            ) : (
                              <WrongIcon color="error" />
                            )}
                          </Box>
                        ))}
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        marginTop={2}
                      >
                        <Typography style={{ color: colors.deepPurple[500] }}>{`Điểm: ${
                          currentResult_ls && currentResult_ls.totalScore
                        }/${currentExercise_gs.point}`}</Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ExerciseDetail;
