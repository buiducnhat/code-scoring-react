import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Card, Typography, CardContent, Grid } from '@material-ui/core';
import { CalendarToday as CalendarIcon, FavoriteBorder as HeartIcon } from '@material-ui/icons';

import { listRoute } from 'src/app/listRoute';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderColor: theme.palette.primary,
    borderWidth: 2,
  },
  author: {
    fontSize: 14,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.info,
  },
  infoText: {
    fontSize: 14,
  },
}));

const ExerciseBox = ({ id, title, author, authorAvatar, updatedAt, point }) => {
  const navigation = useHistory();
  const classes = useStyles();

  // Local state

  return (
    <Card
      onClick={() => navigation.push(`${listRoute.exerciseEndpoint}/detail/${id}`)}
      elevation={8}
    >
      <CardContent className={classes.wrapper}>
        <Typography color="primary" variant="h3" className={classes.title}>
          {title}
        </Typography>
        <Avatar alt="avatar" className={classes.avatar} src={authorAvatar} />
        <Typography className={classes.author}>{author}</Typography>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center">
              <CalendarIcon fontSize="small" color="primary" />
              <Typography className={classes.infoText}>{updatedAt?.split(`T`)[0]}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center">
              <HeartIcon fontSize="small" color="secondary" />
              <Typography className={classes.infoText}>{point}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExerciseBox;
