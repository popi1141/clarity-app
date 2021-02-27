import React, { useState } from 'react';
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
  SvgIcon
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import svg from '../../../assets/push-pin.svg';

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

const ProductCard = ({ className, job, i, handlePriorityChangeToReg, handlePriorityChangeToHigh, ...props }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [notifsOn, setNotifsOn] = useState(false)
  const [priorityStatus, setPriority] = useState(job.priority)

  const handleClick = () => {
    setOpen(!open);
  };


  const handleNotifs = () => {
    setNotifsOn(!notifsOn);
  };

  const calculateTimeDiff = (postedDate) => {
    const currDate = new Date()
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((currDate - postedDate) / oneDay));
    return diffDays
  }

  const changePriority = () => {
    console.log(i)

    if (priorityStatus) {
      handlePriorityChangeToReg(i)
    } else {
      handlePriorityChangeToHigh(i)
    }
    setPriority(!priorityStatus)
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
            <SvgIcon style={{ color:  priorityStatus ? 'black' : 'gray' }} onClick={changePriority} >
            <path d="M19.083 1c0 1.018-1.424 1.907-3.541 2.382V11c2.926.652 4.958 2.086 4.958 3.751h-7.792V23h-1.416v-8.25H3.5c0-1.665 2.032-3.1 4.958-3.751V3.382C6.341 2.907 4.917 2.018 4.917 1h14.166zs" />
            </SvgIcon>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            flexGrow={1}
            flexDirection="column"
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              mb={3}
            >
              <Typography
                align="center"
                color="textPrimary"
                gutterBottom
                variant="h2"
              >
                {job.title}
              </Typography>
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                <LocationOnIcon />
                {job.location}
              </Typography>
            </Box>

            <Box p={2}>
              <Grid
                container
                justify="space-between"
                spacing={2}
              >
                <Grid
                  className={classes.statsItem}
                  item
                >
                  <Chip label={'Deadline: ' + job.deadline.toDate().toLocaleString('default', { month: 'long' }) + ' '
                    + job.deadline.toDate().getDate() + ', ' + job.deadline.toDate().getFullYear()} />
                  <Chip label={'Posted: ' + calculateTimeDiff(job.postedDate.toDate()) + ' days ago'} />
                  <Chip label={job.progress} />

                </Grid>
              </Grid>

            </Box>
          </Box>
          <Box m={5} onClick={() => handleNotifs()}>
            {notifsOn ? <NotificationsIcon /> : <NotificationsNoneIcon />}

          </Box>
          <Box m={5} onClick={() => handleClick()}>
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
              Company Contact
          </Typography>
            <Box
              display="flex"
              justifyContent="flex-start"
              mb={4}
            >

              <Chip label={job.companyContactName} />
              <Chip label={job.companyContactEmail} />

            </Box>
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

              {job.appMaterial && job.appMaterial.map((item) => {
                return (<Chip label={item}></Chip>)
              })}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            m={5}
          >
            <Chip label={'Job Posting URL >'} />
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDirection="column"

              m={3}
            >
              <Typography
                color="textPrimary"
                display="inline"
                variant="h5"
              >
                Application Status
          </Typography>
              <Chip label={job.progress} />

            </Box>
          </Box>
        </Box>
      </Collapse>
    </Card >
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
