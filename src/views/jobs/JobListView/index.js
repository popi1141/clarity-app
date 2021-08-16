import React, { forwardRef, useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import { Pagination } from '@material-ui/lab';
import Page from '../../../components/page/Page.js';
import JobCard from './JobCard';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: '50px',
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
  },
  extender: {
    content: "",
    backgroundColor: theme.palette.background.dark,
    position: 'sticky',
    height: '100%',
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
  },
  selectDropdown: {
    width: theme.spacing(25),
    height: theme.spacing(6.5),
    backgroundColor: 'white'
  },
  sortByLabel: {
    fontSize: '1rem'
  },
  placeholder: {
    color: 'black'
  }
}));

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: "30px"
      }
    }
  }
});

const JobListView = forwardRef((
  props,
  ref
) => {
  const classes = useStyles();
  const {
    handlePriorityChangeToHigh,
    handlePriorityChangeToReg,
    highPriorityJobs,
    regPriorityJobs,
    initialEditability,
    setInitialEditability,
    updatePriorityLists,
    setregPriorityJobs,
    sethighPriorityJobs
  } = props;

  const [sortByValue, setSortByValue] = useState(null);

  const sortByOptions = [
    { value: 'Location' },
    { value: 'Posted Date' },
    { value: 'Application Status' },
    { value: 'Deadline' },
  ]

  const handleSort = (prop) => (event) => {
    setSortByValue(event.target.value)
    if (event.target.value === "Deadline") {
      regPriorityJobs.sort(function (a, b) {
        return a.deadline.toDate() - b.deadline.toDate();
      });
      highPriorityJobs.sort(function (a, b) {
        return a.deadline.toDate() - b.deadline.toDate();
      });
    } else if (event.target.value === "Posted Date") {
      regPriorityJobs.sort(function (a, b) {
        return b.postedDate.toDate() - a.postedDate.toDate();
      });
      highPriorityJobs.sort(function (a, b) {
        return b.postedDate.toDate() - a.postedDate.toDate();
      });
    }
    sethighPriorityJobs(highPriorityJobs)
    setregPriorityJobs(regPriorityJobs)

  };

  return (
    <Page
      className={classes.root}
      title="Clarity - Your Job Hunting Aggregator"
    >
      <Container maxWidth={false}>
        <Box display="flex" justifyContent="flex-end" width="74vw">
          <Box>
            <FormControl variant="outlined" className={classes.sortByForm}>
              <MuiThemeProvider theme={theme}>
                <InputLabel htmlFor="outlined-sort-by" className={classes.sortByLabel}>Sort By</InputLabel>

                <Select
                  className={classes.selectDropdown}
                  value={sortByValue}
                  onChange={handleSort('sortBy')}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="" disabled selected>
                    Sort By
                  </MenuItem>
                  {sortByOptions.map((item) => {
                    return (<MenuItem value={item.value}>{item.value}</MenuItem>)
                  })}


                </Select>
              </MuiThemeProvider>


            </FormControl>
          </Box>
        </Box>

        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          High Priority
        </Typography>

        <Box mt={3} mb={6}>
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
          variant="h3"
        >
          Regular Priority
        </Typography>

        <Box mt={3} mb={6} >
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
          ref={ref}
          mt={3}
          display="flex"
          justifyContent="center"
        >
          {/* <Pagination

            color="primary"
            count={3}
            size="small"
          /> */}
        </Box>
        <Container className={classes.extender} />
      </Container>
    </Page>
  );
});

export default JobListView;
