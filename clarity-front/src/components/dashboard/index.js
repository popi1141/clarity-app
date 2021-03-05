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
    overflow: 'hidden',
    paddingTop: 80,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(32)
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const user = firebase.auth().currentUser;

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const [initialEditability, setInitialEditability] = useState(false)
  const [highPriorityJobs, sethighPriorityJobs] = useState([]);
  const [regPriorityJobs, setregPriorityJobs] = useState([]);

  const uid = localStorage.getItem("uid")

  const handlePriorityChangeToHigh = (id) => {
    const toChange = regPriorityJobs.find(job => job.id === id)
    toChange.priority = !toChange.priority
    sethighPriorityJobs([...highPriorityJobs, toChange]);
    console.log(id)

    console.log(regPriorityJobs.filter((job) => job.priority !== true))
    setregPriorityJobs(regPriorityJobs => regPriorityJobs.filter((job) => job.priority !== true));
    console.log(regPriorityJobs)
    console.log(highPriorityJobs)

  }

  const handlePriorityChangeToReg = (id) => {
    const toChange = highPriorityJobs.find(job => job.id === id)
    toChange.priority = !toChange.priority
    setregPriorityJobs([...regPriorityJobs, toChange]);

    const dataDelete = highPriorityJobs.filter((job) => job.id !== id)
    sethighPriorityJobs(highPriorityJobs => highPriorityJobs.filter((job) => job.priority !== false));
    console.log(regPriorityJobs)
    console.log(highPriorityJobs)
  }

  const updatePriorityLists = async () => {
    try {
      sethighPriorityJobs([])
      setregPriorityJobs([])
      const documentSnapshot = await firebase.firestore()
        .collection('users')
        .doc(uid).collection('cards')
        .get()
        .then((querySnapshot) => {
          const cards = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })

          cards.map((card) => {
            if (card.priority) {
              sethighPriorityJobs(highPriorityJobs => [...highPriorityJobs, card])
            } else {
              setregPriorityJobs(regPriorityJobs => [...regPriorityJobs, card])
            }
          })

        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })

    } catch {

    };
  }


  const createNewCard = async (url) => {
    const newCard = {
      title: null,
      location: null,
      company: null,
      deadline: null,
      postedDate: null,
      progress: null,
      companyContactName: null,
      companyContactEmail: null,
      appMaterial: [],
      priority: false,
      url: url,
      tags: [],
      notes: null
    }


    await firebase.firestore()
      .collection('users')
      .doc(uid)
      .collection('cards')
      .add(
        newCard
      )
      .then((docRef) => {
        newCard.id = docRef.id
        setregPriorityJobs([...regPriorityJobs, newCard])
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });



    setInitialEditability(!initialEditability)

  }

  const [boards, setBoards] = useState([])

  const getUserData = async () => {
    try {
      const documentSnapshot = await firebase.firestore()
        .collection('users')
        .doc(uid).collection('cards')
        .get()
        .then((querySnapshot) => {
          const cards = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })


          // const card = doc.data()

          cards.map((card) => {
            card.tags.forEach((tag) => {
              const newBoard = {
                href: '/app/dashboard/' + tag,
                title: tag
              }
              if (boards.length === 0) {
                setBoards([...boards, newBoard])

              } else {
                for (let board in boards) {
                  if (board.title !== tag) {
                    setBoards([...boards, newBoard])
                  }
                }

              }

            })
            if (card.priority) {
              sethighPriorityJobs(highPriorityJobs => [...highPriorityJobs, card])
            } else {
              setregPriorityJobs(regPriorityJobs => [...regPriorityJobs, card])
            }

          })


        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })

    } catch {

    };
  };

  // Get user on mount
  useEffect(() => {
    getUserData();
  }, []);


  return (
    <div className={classes.root}>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        boards={boards}
      />
      <div className={classes.wrapper}>

        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <TopBar
              onMobileNavOpen={() => setMobileNavOpen(true)}
              createNewCard={createNewCard}
            />
            <Switch>
              <Route path="/app/account"  >
                <AccountView
                  user={user} />
              </Route>
              <Route path="/app/dashboard"  >
                <JobListView
                  handlePriorityChangeToHigh={handlePriorityChangeToHigh}
                  handlePriorityChangeToReg={handlePriorityChangeToReg}
                  regPriorityJobs={regPriorityJobs}
                  highPriorityJobs={highPriorityJobs}
                  initialEditability={initialEditability}
                  setInitialEditability={setInitialEditability}
                  updatePriorityLists={updatePriorityLists}
                />
              </Route>
              <Route path="/app/settings"  >
                <SettingsView />
              </Route>
              <Route path="/app/*" >
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
