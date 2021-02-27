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
import data from './data';
import firebase from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const JobListView = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [highPriorityJobs, sethighPriorityJobs] = useState([]);
  const [regPriorityJobs, setregPriorityJobs] = useState([]);

  const uid = localStorage.getItem("uid")

  const handlePriorityChangeToHigh = (id) => {
    const dataUpdate = [...highPriorityJobs];
    dataUpdate[id] = regPriorityJobs[id];
    dataUpdate[id].priority = true
    sethighPriorityJobs([...dataUpdate]);

    const dataDelete = [...regPriorityJobs];
    dataDelete.splice(id, 1);
    setregPriorityJobs([...dataDelete]);

  }

  const handlePriorityChangeToReg = (id) => {
    const dataUpdate = [...regPriorityJobs];
    dataUpdate[id] = highPriorityJobs[id];
    dataUpdate[id].priority = false
    setregPriorityJobs([...dataUpdate]);

    const dataDelete = [...highPriorityJobs];
    dataDelete.splice(id, 1);
    sethighPriorityJobs([...dataDelete]);
  }

  const getUserData = async () => {
    try {
      const documentSnapshot = await firebase.firestore()
        .collection('users')
        .doc(uid)
        .get();

      const userData = documentSnapshot.data();

      localStorage.setItem("userData", userData)
      const boards = userData.boards;

      boards.map((board) => {
        board.cards.map((card) => {
          console.log(card)
          //const newArray = [...jobs, card];
          //setJobs(newArray);

          if (card.priority) {
            const newArray = [...highPriorityJobs, card];
            sethighPriorityJobs(newArray)
          } else {
            const newArray = [...regPriorityJobs, card];
            setregPriorityJobs(newArray)
          }


        })
      })

      console.log(jobs)

    } catch {
      //do whatever
    }
  };

  // Get user on mount
  useEffect(() => {
    getUserData();
  }, []);

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
            console.log(i)
            return(<JobCard
              className={classes.productCard}
              job={job}
              i={i}
              handlePriorityChangeToReg={handlePriorityChangeToReg}
              handlePriorityChangeToHigh={handlePriorityChangeToHigh}
            />)})}
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
          {regPriorityJobs.map((job,i ) => (
            <JobCard
              className={classes.productCard}
              job={job}
              i={i}
              handlePriorityChangeToReg={handlePriorityChangeToReg}
              handlePriorityChangeToHigh={handlePriorityChangeToHigh}

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
