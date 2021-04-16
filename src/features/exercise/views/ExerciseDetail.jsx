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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon, CloudUpload as UploadIcon } from '@material-ui/icons';

import { fetchExerciseDetail, fetchSubmitExercise } from 'src/features/exercise/exerciseSlice';

const useStyles = makeStyles((theme) => ({
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
  inputWrap: {
    width: '100%',
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  uploadFileInput: {
    display: 'none',
    minWidth: 120,
  },
}));

const ListExercise = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  // global state
  const currentExercise_gs = useSelector((state) => state.exerciseSlice.currentExercise);

  // local state
  const { exerciseId } = props.match.params;
  const [uploadedFile_ls, setUploadedFile_ls] = useState(null);
  const [isOpenUploadDialog_ls, setIsUploadDialog_ls] = useState(false);

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setUploadedFile_ls(event.target.files[0]);
    console.log(uploadedFile);
  };

  const handleSubmitUpload = () => {
    dispatch(
      fetchSubmitExercise({ exerciseId, codeFile: uploadedFile_ls, codeScript: '', languageId: 1 })
    );
  };

  useEffect(() => {
    dispatch(fetchExerciseDetail({ exerciseId }));
  }, [dispatch, exerciseId]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid container item spacing={2} md={9} className={classes.contentWrap}>
          <Grid item xs={12}>
            <Paper className={classes.commonPaperWrap} elevation={5}>
              <Typography variant="h6">{currentExercise_gs?.title}</Typography>
              <Typography className={classes.paragraph} paragraph>
                {currentExercise_gs?.content}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Accordion className={classes.testCasesArea} elevation={5}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{`Test case thử`}</Typography>
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
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsUploadDialog_ls(!isOpenUploadDialog_ls)}
              >
                {'Nộp bài'}
              </Button>
              <Dialog
                open={isOpenUploadDialog_ls}
                onClose={() => setIsUploadDialog_ls(!isOpenUploadDialog_ls)}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Upload</DialogTitle>
                <DialogContent>
                  <DialogContentText>Chọn file code để nộp bài</DialogContentText>
                  <Button
                    className={classes.inputWrap}
                    variant="contained"
                    color="primary"
                    component="label"
                  >
                    <Input
                      className={classes.uploadFileInput}
                      id="contained-button-file"
                      type="file"
                      onChange={handleUpload}
                    />
                    <UploadIcon />
                  </Button>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setIsUploadDialog_ls(!isOpenUploadDialog_ls)}
                    color="primary"
                  >
                    {'Hủy'}
                  </Button>
                  <Button
                    onClick={() => {
                      return handleSubmitUpload();
                      // setIsUploadDialog_ls(!isOpenUploadDialog_ls);
                    }}
                    color="primary"
                  >
                    {'Xác nhận'}
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} item md={3} className={classes.contentWrap}>
          <Grid item xs={12}>
            <Box className={classes.commonPaperWrap}>
              <Typography>{`Author: ${currentExercise_gs.created_by}`}</Typography>
              <Typography>{`Max score: ${currentExercise_gs.point}`}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListExercise;
