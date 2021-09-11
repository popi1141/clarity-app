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
  IconButton,
  Tooltip
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { DatePicker } from "@material-ui/pickers";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
// import StarIcon from '@material-ui/icons/Star';
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
    padding: theme.spacing(0, 4, 0, 0),
    margin: theme.spacing(2, 0, 2, 0),
    width: '74vw'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  datePicker: {
    marginRight: '24px',
  },
  appStatusForm: {
    minWidth: '20vh',
    marginRight: '24px',
    fontSize: '10px'
  },
  appStatusLabel: {
    backgroundColor: theme.palette.background.default,
    paddingLeft: '5%',
    paddingRight: '5%',
    width: theme.spacing(10),
  },
  jobUrlButton: {
    color: '#6266EA !important',
    borderColor: theme.palette.primary.main,
    borderRadius: '40px',
    height: '40px',
    "&&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: 'white !important'
    },
    fontSize: '1rem',
    padding: theme.spacing(1, 1, 1, 1)
  },
  deadlineButtonClose: {
    backgroundColor: theme.palette.highlight.pink,
    borderRadius: '40px',
    height: '40px',
    marginRight: '2%',
    fontSize: '1rem',
    padding: theme.spacing(1, 1.5, 1, 1.5),
    color: 'white'
  },
  deadlineButtonNormal: {
    borderRadius: '40px',
    height: '40px',
    marginRight: '2%',
    backgroundColor: '#F4F4F4',
    fontSize: '1rem',
    padding: theme.spacing(1, 1.5, 1, 1.5)
  },
  customTag: {
    borderRadius: '40px',
    height: '40px',
    marginRight: '2%',
    backgroundColor: '#F4F4F4',
    fontSize: '1rem',
    padding: theme.spacing(1, 1.5, 1, 1.5)
  },
  dataButton: {
    marginRight: '12px',
    borderRadius: '40px',
    height: '40px',
    fontSize: '1rem',
    backgroundColor: '#F4F4F4',
    padding: theme.spacing(1, 1.5, 1, 1.5)
  },
  input: {
    width: theme.spacing(20),
    height: theme.spacing(6),
    gap: '10px',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    borderRadius: '10px',
    border: 'solid 1px var(--gray - 2)',
    marginRight: theme.spacing(3),
    fontSize: '16px'
  },
  selectDropdown: {
    width: theme.spacing(20),
  },
  formControl: {
    marginRight: '24px',
    fontSize: '12px'
  },
  keyDetailsLabel: {
    marginRight: theme.spacing(2)
  },
  companyText: {
    fontWeight: '500',
  },
  jobTitle: {
    fontWeight: '900',
    fontSize: '1.4rem'
  },
  deleteButton: {
    backgroundColor: 'red',
    textTransform: 'none',
    color: 'white',
    borderRadius: '40px',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  cancelButton : {
    textTransform: 'none',
    borderRadius: '40px',
    backgroundColor: theme.palette.text.grayOne,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  cardContent: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(1.5)
  },
  notes: {
    borderRadius: '10px',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(4)
  },
  closeIcon : {
    padding: '4px'
  },
  dialogTitle: {
    padding: theme.spacing(2),
    paddingRight: '0px'
  },
  dialogContent: {
    padding: theme.spacing(2,6,4,6)
  },
  editFields: {
    borderColor: theme.palette.text.grayTwo,
    borderRadius: '10px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(4),
    padding: theme.spacing(1,3,1,3),
    minHeight: '100px'
  },
  tooltip: {
    fontSize: '12px'
  },
  saveButton: {
    borderRadius: '30px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    padding: theme.spacing(1,3,1,3),
    '&:hover': {
      backgroundColor: theme.palette.primary.first,
    },
    textTransform: 'none',
  }
}));

