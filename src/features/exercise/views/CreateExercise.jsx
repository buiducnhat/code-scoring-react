import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Chip, FormControl, Checkbox, Paper } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ORDER_TYPE, SERVER_URL } from 'src/app/constants';
import { imgurApi } from 'src/features/imageApi';
import { fetchCreateExercise } from 'src/features/exercise/exerciseSlice';
import { fetchListLanguage } from 'src/features/language/languageSlice';

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
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const ListExercise = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  // global state
  const language_gs = useSelector((state) => state.languageSlice.languages);
  const currentExercise_gs = useSelector((state) => state.exerciseSlice.currentExercise);

  // local state
  const [content_ls, setContent_ls] = useState('');
  const [languages_ls, setLanguages_ls] = useState([]);
  const [languagesId_ls, setLanguagesId_ls] = useState([]);

  useEffect(() => {
    dispatch(fetchListLanguage());
  }, [dispatch]);

  useEffect(() => {
    setLanguages_ls(language_gs);
    setLanguagesId_ls(language_gs.map((language) => language.language_id));
  }, [language_gs]);

  const handleDeleteLanguages = (languageToDelete) => () => {
    setLanguages_ls((languages) =>
      languages.filter((language) => language.language_id !== languageToDelete.language_id)
    );
    setLanguagesId_ls((languagesId) =>
      languagesId.filter((languageId) => languageId !== languageToDelete.language_id)
    );
  };

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.editorWrap}>
          <Formik
            initialValues={{ ...currentExercise_gs }}
            validationSchema={yup.object().shape({
              title: yup
                .string()
                .max(255, 'Tiêu đề không quá 255 ký tự')
                .required('Tiêu đề không được để trống'),
              content: yup.string().required('Nội dung không được để trống'),
              point: yup
                .number()
                .positive('Điểm số tối thiểu bằng 0')
                .integer('Điểm số là số nguyên')
                .required('Điểm không được để trống'),
              testCases: yup
                .array()
                .of(
                  yup.object().shape({
                    input: yup.string().required('Input không được để trống'),
                    output: yup.string().required('Output không được để trống'),
                    limitedTime: yup
                      .number()
                      .min(500, 'Thời gian tối thiếu bằng 500 mili giây')
                      .notRequired(),
                  })
                )
                .required(),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
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

                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          label="Ngôn ngữ"
                          value={JSON.stringify(languagesId_ls)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <Paper className={classes.languagesInput} elevation={5}>
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
                                setLanguages_ls(language_gs);
                                setLanguagesId_ls(
                                  language_gs.map((language) => language.language_id)
                                );
                              }}
                            />
                          )}
                        </Paper>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Editor
                        apiKey={process.env.REACT_APP_TINY_API_KEY}
                        init={{
                          height: 500,
                          plugins: `link nonbreaking codesample lists image media table wordcount preview`,
                          toolbar: `undo redo | formatselect | bold italic underline |
																		alignleft aligncenter alignright alignjustify | 
																		bullist numlist table| link image media codesample | preview`,
                          images_upload_handler: (blobInfo, success, failure, progress) => {
                            imgurApi
                              .uploadImage({ imageFile: blobInfo.blob() })
                              .then((result) => {
                                success(result.url);
                              })
                              .catch((error) => failure(JSON.stringify(error)));
                          },
                          // file_browser_callback_types: 'image',
                          // file_picker_callback: function (callback, value, meta) {
                          //   if (meta.filetype === 'image') {
                          //     var input = document.getElementById('my-file');
                          //     input.click();
                          //     input.onchange = function () {
                          //       var file = input.files[0];
                          //       var reader = new FileReader();
                          //       // reader.onload = function (e) {
                          //       //   console.log('name', e.target.result);
                          //       //   callback(e.target.result, {
                          //       //     alt: file.name,
                          //       //   });
                          //       // };
                          //       imgurApi.uploadImage({ imageFile: file }).then((response) => {
                          //         callback(response.url);
                          //       });
                          //       // reader.readAsDataURL(file);
                          //     };
                          //   }
                          // },
                        }}
                        textareaName={`content`}
                        onBlur={(content, editor) => {
                          setContent_ls(content.target.getContent());
                        }}
                      />
                    </Grid>

                    <Grid item></Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListExercise;
