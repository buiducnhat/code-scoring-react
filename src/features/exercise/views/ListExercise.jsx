import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { ORDER_TYPE, ORDER_TYPE_PARSED } from 'src/app/constants';
import { fetchListExercise } from 'src/features/exercise/exerciseSlice';
import ExerciseBox from 'src/features/exercise/components/ExerciseBox';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  sortArea: {
    marginTop: theme.spacing(4),
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  exerciseItem: {
    padding: theme.spacing(2),
  },
  filter: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
  },
}));

const ListExercise = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // global state
  const countExercises_gs = useSelector((state) => state.exerciseSlice.total);
  const exercises_gs = useSelector((state) => state.exerciseSlice.exercises);

  // local state
  const [page_ls, setPage_ls] = useState(1);
  const [pageSize_ls, setPageSize_ls] = useState(8);
  const [order_ls, setOrder_ls] = useState(ORDER_TYPE.timeDESC);
  const [title_ls, setTitle_ls] = useState('');

  useEffect(() => {
    dispatch(
      fetchListExercise({ page: page_ls, pageSize: pageSize_ls, order: order_ls, title: title_ls })
    );
  }, [dispatch, order_ls, pageSize_ls, page_ls, title_ls]);

  return (
    <Container>
      <Grid container>
        <Grid item container spacing={2} className={classes.filter} xs={12}>
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-required"
              fullWidth
              variant="outlined"
              label="Tìm kiếm"
              value={title_ls}
              onChange={(event) => setTitle_ls(event.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl variant="outlined" style={{ minWidth: 100 }}>
              <InputLabel id="page-size-label">Hiển thị</InputLabel>
              <Select
                labelId="page-size-label"
                label="Hiển thị"
                id="demo-simple-select"
                value={pageSize_ls}
                onChange={(event) => setPageSize_ls(event.target.value)}
              >
                {[4, 8, 16, 32].map((pageSize) => (
                  <MenuItem value={pageSize}>{pageSize}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl variant="outlined">
              <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
              <Select
                labelId="sort-label"
                label="Sắp xếp theo"
                id="demo-simple-select"
                value={order_ls}
                onChange={(event) => setOrder_ls(event.target.value)}
              >
                {Object.entries(ORDER_TYPE).map((orderType) => (
                  <MenuItem value={orderType[1]}>{ORDER_TYPE_PARSED[orderType[0]]}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item container>
          {!exercises_gs?.length
            ? null
            : exercises_gs.map((exercise, index) => {
                return (
                  <Grid className={classes.exerciseItem} item md={3} sm={6} xs={12}>
                    <ExerciseBox
                      id={exercise.exercise_id}
                      title={exercise.title}
                      author={exercise.author}
                      updatedAt={exercise.updated_at}
                      point={exercise.point}
                    />
                  </Grid>
                );
              })}
        </Grid>
        <Grid container item justify="center" style={{ marginTop: 50 }}>
          <Grid item>
            <Pagination
              color="primary"
              shape="rounded"
              page={page_ls}
              count={Math.ceil(countExercises_gs / pageSize_ls)}
              onChange={(event, value) => setPage_ls(value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListExercise;
