import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  Collapse,
  makeStyles,
  SvgIcon,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  TextField,
  Button
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { PushPin } from '../../../assets/PushPin.js';
import { DatePicker } from "@material-ui/pickers";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import firebase from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '30px',
    boxShadow: '0px 2px 7px 4px rgb(0,0,0,0.1)',
    margin: theme.spacing(2, 0, 2, 0)
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const JobCard = ({ 
  className, 
  job, 
  i, 
  handlePriorityChangeToReg, 
  handlePriorityChangeToHigh, 
  initialEditability, 
  setInitialEditability, 
  updatePriorityLists,
  ...props 
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({})
  const [defaultValues, setDefaultValues] = useState({
    title: 'Untitled',
    location: 'Unspecified Location',
    company: 'Unspecified Company',
    deadline: 'N/A',
    postedDate: 'N/A',
    progress: 'N/A',
    companyContactName: '',
    companyContactEmail: '',
    appMaterial: [],
    priority: false,
    url: '',
    tags: '',
    notes: 'No notes added'
  })

  useEffect(() => {
    setInitialData()
  }, [])

  // retrieve organized card data from job lists
  const setInitialData = () => {
    setValues({
      ...values,
      title: job.title,
      location: job.location,
      company: job.company,
      deadline: job.deadline ? job.deadline.toDate() : new Date(),
      postedDate: job.postedDate ? job.postedDate.toDate() : new Date(),
      progress: job.progress,
      companyContactName: job.companyContactName,
      companyContactEmail: job.companyContactEmail,
      appMaterial: job.appMaterial,
      priority: job.priority,
      url: job.url,
      tags: job.tags,
      notes: job.notes
    });
    console.log(job.url)
  }

  // calculate time since job was posted
  const calculateTimeDiff = (postedDate) => {
    const currDate = new Date()
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((currDate - postedDate) / oneDay));
    return diffDays
  }

  // expand/contract card 
  const [open, setOpen] = useState(initialEditability)
  const handleExpandClick = () => {
    setOpen(!open);
  };

  // notifications
  const [notifsOn, setNotifsOn] = useState(false)
  const handleNotifs = () => {
    setNotifsOn(!notifsOn);
  };

  // toggle editing
  const [editing, toggleEditing] = useState(initialEditability)
  const handleEditingClick = () => {
    toggleEditing(!editing)
    setOpen(true);
  }

  // change priority
  const [priorityStatus, setPriority] = useState(null)
  const changePriority = (id) => {
    
    const uid = localStorage.getItem("uid")
    const newData = values
    newData.priority = !values.priority
    console.log(newData.priority)

    console.log(newData)

    console.log(values.priority)
    setValues(({priority, ...prevState}) => ({
      ...prevState,
      priority: !priority
    }));
    console.log(values.priority)

    console.log(values)

    const updateRef = firebase.firestore()
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(job.id)
      .set(values)
      .then(function () {
        console.log("Updated");
      });

      updatePriorityLists()

  }

  // app Status
  const appStatusOptions = [
    { value: 'Need to Apply' },
    { value: 'Waiting to Hear Back' },
    { value: 'Rejected' },
    { value: 'Interviewing' },
    { value: 'Got an Offer' },
    { value: 'Accepted Offer' },
    { value: 'N/A' }
  ]

  // handle app material user input
  const appMaterialOptions = [
    { value: 'Resume' },
    { value: 'Cover Letter' },
    { value: 'Letter of Recommendation' },
    { value: 'Portfolio' },
    { value: 'Transcript' },
    { value: 'Certifications' },
    { value: 'N/A' },

  ]
  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDeadlineChange = (value) => {
    setValues({...values, deadline:value.toDate()})
  }

  const handlePostedDateChange = (value) => {
    setValues({...values, postedDate:value.toDate()})
  }


  const [currentAddMaterial, setCurrAddMaterial] = useState(null)
  const [showAddMaterialSelect, toggleAddMaterialMenu] = useState(false)

  const handleAppMaterialAdd = (event) => {
    setCurrAddMaterial(event.target.value)

    var specificArrayInObject = values.appMaterial;
    specificArrayInObject.push(event.target.value);
    var newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj)
    toggleAddMaterialMenu(!showAddMaterialSelect)
    setCurrAddMaterial('')

  }

  const handleAddMaterialButtonClick = () => {
    toggleAddMaterialMenu(!showAddMaterialSelect)
  }


  // handle category tags user input
  const [currentAddTag, setCurrAddMTag] = useState(null)
  const [showAddTagSelect, toggleAddTagMenu] = useState(false)

  const handleTagChange = (event) => {
    setCurrAddMTag(event.target.value)

  }
  const handleTagAdd = (event) => {
    var specificArrayInObject = values.tags;
    specificArrayInObject.push(event.target.value);
    let newObj = values; 
    newObj.tags = specificArrayInObject
    setValues(newObj)
    toggleAddTagMenu(!showAddTagSelect)
    setCurrAddMTag('')
  }

  const handleAddTagButtonClick = () => {
    toggleAddTagMenu(!showAddTagSelect)
  }

  const handleSaveData = () => {
    const uid = localStorage.getItem("uid")

    const updateRef = firebase.firestore()
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(job.id)
      .set(values)
      .then(function () {
        console.log("Updated");
      });

    toggleEditing(false)
    setOpen(false);
    setInitialEditability(!initialEditability)
  }

  const [chipVal, setChipValue] = useState(false)
  const handleChipDelete = () => {
    setChipValue(!chipVal)
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...props}
    >
      <CardContent >
        <Box
          display="flex">

          <Box m={5}>
            <PushPin changePriority={() => changePriority(job.id)} priorityStatus={values.priority} ></PushPin>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            flexGrow={1}
            flexDirection="column"
          >
            {editing ?
              <Box
                display="flex"
                justifyContent="flex-start"
                mb={3}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Job Title
                  </Typography>
                  <FormControl>
                    <OutlinedInput
                      placeholder="Position Title"
                      value={values.title}
                      onChange={handleInputChange('title')}
                      labelWidth={0}
                    />
                  </FormControl>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Company
                  </Typography>
                  <FormControl>
                    <OutlinedInput
                      placeholder="Company Name"
                      value={values.company}
                      onChange={handleInputChange('company')}
                      labelWidth={0}
                    />
                  </FormControl>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Location
                  </Typography>
                  <FormControl>
                    <OutlinedInput
                      placeholder="Location"
                      value={values.location}
                      onChange={handleInputChange('location')}
                      labelWidth={0}
                    />
                  </FormControl>
                </Box>
              </Box>
              :
              <Box
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
                mb={3}
              >
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                >
                  {values.title ? values.title : defaultValues.title}
                </Typography>

                <Box>
                  <Typography
                    color="textPrimary"
                    display="inline"
                    variant="body1"
                  >
                    {values.company ? values.company : defaultValues.company}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    display="inline"
                    variant="body2"
                  >
                    <LocationOnIcon />
                    {values.location ? values.location : defaultValues.location}
                  </Typography>

                </Box>

              </Box>}

            <Box p={2}>
              <Grid
                container
                justify="space-between"
                spacing={2}
              >

                {editing ?
                  <Grid
                    className={classes.statsItem}
                    item
                  >
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      label="Deadline"
                      value={values.deadline}
                      onChange={(newValue) => handleDeadlineChange(newValue)}
                    />
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      label="Posted Date"
                      value={values.postedDate}
                      onChange={(newValue) => handlePostedDateChange(newValue)}
                    />

                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>Application Status</InputLabel>
                      <Select
                        value={values.progress}
                        onChange={handleInputChange('progress')}
                      >
                        {appStatusOptions.map((item) => {
                          return (<MenuItem value={item.value}>{item.value}</MenuItem>)
                        })}

                      </Select>
                    </FormControl>

                    <Chip
                      label="Job Posting URL"
                      component="a"
                      href={values.url}
                      clickable
                      target="_blank" 
                      deleteIcon={<NavigateNextIcon />}
                      onDelete={handleChipDelete}
                      variant="outlined"
                    />

                  </Grid>

                  :
                  <Grid
                    className={classes.statsItem}
                    item
                  >
                    <Chip label={values.deadline && values.deadline != '' ? 'Deadline: ' + values.deadline.toLocaleString('default', { month: 'long' }) + ' '
                      + values.deadline.getDate() + ', ' + values.deadline.getFullYear() : 'Deadline: N/A'} />
                    <Chip label={values.postedDate && values.postedDate != '' ? 'Posted: ' + calculateTimeDiff(values.postedDate) + ' days ago'
                      : 'Posted: N/A'} />

                    <Chip label={values.progress ? 'Application Status: ' + values.progress : 'Application Status: ' + defaultValues.progress} />

                    <Chip
                      label="Job Posting URL"
                      component="a"
                      href={values.url}
                      clickable
                      target="_blank" 
                      deleteIcon={<NavigateNextIcon />}
                      onDelete={handleChipDelete}
                      variant="outlined"
                    />
                  </Grid>
                }
              </Grid>

            </Box>
          </Box>
          <Box m={5} onClick={() => handleEditingClick()}>
            {editing ? null : <CreateIcon />}

          </Box>
          <Box m={5} onClick={() => handleExpandClick()}>
            {open ? <ExpandMore /> : <ExpandLess />}

          </Box>
        </Box>

      </CardContent>

      <Divider variant="middle" className={classes.formDivider} />
      <Collapse in={open} timeout="auto" unmountOnExit>

        <Box
          display="flex"
          justifyContent="flex-start"
          ml={15}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            flexGrow={1}
            m={3}
          >

            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Required Application Material
          </Typography>
            <Box
              display="flex"
              justifyContent="flex-start"
              mb={3}
            >
              {values.appMaterial && values.appMaterial.map((item) => {
                return (<Chip label={item}></Chip>)
              })}

              {showAddMaterialSelect ?
                <FormControl className={classes.formControl}>
                  <Select
                    value={currentAddMaterial}
                    onChange={handleAppMaterialAdd}
                  >
                    {appMaterialOptions.filter(item => !values.appMaterial.includes(item.value)).map((item) => {
                      return (<MenuItem value={item.value}>{item.value}</MenuItem>)
                    })}

                  </Select>
                </FormControl>
                :
                null
              }
              {editing ?
                <AddCircleOutlineOutlinedIcon onClick={handleAddMaterialButtonClick} />
                : null
              }
            </Box>

            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Category Tags
          </Typography>
            <Box
              display="flex"
              justifyContent="flex-start"
              mb={3}
            >
              {values.tags && values.tags.map((item) => {
                return (<Chip label={item}></Chip>)
              })}

              {showAddTagSelect ?
                <FormControl className={classes.formControl}>
                  <OutlinedInput
                    placeholder="Add Tag"
                    value={currentAddTag}
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        handleTagAdd(ev)
                        ev.preventDefault();
                      }
                    }}
                    onChange={handleTagChange}
                    labelWidth={0}
                  />
                </FormControl>
                :
                null
              }
              {editing ?
                <AddCircleOutlineOutlinedIcon onClick={handleAddTagButtonClick} />
                : null
              }
            </Box>

            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Notes
          </Typography>

            {editing ?
              <TextField
                defaultValue={values.notes}
                variant="filled"
              />
              :
              <TextField
                disabled
                placeHolder={defaultValues.notes}
                defaultValue={values.notes}
                variant="filled"
              />

            }

          </Box>

          <Box
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            m={5}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDirection="column"

              flexGrow={1}
            >

            </Box>

            <Button onClick={handleSaveData} className={classes.saveButton}>
              <Typography
                color="white"
                display="inline"
                variant="h3"
              >
                Save
          </Typography>
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card >
  );
};

JobCard.propTypes = {
  className: PropTypes.string,
};

export default JobCard;
