import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from '../../../components/page/Page.js';
//import Toolbar from './Toolbar';
import JobCard from './JobCard';

import PushPin from '../../../assets/PushPin.js';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  jobCard: {
    height: '100%'
  }
}));

const JobListView = ({
  handlePriorityChangeToHigh,
  handlePriorityChangeToReg,
  highPriorityJobs,
  regPriorityJobs
}) => {
  const classes = useStyles();
  

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h1"
        >
          High Priority
        </Typography>
        <Box mt={3}>
          {highPriorityJobs.map((job, i) => {
            return (<JobCard
              className={classes.jobCard}
              job={job}
              i={i}
              handlePriorityChangeToReg={() => handlePriorityChangeToReg(i)}
              handlePriorityChangeToHigh={() => handlePriorityChangeToHigh(i)}
            />)
          })}
        </Box>

        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h1"
        >
          Regular Priority
        </Typography>
        <Box mt={3}>
          {regPriorityJobs.map((job, i) => (
            <JobCard
              className={classes.productCard}
              job={job}
              i={i}
              handlePriorityChangeToReg={()=> handlePriorityChangeToReg(i)}
              handlePriorityChangeToHigh={()=>handlePriorityChangeToHigh(i)}
            />
          ))}
        </Box>

        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default JobListView;
