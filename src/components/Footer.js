import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={props.className}
    >
      承办方：咕嘟妈咪（上海）信息咨询有限公司
      {/* {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'rgba(76,172,57,1)', // theme.palette.background.paper,
		color: '#fff !important',
    // marginTop: theme.spacing(8),
    // padding: theme.spacing(6, 0),
		height: 51,
		[theme.breakpoints.down('sm')]: {
      height: 78,
		}
  },
	innerFooter: {
		display: 'flex',
		justifyContent: 'space-around',
		[theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
	},
	footerText1: {
		lineHeight: '3rem',
		[theme.breakpoints.down('sm')]: {
      lineHeight: '1rem',
			textAlign: 'left',
			margin: '0.5rem 0'
    },
	},
	footerText2: {
		color: '#fff',
		lineHeight: '3rem',
		[theme.breakpoints.down('sm')]: {
      lineHeight: '1rem',
			textAlign: 'left',
			margin: '0.5rem 0'
    },
	}
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg" className={classes.innerFooter}>
        {/* <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography> */}
        <Typography variant="subtitle1" align="center" component="p" className={classes.footerText1}>
          {description}
        </Typography>
        <Copyright className={classes.footerText2} />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};