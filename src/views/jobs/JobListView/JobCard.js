import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  Collapse,
  makeStyles,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { DatePicker } from "@material-ui/pickers";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import PushPin from '../../../assets/PushPin.js'
import firebase from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    boxShadow: '0 3px 10px 0 rgba(0, 0, 0, 0.1)',
    margin: theme.spacing(2, 0, 2, 0)
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  datePicker: {
    marginRight: '2%',
  },
  appStatusForm: {
    minWidth: '20vh',
    marginRight: '2%',
  },
  appStatusLabel: {
    backgroundColor: theme.palette.background.default,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  jobUrlButton: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    borderRadius: '30px',
    "&&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    },
  },
  deadlineButtonClose: {
    backgroundColor: theme.palette.highlight.pink,
    borderRadius: '30px',
    marginRight: '2%',
    color: 'white'
  },
  deadlineButtonNormal: {
    borderRadius: '30px',
    marginRight: '2%',
    color: 'black'
  },
  dataButton: {
    marginRight: '2%',
    borderRadius: '30px'
  },
  input: {
    width: theme.spacing(20),
    height: theme.spacing(6),
    gap: '10px',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    borderRadius: '10px',
    border: 'solid 1px var(--gray - 2)',
    marginRight: theme.spacing(5),
    fontSize: '16px'
  },
  selectDropdown: {
    width: theme.spacing(20),
  },
  formControl: {
    marginRight: theme.spacing(8),
    fontSize: '12px'
  },
  keyDetailsLabel: {
    marginRight: theme.spacing(0.8),
  },
  companyText: {
    fontWeight: '500',
  },
  jobTitle: {
    fontWeight: '700'
  },
  deleteButton: {
    backgroundColor: 'red'
  }
}));

