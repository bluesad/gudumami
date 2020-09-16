import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import {ColorButton} from './AppDownload';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: '100%',
		height: '93px',
		backgroundSize: 'contain'
  },
	title: {
		fontFamily: '微软雅黑', 
		fontSize: '27px',
		fontWeight: '700'
	},
	subTitle: {
    display: 'flex',
		fontFamily: '微软雅黑', 
    fontSize: '20px',
    color: 'rgb(255, 69, 0)',
    fontWeight: 700,
		flexDirection: 'row',
	},
	ctaText: {
		fontFamily: '微软雅黑',
    fontSize: '15px',
    color: 'rgb(121, 121, 121)',
    fontWeight: 700,
		textAlign: 'center'
	},
	button: {
		margin: '0 auto'
	}
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      {/* <CardActionArea component="a" href="#"> */}
      {/* <Card className={classes.card}> */}
      <div className={classes.cardDetails}>
        {/* <Hidden xsDown> */}
        <CardMedia
          className={classes.cardMedia}
          image={post.image}
          title={post.imageTitle}
        />
        {/* </Hidden> */}
        <CardContent>
          <Typography component="h2" variant="h5" className={classes.title}>
            {post.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.subTitle}
          >
            <CardMedia
              image={post.subImage}
              title={post.subTitle}
              style={{
                width: "35px",
                height: "32px",
                marginRight: "20px",
              }}
            />
            {post.subTitle}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            <section
              dangerouslySetInnerHTML={{
                __html: post.description,
              }}
              style={{
                textIndent: "30px",
                fontFamily: "微软雅黑",
                fontSize: "15px",
                color: "rgb(121, 121, 121)",
                fontWeight: 400,
              }}
            ></section>
          </Typography>
          <Typography variant="subtitle1" className={classes.ctaText}>
            ​{post.ctaText}
          </Typography>
					<div style={{textAlign: 'center'}}>
            <a href='./zxgm.html'>
              <ColorButton
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                startIcon={<AddShoppingCartIcon />}
              >
                在线购买
              </ColorButton>
            </a>
					</div>
        </CardContent>
      </div>
      {/* </Card> */}
      {/* </CardActionArea> */}
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};