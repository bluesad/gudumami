import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { deepOrange } from '@material-ui/core/colors';


const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
		display: 'flex',
    flex: 1,
		textAlign: 'center'
  },
  cardMedia: {
    width: 73,
    height: 73,
  },
});

export const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
		borderRadius: 40,
		width: 170,
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
}))(Button);

export default function AppDownload(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      {/* <CardActionArea component="a" href="#"> */}
        {/* <Card className={classes.card}> */}
          <div className={classes.cardDetails}>
            <CardMedia
              className={classes.cardMedia}
              image={post.image}
              title={post.imageTitle}
            />
            <CardContent style={{padding:0, paddingLeft: '1rem'}}>
              <Typography component="h2" variant="h5" style={{fontSize: 20, color: 'rgb(121, 121, 121)'}}>
                {post.title}
              </Typography>
              <a href={post.link}>
                <ColorButton
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                >
                  点击购买
                </ColorButton>
              </a>
              {/* <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography> */}
            </CardContent>
          </div>
        {/* </Card> */}
      {/* </CardActionArea> */}
    </Grid>
  );
}

AppDownload.propTypes = {
  post: PropTypes.object,
};