const JobCard = ({
  className,
  job,
  i,
  handlePriorityChangeToReg,
  handlePriorityChangeToHigh,
  updatePriorityLists,
  ...props
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({})
  const defaultValues = {
    title: 'Untitled',
    location: 'Unspecified Location',
    company: 'Unspecified Company',
    deadline: 'N/A',
    postedDate: 'N/A',
    progress: 'N/A',
    companyContactName: '',
    companyContactEmail: '',
    appMaterial: [],
    priority: true,
    url: '',
    tags: '',
    notes: 'No notes added',
    initialEditability: false
  }

  useEffect(() => {
    setInitialData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
      notes: job.notes,
      initialEditability: job.initialEditability
    });
  }

  // calculate time since job was posted
  const calculateTimeDiff = (date) => {
    const currDate = new Date()
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((currDate - date) / oneDay));
    return diffDays
  }

  // expand/contract card 
  const [open, setOpen] = useState(false)
  const handleExpandClick = () => {
    setOpen(!open);
  };

  // notifications
  // const handleNotifs = () => {
  //   setNotifsOn(!notifsOn);
  // };

  // toggle editing
  const [editing, toggleEditing] = useState(values.initialEditability)
  const handleEditingClick = () => {
    toggleEditing(!editing)
    setOpen(true);
  }

  // change priority
  const changePriority = async (id) => {

    const uid = localStorage.getItem("uid")
    const newData = values
    newData.priority = !values.priority

    setValues(({ priority, ...prevState }) => ({
      ...prevState,
      priority: !priority
    }));

    await firebase.firestore()
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(job.id)
      .set(values)
      .then(function () {
        updatePriorityLists()

      });


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
    setValues({ ...values, deadline: value.toDate() })
  }

  const handlePostedDateChange = (value) => {
    setValues({ ...values, postedDate: value.toDate() })
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

    firebase.firestore()
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(job.id)
      .set(values)
      .then(function () {
      });

    toggleEditing(false)
    setOpen(false);
    //setInitialEditability(!initialEditability)
  }

  const handleDeleteCard = () => {
    const uid = localStorage.getItem("uid")
    console.log(job.id)


    firebase.firestore()
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(job.id)
      .delete()
      .then(() => {
        updatePriorityLists()
        handleClose()
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const handleClose = () => setDeleteModalShow(false);
  const handleDeleteModalShow = () => setDeleteModalShow(true);

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
            <PushPin changePriority={changePriority} priorityStatus={values.priority} i={i} color="primary" />
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
                      className={classes.input}
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
                      className={classes.input}
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
                      className={classes.input}
                      placeholder="City, State"
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
                mb={2}
              >
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                  className={classes.jobTitle}
                >
                  {values.title ? values.title : defaultValues.title}
                </Typography>

                <Box>
                  <Typography
                    color="textPrimary"
                    display="inline"
                    variant="body1"
                    className={`${classes.keyDetailsLabel} ${classes.companyText}`}
                  >
                    {values.company ? values.company : defaultValues.company}
                  </Typography>
                  <LocationOnIcon style={{ color: '#ABB2BD', marginBottom: '-5px' }} />
                  <Typography
                    color="textSecondary"
                    display="inline"
                    variant="body1"
                    className={classes.keyDetailsLabel}
                  >

                    {values.location ? values.location : defaultValues.location}
                  </Typography>
                </Box>

              </Box>}

            <Box paddingBottom={1}>
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
                      className={classes.datePicker}
                    />
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      label="Posted Date"
                      value={values.postedDate}
                      onChange={(newValue) => handlePostedDateChange(newValue)}
                      className={classes.datePicker}
                    />
                    <FormControl variant="outlined" className={classes.appStatusForm}>
                      <InputLabel htmlFor="outlined-app-status" className={classes.appStatusLabel}>Application Status</InputLabel>
                      <Select
                        className={classes.selectDropdown}
                        value={values.progress}
                        onChange={handleInputChange('progress')}
                        inputProps={{
                          name: 'app-status',
                          id: 'outlined-app-status',
                        }}
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
                    <Chip
                      label={values.deadline && values.deadline !== '' ? 'Deadline: ' + values.deadline.toLocaleString('default', { month: 'long' }) + ' '
                        + values.deadline.getDate() + ', ' + values.deadline.getFullYear() : 'Deadline: N/A'}
                      className={calculateTimeDiff(values.deadline) < 5 ? classes.deadlineButtonClose : classes.deadlineButtonNormal}
                    />
                    <Chip
                      label={values.postedDate && values.postedDate !== '' ? 'Posted: ' + calculateTimeDiff(values.postedDate) + ' days ago'
                        : 'Posted: N/A'}
                      className={classes.dataButton}
                    />
                    <Chip
                      label={values.progress ? 'Application Status: ' + values.progress : 'Application Status: ' + defaultValues.progress}
                      className={classes.dataButton}
                    />

                    <Chip
                      label="Job Posting URL"
                      component="a"
                      href={values.url}
                      clickable
                      target="_blank"
                      deleteIcon={<NavigateNextIcon />}
                      onDelete={handleChipDelete}
                      variant="outlined"
                      className={classes.jobUrlButton}
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

          <Box m={5} >
            <DeleteIcon onClick={() => handleDeleteModalShow()} />
            {deleteModalShow ? <Dialog open={deleteModalShow} onClose={handleClose} className={classes.dialog}>
              {/* <form onSubmit={handleDeleteCard}> */}
              <DialogTitle className={classes.title}>
                <Grid container spacing={20}>
                  <Grid item md={10} xs={12}>
                    <Typography align="left" gutterBottom variant="h5">
                      Delete Card
                      </Typography>
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <IconButton
                      className={classes.closeIcon}
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent>
                <Typography>Are you sure you want to delete this card? </Typography>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button
                  className={classes.cancelButton}
                  onClick={handleClose}
                  variant="contained"
                >
                  Cancel
            </Button>
                <Button
                  className={classes.deleteButton}
                  type="submit"
                  variant="contained"
                  onClick={handleDeleteCard}
                >
                  Delete
            </Button>
              </DialogActions>
              {/* </form> */}
            </Dialog>
              : null}
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