const JobCard = ({
  className,
  job,
  i,
  handlePriorityChangeToReg,
  handlePriorityChangeToHigh,
  updatePriorityLists,
  getUserData,
  handleSaveChanged,
  ...props
}) => {
  const classes = useStyles();
  // console.log("updatePriorityList: ", updatePriorityLists);
  // console.log("getUserData: ", getUserData);
  const [values, setValues] = useState({})
  const defaultValues = {
    title: 'Untitled',
    location: 'Unspecified Location',
    salary: 'Unspecified Salary',
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
    jobDesc: 'No job description added',
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
      salary: job.salary,
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
      jobDesc: job.jobDesc,
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

  // job desc
  // const [desc, setDesc] = useState(null);


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

  // const handleEditorChange = (value) => {
  //   // value => {
  //   //   const jobDesc = JSON.stringify(
  //   //     convertToRaw(value.getCurrentContent())
  //   //   );
  //   // }
  //   setValues({ ...values, jobDesc: value})
  // }

  const handleDeadlineChange = (value) => {
    // console.log("handleDeadline called");
    setValues({ ...values, deadline: value.toDate() })
  }

  const handlePostedDateChange = (value) => {
    // console.log("handlePostDate called");

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
        handleSaveChanged();
        // getUserData();
      });

    toggleEditing(false)
    setOpen(false);

    //setInitialEditability(!initialEditability)
  }

  const handleDeleteCard = () => {
    const uid = localStorage.getItem("uid")
    // console.log(job.id)


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
      <CardContent className={classes.cardContent}>
        <Box
          display="flex">
          <Box m={5} mr={4} ml={4}>
            <PushPin changePriority={changePriority} priorityStatus={values.priority} i={i} color="primary" />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            flexGrow={1}
            flexDirection="column"
            onClick={open && editing ? () => handleSaveData() : () => handleExpandClick()}
            style={{cursor: 'pointer'}}
          >
            {editing ?
              <Box
                display="flex"
                justifyContent="flex-start"
                mb={4}
                mt={3}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                  >
                    Job Title
                  </Typography>
                  <FormControl>
                    <OutlinedInput
                      className={classes.input}
                      placeholder="Position Title"
                      value={values.title}
                      onChange={handleInputChange('title')}
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
                    variant="h5"
                  >
                    Company
                  </Typography>
                  <FormControl>
                    <OutlinedInput
                      className={classes.input}
                      placeholder="Company Name"
                      value={values.company}
                      onChange={handleInputChange('company')}
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
                    variant="h5"
                  >
                    Location
                  </Typography>
                  <FormControl>
                    <OutlinedInput
                      className={classes.input}
                      placeholder="City, State"
                      value={values.location}
                      onChange={handleInputChange('location')}
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
                    variant="h5"
                  >
                    Salary
                  </Typography>
                  <FormControl>
                    <OutlinedInput
                      className={classes.input}
                      placeholder="Est. Salary"
                      value={values.salary}
                      onChange={handleInputChange('salary')}
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
                  <LocationOnIcon style={{ color: '#ABB2BD', marginBottom: '-5px' ,marginRight: '6px'}} />
                  <Typography
                    color="textPrimary"
                    display="inline"
                    variant="body1"
                    className={classes.keyDetailsLabel}
                  >

                    {values.location ? values.location : defaultValues.location}
                  </Typography>
                  <AttachMoneyIcon style={{ color: '#ABB2BD', marginBottom: '-5px' ,marginRight: '6px'}} />
                  <Typography
                    color="textPrimary"
                    display="inline"
                    variant="body1"
                    className={classes.keyDetailsLabel}
                  >

                    {values.salary ? values.salary : defaultValues.salary}
                  </Typography>
                </Box>

              </Box>}

            <Box paddingBottom={1} mb={0.8}>
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
                      label="Due"
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
                      <InputLabel htmlFor="outlined-app-status" className={classes.appStatusLabel}> Status</InputLabel>
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
                      <FormControl>
                        {/* <OutlinedInput
                          className={classes.input}
                          value={values.url}
                          onChange={handleInputChange('url')}
                        /> */}
                        <TextField 
                          id="standard-basic" 
                          label="Job Post URL"
                          className={classes.input}
                          value={values.url}
                          onChange={handleInputChange('url')}
                        />
                      </FormControl>
                    {/* <Chip
                      label="Job Post URL"
                      component="a"
                      href={values.url}
                      clickable
                      target="_blank"
                      deleteIcon={<NavigateNextIcon />}
                      onDelete={handleChipDelete}
                      variant="outlined"
                      className={classes.jobUrlButton}
                    /> */}

                  </Grid>

                  :
                  <Grid
                    className={classes.statsItem}
                    item
                  >
                    <Chip
                      label={values.deadline && values.deadline !== '' ? 'Due: ' + values.deadline.toLocaleString('default', { month: 'short' }) + ' '
                        + values.deadline.getDate() + ', ' + values.deadline.getFullYear() : 'Due: N/A'}
                      className={calculateTimeDiff(values.deadline) < 5 ? classes.deadlineButtonClose : classes.deadlineButtonNormal}
                    />
                    <Chip
                      label={values.postedDate && values.postedDate !== '' ? 'Posted ' + calculateTimeDiff(values.postedDate) + ' days ago'
                        : 'Posted: N/A'}
                      className={classes.dataButton}
                    />
                    <Chip
                      label={values.progress ? values.progress : defaultValues.progress}
                      className={classes.dataButton}
                    />

                    <Chip
                      label="Job Post URL"
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
          <Box m={2} mt={5} mb={5} color="rgba(0, 0, 0, 0.6)" onClick={() => handleEditingClick()}>
            {editing ? null : <CreateIcon style={{cursor: 'pointer'}} />}

          </Box>
          <Box m={2} mt={5} mb={5} color="rgba(0, 0, 0, 0.6)" onClick={() => handleExpandClick()}>
            {open && editing ? null : (open ? <ExpandLess style={{cursor: 'pointer'}}/> : <ExpandMore style={{cursor: 'pointer'}}/>)}
          </Box>

          <Box m={2} mt={5} mb={5} color="rgba(0, 0, 0, 0.6)" >
            <DeleteIcon style={{cursor: 'pointer'}} onClick={() => handleDeleteModalShow()}/>
            {deleteModalShow ? <Dialog open={deleteModalShow} onClose={handleClose} className={classes.dialog}>
              {/* <form onSubmit={handleDeleteCard}> */}
              <DialogTitle className={classes.dialogTitle}>
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
              <DialogContent className={classes.dialogContent}>
                <Typography
                >Are you sure you want to delete this card? </Typography>
              </DialogContent>
              <Divider/>
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
          ml={12.5}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            flexGrow={1}
            mt={3}
            mb={6}
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
              alignItems="center"
              mb={3}
              mt={1}
            >
              {values.appMaterial && values.appMaterial.map((item) => {
                return (<Chip label={item} className={classes.customTag}></Chip>)
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
              mb={1}
            >
              Category Tags
          </Typography>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={3}
              mt={1}
            >
              {values.tags && values.tags.map((item) => {
                return (<Chip label={item} className={classes.customTag}></Chip>)
              })}

              {showAddTagSelect ?
                <Tooltip title="Press Enter to save." classes={{tooltip: classes.tooltip}}>
                  <FormControl className={classes.formControl}>
                    <OutlinedInput
                      placeholder="Add a tag"
                      value={currentAddTag}
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          handleTagAdd(ev)
                          ev.preventDefault();
                        }
                      }}
                      onChange={handleTagChange}
                    />
                  </FormControl>
                </Tooltip>
                :
                null
              }
              {editing ?
                <AddCircleOutlineOutlinedIcon onClick={handleAddTagButtonClick} />
                : null
              }
            </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
              >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >
                Job Description
              </Typography>
              {editing ?
                <FormControl>
                  <TextField
                    className={classes.notes}
                    placeholder="Add Job Descriptions Here"
                    multiline
                    value={values.jobDesc}
                    onChange={handleInputChange('jobDesc')}
                    variant="outlined"
                  />
                </FormControl>
                  :
                  <TextField
                    inputProps={
                    { 
                      readOnly: true, 
                    }
                    }
                    placeHolder={defaultValues.jobDesc}
                    defaultValue={values.jobDesc}
                    multiline
                    variant="outlined"
                    className={classes.jobDesc}
                  />
                }
                {/* <Box
                  border={1}
                  className={classes.editFields}
                >
                  {editing ?
                    <MUIRichTextEditor
                      label="Add Job Descriptions here..."
                      defaultValue={values.jobDesc}
                      controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList"]}
                      onChange={
                            (value) => {
                              let result = JSON.stringify(
                                    convertToRaw(value.getCurrentContent())
                                  );
                              console.log("value: ", result);
                              console.log("changed");
                              handleEditorChange(result);

                            }
                      }
                    />
                      :
                      <MUIRichTextEditor
                      label="No Job Descriptions Added"
                      defaultValue={values.jobDesc}
                      readOnly={true}
                      toolbar={false}
                    />
                  }
                </Box> */}
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
                marginTop="24px"
              >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >
                Notes
              </Typography>
              {/* <Box
                border={1}
                className={classes.editFields}
              >
                {editing ?
                  <MUIRichTextEditor
                    label="Add your notes here..."
                    defaultValue={values.notes}
                    controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList"]}
                    onChange={value => {
                      const notes = JSON.stringify(
                        convertToRaw(value.getCurrentContent())
                      );
                      handleEditorChange(notes);
                    }}
                  />
                    :
                    <MUIRichTextEditor
                    label="No Notes Added"
                    defaultValue={values.notes}
                    readOnly={true}
                    toolbar={false}
                  />
                }
              </Box> */}
              {editing ?
                <FormControl>
                  <TextField
                    className={classes.notes}
                    placeholder="Add Notes Here"
                    multiline
                    value={values.notes}
                    onChange={handleInputChange('notes')}
                    variant="outlined"
                  />
                </FormControl>
                  :
                  <TextField
                    inputProps={
                    { 
                      readOnly: true, 
                    }
                    }
                    placeholder={defaultValues.notes}
                    defaultValue={values.notes}
                    multiline
                    variant="outlined"
                    className={classes.notes}
                  />
                }
              </Box>
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
                variant="h5"
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
