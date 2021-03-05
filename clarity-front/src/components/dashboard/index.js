import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './navBar';
import TopBar from './topBar';
import MainLayout from '../mainContent/index.js';
import AccountView from '../../views/account/AccountView';
import JobListView from '../../views/jobs/JobListView';
import SettingsView from '../../views/settings/SettingsView';
import NotFoundView from '../../views/errors/NotFoundView';
import { Settings } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    paddingTop: 80,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(32)
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
  },
  content: {
    flex: '1 1 auto',
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

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

  const createNewCard = (url) => {
    const newCard = {
      id: regPriorityJobs.length + 1,
      boardID: 0,
      boardName: '',
      title: '',
      location: '',
      company: '',
      deadline: '',
      postedDate: '',
      progress: '',
      companyContactName: '',
      companyContactEmail: '',
      appMaterial: [],
      priority: false,
      url: url,
      tags: '',
      notes: ''
    }
    setregPriorityJobs([...regPriorityJobs, newCard])
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

      if (boards != null) {
        boards.map((board, boardID) => {
          board.cards.map((card, cardID) => {
            //const newArray = [...jobs, card];
            //setJobs(newArray);
            card.boardID = boardID
            card.id = cardID
            card.boardName = board.name

            if (card.priority) {
              const newArray = [...highPriorityJobs, card];
              sethighPriorityJobs(newArray)
            } else {
              const newArray = [...regPriorityJobs, card];
              setregPriorityJobs(newArray)
            }

          })
        })

      }

      console.log(jobs)

    } catch {
      //do whatever
    }
  };

  // Get user on mount
  useEffect(() => {
    getUserData();
    document.body.style.backgroundColor = '#F4F6F8';
  }, []);
  
  return (
    <div className={classes.root}>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <TopBar 
            onMobileNavOpen={() => setMobileNavOpen(true)} 
            createNewCard={createNewCard}
            />
            <Switch>
              <Route path="/app/account" component={<AccountView />} >
                <AccountView />
              </Route>
              <Route path="/app/dashboard" component={<JobListView />} >
                <JobListView 
                handlePriorityChangeToHigh={handlePriorityChangeToHigh}
                handlePriorityChangeToReg={handlePriorityChangeToReg}
                regPriorityJobs={regPriorityJobs}
                highPriorityJobs={highPriorityJobs}
                />
              </Route>
              <Route path="/app/settings" component={<SettingsView />} >
                <SettingsView />
              </Route>
              <Route path="/app/*" component={<NotFoundView />} >
                <NotFoundView />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
