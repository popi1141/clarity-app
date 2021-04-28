import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../../components/generalContent/topBar.js';
import Page from '../../components/page/Page.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import BannerImage1 from '../../assets/banner_illustration_1.png'
import FeatureImage1 from '../../assets/feature_image_1.png'
import FeatureImage2 from '../../assets/feature_image_2.png'
import Item1 from '../../assets/item1.png'
import Item2 from '../../assets/item2.png'
import Item3 from '../../assets/item3.png'
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
        paddingLeft: '10px',
        paddingRight: '10px',
        textTransform: 'none',
        maxWidth: '30%',
        '&:hover': {
          backgroundColor: theme.palette.primary.main
        }
      },
      whiteSection: {
        paddingLeft: '15%',
        paddingRight: '15%'
      },
      itemsSection: {
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: '7%',
        paddingBottom: '5%'
      },
      greySection: {
        paddingLeft: '15%',
        backgroundColor: 'rgba(224, 224, 224, 0.21)'
      },
      finalSection: {
        width: '75%',
        paddingTop: '5%',
        paddingBottom: '5%',
        backgroundColor: 'rgba(224, 224, 224, 0.21)'
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
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h1" component="h2">
                                    Simplify your job hunting process with Clarity.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
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
                        <Box display="flex" justifyContent="center">
                            <img src={FeatureImage1} alt="featureimage1"/>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h1" component="h2">
                                Save job posts easily.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
                <Container maxWidth="xl" className={classes.greySection}>
                    <Box display="flex">
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h1" component="h2">
                                    Create your own custom categories.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
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
                                <img src={Item1} alt="item1"/>
                                <Typography variant="h3" component="h3">
                                Track Application Status
                                </Typography>
                                <Typography variant="body2" gutterBottom css={{textAlign:'justify'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <img src={Item2} alt="item2"/>
                                <Typography variant="h3" component="h3">
                                Manage Required Materials
                                </Typography>
                                <Typography variant="body2" gutterBottom css={{textAlign:'justify'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"> 
                                <img src={Item3} alt="item3"/>
                                <Typography variant="h3" component="h3">
                                Add Personal Notes
                                </Typography>
                                <Typography variant="body2" gutterBottom css={{textAlign:'justify'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid> 
                </Container>
                <Container maxWidth="xl" className={classes.finalSection}>
                    <Box display="flex">
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h1" component="h2">
                                    Join Clarity
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                </Typography>
                            </Box>
                        </Box>
                        <Button component={RouterLink} className={classes.startButton} to="/signup">Start For Free</Button>
                    </Box>
                </Container>
            </Page>
        </React.Fragment>
  
    );
}

export default HomePage;