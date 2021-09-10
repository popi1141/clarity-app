import React, { useState, useEffect, useRef } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './navBar';
import TopBar from './topBar';
import AccountView from '../../views/account/AccountView';
import SettingsView from '../../views/settings/SettingsView';
import NotFoundView from '../../views/errors/NotFoundView';
import firebase from '@firebase/app';
import JobFilter from '../../views/jobs/JobWithTags';
import '@firebase/firestore'
import '@firebase/auth';
// import NavItem from './navBar/navItem';
//import rp from "request-promise";
//import { parse } from 'node-html-parser';

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    paddingTop: 80,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(28)
    },
    borderRadius: '30px 0px 0px 0px'
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    borderRadius: '30px 0px 0px 0px'
  },
  content: {
    marginTop: theme.spacing(5),
    flex: '1 1 auto',
    borderRadius: '30px 0px 0px 0px'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const user = firebase.auth().currentUser;

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const [initialEditability, setInitialEditability] = useState(true);
  const [highPriorityJobs, sethighPriorityJobs] = useState([]);
  const [regPriorityJobs, setregPriorityJobs] = useState([]);


  let totalTags = [];
  const [saved, setSaved] = useState(false);

  const handleSaveChanged = () => {
    setSaved(!saved);
  }
  // const [totalTags, setTotalTags] = useState({});

  const uid = localStorage.getItem("uid");

  const handlePriorityChangeToHigh = (id) => {
    const toChange = regPriorityJobs.find(job => job.id === id)
    toChange.priority = !toChange.priority
    sethighPriorityJobs([...highPriorityJobs, toChange]);

    setregPriorityJobs(regPriorityJobs => regPriorityJobs.filter((job) => job.priority !== true));
  }

  const handlePriorityChangeToReg = (id) => {
    const toChange = highPriorityJobs.find(job => job.id === id)
    toChange.priority = !toChange.priority
    setregPriorityJobs([...regPriorityJobs, toChange]);

    sethighPriorityJobs(highPriorityJobs => highPriorityJobs.filter((job) => job.priority !== false));
  }

  const updatePriorityLists = async () => {
    try {
      sethighPriorityJobs([])
      setregPriorityJobs([])
      await firebase.firestore()
        .collection('users')
        .doc(uid).collection('cards')
        .get()
        .then((querySnapshot) => {
          const cards = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })

          cards.forEach((card) => {
            if (card.priority) {
              sethighPriorityJobs(highPriorityJobs => [...highPriorityJobs, card])
            } else {
              setregPriorityJobs(regPriorityJobs => [...regPriorityJobs, card])
            }
            return
          })

        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })

    } catch {

    };
  }


  const jobsEndRef = useRef(null)

  const createNewCard = async (url) => {
    //var parsedURL = new URL(url);

    const newCard = {
      title: null,
      location: null,
      salary: null,
      company: null,
      deadline: null,
      postedDate: null,
      progress: null,
      companyContactName: null,
      companyContactEmail: null,
      appMaterial: [],
      priority: true,
      url: url,
      tags: [],
      jobDesc: null,
      notes: null,
      initialEditability: true
    }

    if (isValidHttpUrl(url)) {
      await firebase.firestore()
        .collection('users')
        .doc(uid)
        .collection('cards')
        .add(
          newCard
        )
        .then((docRef) => {
          newCard.id = docRef.id
          sethighPriorityJobs([...highPriorityJobs, newCard])
          //jobsEndRef.current.scrollIntoView({ behavior: "smooth" })
          //setInitialEditability(false)

        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
    // if (parsedURL.hostname === "www.indeed.com") {
    //   getAPIData(url).then(async function () {



    //   })
    // }





  }

  const [boards, setBoards] = useState([]);


  //const [apiData, setAPIData] = useState({})

  // const getAPIData = async (url) => {
  //   console.log(url)
  //   if (isValidHttpUrl(url)) {
  //     //var jobID = url.substr(url.lastIndexOf('=') + 1);
  //     rp({
  //       url: `https://corsanywhere.herokuapp.com/${url}`,
  //       headers: {
  //         'User-Agent': 'Request-Promise'
  //       }
  //     })
  //       .then(html => {
  //         console.log(html)
  //         const root = parse(html);
  //         console.log(root.querySelector('.jobsearch-JobInfoHeader-title'));

  //       })
  //       .catch(function (err) {
  //         console.log("crawl failed");
  //         console.log(err)
  //       });

  //   }

  // }

  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (err) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }


  const getUserData = async () => {
    try {
      await firebase.firestore()
        .collection('users')
        .doc(uid).collection('cards')
        .get()
        .then((querySnapshot) => {
          const cards = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })

          cards.forEach((card) => {
            card.tags.forEach((tag) => {
              // console.log("boards: ", boards)
              // console.log("tag: ", tag)
              // console.log("tags: ", totalTags)
              const newBoard = {
                href: '/app/dashboard/' + tag,
                title: tag
              }
              // if (!Object.values(boards).includes(tag)) {
              //   setBoards(boards => [...boards, newBoard])
              // }

              if (!totalTags.includes(tag)) {
                console.log("new tags");
                console.log("Tag: ", tag)
                totalTags.push(tag)
                // setTotalTags(totalTags => {...totalTags, {tag: true}});
                const k = boards.filter(board => board.title !== tag)
                let appendBoard = [...k, newBoard];
                console.log("filtered boards: ", k)
                console.log("changed boards", appendBoard)
                console.log("original boards,", boards)
                
                setBoards(boards => [...boards.filter(board => board.title !== tag), newBoard]);
              }

              


            })
            console.log("card: ", card);
            if (card.priority) {
              sethighPriorityJobs(highPriorityJobs => [...highPriorityJobs.filter(job => job.id !== card.id), card])
            } else {
              setregPriorityJobs(regPriorityJobs => [...regPriorityJobs.filter(job => job.id !== card.id), card])
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
  // useEffect(() => {
  //   getUserData();
  // }, [totalTags]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("every render: ")
    console.log('Tags: ', totalTags)
    console.log('highpriorityjobs: ', highPriorityJobs)
    console.log('reg jobs: ', regPriorityJobs)
    console.log("svaed: ", saved)
    getUserData();// eslint-disable-next-line
  }, [saved]) 
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
                {/* <JobListView
                  handlePriorityChangeToHigh={handlePriorityChangeToHigh}
                  handlePriorityChangeToReg={handlePriorityChangeToReg}
                  regPriorityJobs={regPriorityJobs}
                  highPriorityJobs={highPriorityJobs}
                  initialEditability={initialEditability}
                  setInitialEditability={setInitialEditability}
                  updatePriorityLists={updatePriorityLists}
                  sethighPriorityJobs={sethighPriorityJobs}
                  setregPriorityJobs={setregPriorityJobs}
                  ref={jobsEndRef}
                /> */}
                <JobFilter
                  Jobs={null}
                  handlePriorityChangeToHigh={handlePriorityChangeToHigh}
                  handlePriorityChangeToReg={handlePriorityChangeToReg}
                  regPriorityJobs={regPriorityJobs}
                  highPriorityJobs={highPriorityJobs}
                  initialEditability={initialEditability}
                  setInitialEditability={setInitialEditability}
                  updatePriorityLists={updatePriorityLists}
                  sethighPriorityJobs={sethighPriorityJobs}
                  setregPriorityJobs={setregPriorityJobs}
                  ref={jobsEndRef}
                  getUserData={getUserData}
                  handleSaveChanged={handleSaveChanged}
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
