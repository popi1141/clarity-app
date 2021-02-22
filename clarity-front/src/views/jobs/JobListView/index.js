import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from '../../../components/page/Page.js';
//import Toolbar from './Toolbar';
import JobCard from './JobCard';
import data from './data';

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
  const [jobs] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
            {jobs.map((job) => (
                <JobCard
                  className={classes.productCard}
                  job={job}
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
