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
    borderTopLeftRadius: '50px',
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  extender: {
    content:"",
    backgroundColor: theme.palette.background.dark,
    position: 'sticky',
    height: '50vh',
    width: '4000px',
    zIndex: '-5',
    left: '-500px',
    overflow: "hidden"
  },
  regJobCard: {
    height: '100%',
    animation: `$fadeIn 500ms`,
  },
  highJobCard: {
    height: '100%',
    animation: `$fadeInFromBottom 500ms`,
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(-200%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  },
  "@keyframes fadeInFromBottom": {
    "0%": {
      opacity: 0,
      transform: "translateY(200%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
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
  regPriorityJobs,
  initialEditability,
  setInitialEditability,
  updatePriorityLists
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
              className={classes.highJobCard}
              key={job.id}
              job={job}
              handlePriorityChangeToReg={() => handlePriorityChangeToReg(job.id)}
              handlePriorityChangeToHigh={() => handlePriorityChangeToHigh(job.id)}
              updatePriorityLists={updatePriorityLists}
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
              className={classes.regJobCard}
              key={job.id}
              job={job}
              handlePriorityChangeToReg={() => handlePriorityChangeToReg(job.id)}
              handlePriorityChangeToHigh={() => handlePriorityChangeToHigh(job.id)}
              initialEditability={initialEditability}
              setInitialEditability={setInitialEditability}
              updatePriorityLists={updatePriorityLists}
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
        <Container className={classes.extender}/>
      </Container>
    </Page>
  );
};

export default JobListView;
