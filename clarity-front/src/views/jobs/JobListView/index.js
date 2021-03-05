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
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  jobCard: {
    height: '100%'
  },
  bold: {
    fontWeight: 600
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
          variant="h2"
          className={classes.bold}
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
          variant="h2"
          className={classes.bold}
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
