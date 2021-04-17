import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
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

import useCheckLogIn from 'src/hooks/useCheckLogIn';
import { LANGUAGE_CODE } from 'src/app/constants';
import {
  fetchExerciseDetail,
  fetchSubmitExercise,
  fetchRunExercise,
} from 'src/features/exercise/exerciseSlice';
import { setToast } from 'src/features/ui/uiSlice';
import LoadingScreen from 'src/components/LoadingScreen';
import Toast from 'src/components/Toast';
import DialogToLogin from 'src/components/DialogToLogin';

const useStyles = makeStyles((theme) => ({
  successBg: {
    backgroundColor: theme.palette.success,
  },
  warnBg: {
    backgroundColor: theme.palette.warn,
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
  testCaseArea: {
    display: 'flex',
    flexDirection: 'column',
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
  paragraph: {
    whiteSpace: 'pre-wrap',
  },
  submitArea: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputWrap: {},
  submitAreaButton: {
    margin: theme.spacing(1),
  },
  uploadFileInput: {
    display: 'none',
    minWidth: 120,
  },
}));

const ListExercise = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  // local state
  const { exerciseId } = props.match.params;
  const [uploadedFile_ls, setUploadedFile_ls] = useState(null);
  const [language_ls, setLanguage_ls] = useState(LANGUAGE_CODE.c);
  const [openSelect_ls, setOpenSelect_ls] = useState(false);
  const [openLoginDialog_ls, setOpenLoginDialog_ls] = useState(false);

  // global state
  const [isLoggedIn_gs, userData_gs] = useCheckLogIn();
  const currentExercise_gs = useSelector((state) => state.exerciseSlice.currentExercise);
  const runResult_gs = useSelector((state) => state.exerciseSlice.runResult);
  const isRunningExercise_gs = useSelector(
    (state) => state.exerciseSlice.isPendingFetchRunExercise
  );
  const submittedResult_gs = useSelector((state) => state.exerciseSlice.submittedResult);
  const isSubmittingExercise_gs = useSelector(
    (state) => state.exerciseSlice.isPendingFetchSubmitExercise
  );

  const handleUploadButton = () => {
    console.log(1);
    !isLoggedIn_gs && setOpenLoginDialog_ls(true);
  };

  const handleUpload = (event) => {
    setUploadedFile_ls(event.target.files[0]);
  };

  const handleRunExercise = () => {
    dispatch(
      fetchRunExercise({ exerciseId, scriptCode: '', languageId: 2, codeFile: uploadedFile_ls })
    );
  };

  const handleSubmitExercise = () => {
    dispatch(
      fetchSubmitExercise({ exerciseId, scriptCode: '', languageId: 2, codeFile: uploadedFile_ls })
    );
  };

  useEffect(() => {
    dispatch(fetchExerciseDetail({ exerciseId }));
  }, [dispatch, exerciseId]);

  useEffect(() => {
    dispatch(
      setToast({
        open: !isRunningExercise_gs && runResult_gs.length,
        content: 'Chạy code thành công, xem kết quả ở phần Test case!',
        type: 'success',
        position: {
          vertical: 'center',
          horizontal: 'center',
        },
      })
    );
  }, [dispatch, isRunningExercise_gs, runResult_gs.length]);

  useEffect(() => {
    dispatch(
      setToast({
        open: !isSubmittingExercise_gs && submittedResult_gs.message,
        content: 'Nộp bài thành công!',
        type: 'success',
        position: {
          vertical: 'center',
          horizontal: 'center',
        },
      })
    );
  }, [dispatch, isSubmittingExercise_gs, submittedResult_gs]);

  return (
    <Container>
      {!currentExercise_gs ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={2}>
          <DialogToLogin needOpen={openLoginDialog_ls} setNeedOpen={setOpenLoginDialog_ls} />
          <Grid container item spacing={2} md={9} className={classes.contentWrap}>
            <Grid item xs={12}>
              <Paper className={classes.commonPaperWrap} elevation={5}>
                <Typography variant="h4" color="primary" style={{ marginBottom: '2rem' }}>
                  {currentExercise_gs?.title}
                </Typography>
                <Typography className={classes.paragraph} paragraph>
                  {currentExercise_gs?.content}
                </Typography>
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
                      currentExercise_gs.testCases.map((testCase, index) => {
                        return (
                          <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>{`Test case ${index + 1}`}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box className={classes.testCaseArea}>
                                <Box className={classes.ioArea} marginBottom={1}>
                                  <Typography>{'Input:'}</Typography>
                                  <Box className={classes.ioDataArea}>
                                    <Typography className={classes.paragraph}>
                                      {testCase.input.toString()}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box className={classes.ioArea}>
                                  <Typography>{'Output:'}</Typography>
                                  <Box className={classes.ioDataArea}>
                                    <Typography className={classes.paragraph}>
                                      {testCase.output.toString()}
                                    </Typography>
                                  </Box>
                                </Box>
                                {runResult_gs.length && (
                                  <Box className={classes.ioArea}>
                                    <Typography>{'Kết quả chạy:'}</Typography>
                                    <Box className={classes.ioDataArea}>
                                      <Typography className={classes.paragraph}>
                                        {runResult_gs[index].userOutput.toString() ||
                                          runResult_gs[index].error.toString() ||
                                          null}
                                      </Typography>
                                      {runResult_gs[index].result ? (
                                        <CheckIcon style={{ color: 'green' }} />
                                      ) : (
                                        <WrongIcon color="error" />
                                      )}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
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
                      value={language_ls}
                      onChange={(event) => setLanguage_ls(event.target.value)}
                    >
                      {Object.keys(LANGUAGE_CODE).map((language) => (
                        <MenuItem value={LANGUAGE_CODE[language]}>
                          {LANGUAGE_CODE[language]}
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
              <Paper className={classes.commonPaperWrap} elevation={5}>
                <Chip
                  style={{ marginBottom: '1rem' }}
                  color="primary"
                  icon={<PersonIcon />}
                  label={`Tác giả: ${currentExercise_gs.created_by}`}
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
                        submittedResult_gs.totalScore === currentExercise_gs.point
                          ? '#2ecc71'
                          : '#f1c40f',
                      color: '#fff',
                    }}
                    color="primary"
                    icon={<CheckCircleIcon color="action" />}
                    label={`Kết quả: ${submittedResult_gs.totalScore}/${currentExercise_gs.point}`}
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ListExercise;
