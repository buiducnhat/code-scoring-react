import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

import { ORDER_TYPE } from 'src/app/constants';
import { fetchListExercise } from 'src/features/exercise/exerciseSlice';
import ExerciseBox from 'src/features/exercise/components/ExerciseBox';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  exerciseItem: {
    padding: theme.spacing(2),
  },
}));

const ListExercise = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // global state
  const exercises_gs = useSelector((state) => state.exerciseSlice.exercises);

  // local state
  const [page_ls, setPage_ls] = useState(1);
  const [pageSize_ls, setPageSize_ls] = useState(10);
  const [order_ls, setOrder_ls] = useState(ORDER_TYPE.timeDESC);
  const [title_ls, setTitle_ls] = useState('');

  useEffect(() => {
    dispatch(
      fetchListExercise({ page: page_ls, pageSize: pageSize_ls, order: order_ls, title: title_ls })
    );
  }, [dispatch, order_ls, pageSize_ls, page_ls, title_ls]);

  return (
    <Container>
      <Grid container mt={8}>
        {!exercises_gs?.length
          ? null
          : exercises_gs.map((exercise, index) => {
              return (
                <Grid className={classes.exerciseItem} item md={3} sm={6} xs={12}>
                  <ExerciseBox
                    id={exercise.exercise_id}
                    title={exercise.title}
                    author={exercise.created_by}
                    updatedAt={exercise.updated_at}
                    point={exercise.point}
                  />
                </Grid>
              );
            })}
      </Grid>
    </Container>
  );
};

export default ListExercise;
