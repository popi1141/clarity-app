import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../../components/generalContent/topBar.js';
import Page from '../../components/page/Page.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import BannerImage1 from '../../assets/banner_illustration_1.png'
import FeatureImage1 from '../../assets/feature_image_1.png'
import FeatureImage2 from '../../assets/feature_image_2.png'
import Item1 from '../../assets/item1.png'
import Item2 from '../../assets/item2.png'
import Item3 from '../../assets/item3.png'
import iSchoolLogo from '../../assets/ischoollogo.png'
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
      flexDirection: 'column'
    },
    startButton: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        borderRadius: '30px',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        textTransform: 'none',
        width: 'fit-content',
        '&:hover': {
          backgroundColor: theme.palette.primary.main
        }
      },
      whiteSection: {
        paddingLeft: '10%',
        paddingRight: '10%',
        marginBottom: '40px',
        marginTop: '48px'
      },
      itemsSection: {
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: '7%',
        paddingBottom: '5%',
        textAlign: 'center',
        marginTop: '5%',
        marginBottom: '5%'
      },
      teamSection: {
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: '4%',
        paddingBottom: '5%',
        textAlign: 'center'
      },
      greySection: {
        paddingLeft: '15%',
        backgroundColor: 'rgba(224, 224, 224, 0.21)',
      },
      finalSection: {
        width: '75%',
        paddingTop: '5%',
        paddingBottom: '5%',
        backgroundColor: 'rgba(224, 224, 224, 0.21)',
        marginBottom: '10%'
      },
      addBottomSpacing: {
          marginBottom: '40px'
      },
      addBottomSpacingLight: {
        marginBottom: '20px'
    },
    meetTeamHeader: {
        fontFamily: "Roboto Medium",
        marginBottom: '40px'
    },
    teamName: {
        fontFamily: "Roboto Medium",
        color: "#6266EA",
        marginBottom: "1%"
    },
    titleName: {
        color: "#ABB2BD",
    },
      addRightSpacing: {
        marginRight: '160px'
    },
    addPaddingRightLight: {
        paddingRight: '0%'
    },
    addPaddingRight: {
        paddingRight: '10%'
    },
      sectionHeader: {
          fontFamily: "Roboto Medium",
          marginBottom: '5%',
          lineHeight: '1.5'
      },
      endingHeader: {
        fontFamily: "Roboto Medium",
        marginBottom: '5%'
    },
    endingLogo: {
        marginTop: '5%'
    }
  }));


const HomePage = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <TopBar/>
            <Page className={classes.root} title="Clarity - Your Job Hunting Aggregator" >
                <Container maxWidth="xl" className={classes.whiteSection}>
                    <Box display="flex">
                        <Box display="flex" alignItems="center" justifyContent="center" className={classes.addRightSpacing}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h1" component="h1" className={classes.sectionHeader}>
                                    Simplify your job hunting process with Clarity.
                                </Typography>
                                <Typography variant="body1" gutterBottom className={classes.addBottomSpacing}>
                                    Tired of having dozens of tabs open while mass applying to openings? Tired of straining your eyes across countless rows on a spreadsheet? Clarity is here to provide you with a solution that saves you both time and frustration.
                                </Typography>
                                <Button component={RouterLink} className={classes.startButton} to="/signup">Start For Free</Button>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <img src={BannerImage1} alt="bannerillustration1"/>
                        </Box>
                    </Box>
                </Container>
                <Container maxWidth="xl" className={classes.whiteSection}>
                    <Box display="flex">
                        <Box display="flex" justifyContent="center" className={classes.addRightSpacing}>
                            <img src={FeatureImage1} alt="featureimage1"/>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" className={classes.addPaddingRightLight}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h2" component="h2" className={classes.sectionHeader}>
                                Save job posts easily.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                With only two clicks, start by grabbing your desired job posting link and adding it onto your dashboard.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
                <Container maxWidth="xl" className={classes.greySection}>
                    <Box display="flex">
                        <Box display="flex" alignItems="center" justifyContent="center" className={classes.addPaddingRight}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h2" component="h2" className={classes.sectionHeader}>
                                    Create your own custom categories.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                Tag your saved postings to organize your own categories based on your own interests and goals. 
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <img src={FeatureImage2} alt="bannerillustration2"/>
                        </Box>
                    </Box>
                </Container>
                <Container maxWidth="xl" className={classes.itemsSection}>
                    <Grid container spacing={10}>
                        <Grid item xs={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <img src={Item1} className={classes.addBottomSpacingLight} alt="item1"/ >
                                <Typography variant="h3" className={classes.addBottomSpacingLight} component="h3">
                                Track Application Status
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                Note which application materials are required to successfully put your best foot foward. 
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <img src={Item2} className={classes.addBottomSpacingLight} alt="item2"/>
                                <Typography variant="h3" className={classes.addBottomSpacingLight} component="h3">
                                Manage Required Materials
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                Note which application materials are required to successfully put your best foot foward. 
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <img src={Item3} className={classes.addBottomSpacingLight} alt="item3"/>
                                <Typography variant="h3" className={classes.addBottomSpacingLight} component="h3">
                                Add Personal Notes
                                </Typography>
                                <Typography variant="body1" gutterBottom css={{textAlign:'left'}}>
                                Have other attributes to note when applying to jobs? No fear, add them to your persnoal notes section!
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid> 
                </Container>
                <Container maxWidth="xl" className={classes.finalSection}>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                            <Box display="flex" flexDirection="column" alignContent="center" alignItems="center">
                                <Typography variant="h1" component="h2" className={classes.endingHeader}>
                                    Join Clarity
                                </Typography>
                                <Typography variant="body1" gutterBottom className={classes.addBottomSpacing}>
                                Begin your job-hunting journey today.
                                </Typography>
                            </Box>
                            <Button component={RouterLink} className={classes.startButton} to="/signup">Start For Free</Button>
                        </Box>
                    </Box>
                </Container>
                <Container maxWidth="xl" className={classes.teamSection}>
                     <Typography variant="h2" className={classes.meetTeamHeader} component="h3">
                        Meet The Team
                    </Typography>
                    <Grid container spacing={10}>
                        <Grid item xs={3}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <Typography variant="h3" className={classes.teamName} component="h3">
                                Justin Banusing
                                </Typography>
                                <Typography variant="body2" className={classes.titleName} gutterBottom>
                                PM / Front End Developer 
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <Typography variant="h3" className={classes.teamName} component="h3">
                                Melody Chou
                                </Typography>
                                <Typography variant="body2" className={classes.titleName} gutterBottom>
                                Full-Stack Developer 
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <Typography variant="h3" className={classes.teamName} component="h3">
                                Josephine Liu
                                </Typography>
                                <Typography variant="body2" className={classes.titleName} gutterBottom>
                                UX Designer
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <Typography variant="h3" className={classes.teamName} component="h3">
                                Jennifer Lai
                                </Typography>
                                <Typography variant="body2" className={classes.titleName} gutterBottom>
                                UI / UX Designer
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid> 
                    <img src={iSchoolLogo} alt="ischoollogo" className={classes.endingLogo}/>
                </Container>
            </Page>
        </React.Fragment>
  
    );
}

export default HomePage;