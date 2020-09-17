import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { common } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';

import './Pricing.scss';
import FeaturedPost from '../components/FeaturedPost';
import AppDownload, {ColorButton} from '../components/AppDownload';
import CardMedia from '@material-ui/core/CardMedia';
import MainFeaturedPost from '../components/MainFeaturedPost';
import Footer from '../components/Footer';
import { green, grey } from '@material-ui/core/colors';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const tiers = [
  {
    title: '牛时雨口袋饭团',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
    link: 'http://jpfood.gudumami.cn/video/157375_27865_member_1_57315',
    image: `${require('./1292820822964544955.jpg')}`
  },
  {
    title: '中华风味牡丹饼',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
    link: 'http://jpfood.gudumami.cn/video/157375_27861_member_1_57315',
    image: `${require('./1292820822800967099.jpg')}`
  },
  {
    title: '梅子鱼干饭团',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
    link: 'http://jpfood.gudumami.cn/video/157375_27863_member_1_57315',
    image: `${require('./1292820825908946363.jpg')}`
  },

  {
    title: '东坡肉蒸饭',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
    link: 'http://jpfood.gudumami.cn/video/157375_27869_member_1_57315',
    image: `${require('./1292820826470983099.jpg')}`
  },
  {
    title: '上海蟹汤杂炊',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
    link: 'http://jpfood.gudumami.cn/video/157375_27871_member_1_57315',
    image: `${require('./1292820825107834299.jpg')}`
  },
  {
    title: '鳗鱼卷',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
    link: 'http://jpfood.gudumami.cn/video/157375_27867_member_1_57315',
    image: `${require('./1298141363507225383.jpg')}`
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];
const featuredPosts = [
  {
    title: '成都荣町食品有限公司',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: `${require('./1292817804122629563.png')}`,
    link: 'https://item.taobao.com/item.htm?spm=a1z10.1-c-s.w4004-21142807355.10.2afd5a25hI5kuP&id=596611922031',
  },
  {
    title: '成都荣町食品有限公司',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: `${require('./1296393346437538599.png')}`,
    link: 'https://weidian.com/item.html?itemID=1942277080&wfr=wxp_wxh5&ifr=itemdetail&spider_token=fe4a&share_relation=eb648a4fb2b49595_1209426052_3&state=H5WXshareOld&distributorId=1209426052&from=singlemessage&isappinstalled=0',
  },
];
const videoPlayer = `<iframe src="//player.bilibili.com/player.html?aid=884604997&bvid=BV1rK4y1a7gv&cid=235894505&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" load="lazy"> </iframe>`;

export function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const RoundGreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[700]),
		borderRadius: 40,
		width: 170,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

export const DisabledButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[700]),
		borderRadius: 40,
		width: 170,
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
			width: '100vw',
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
		backgroundColor: 'rgba(249,245,160,1)',
		minHeight: 50,
    borderBottom: '1px solid #fff'
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    // border: '1px solid red'
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
	hide: {
    display: 'none',
  },
	drawer: {
    width: '100vw',
    flexShrink: 0,
  },
	drawerPaper: {
    width: '100vw',
		alignItems: 'center',
		textAlign: 'center',
  },
	drawerHeader: {
    display: 'flex',
    alignItems: 'center',
		color: 'white',
    // necessary for content to be below app bar
    justifyContent: 'flex-start',
  },
	root: {
		position: 'fixed',
		display: 'flex',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
  herobar: {
    height: 'auto',
    // height: 685.5,
    backgroundImage: `url(${require('./1292745016802146078.png')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  rightBanner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  receipeMedia: {
    width: 278,
    height: 207,
    borderRadius: 20,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 135,
      height: 101,
    },
  },
  strawMedia: {
    width: 225,
    height: 304,
    borderRadius: 20,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 119,
      height: 161,
    },
  },
  strawTitle: {
    fontFamily: '微软雅黑',
    fontSize: 34,
    color: 'rgb(27, 27, 27)',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: 17,
    },
  },
  buttonHead: {
    color: '#fff',
    backgroundColor: 'rgb(255, 69, 0)',
    borderRadius: 40,
    width: 300,
    height: 44,
    lineHeight: '44px',
    margin: '0 auto'
    // lineHeight: 44,
  },
  bottomHeadlineMedia: {
    width: 374,
    height: 58,
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 43,
      backgroundSize: 'contain'
    },
  },
  liveMedia: {
    width: 238,
    height: 178,
    borderRadius: 20,
    [theme.breakpoints.down('sm')]: {
      width: 147,
      height: 111,
    },
  },
  qrTitle: {
    fontSize: 18,
    fontFamily: '微软雅黑',
    color: 'rgb(0, 134, 24)',
    fontWeight: 700,
  },
  qrMedia: {
    width: 120,
    height: 120,
  },
  receipeMenu: {
    position: 'relative',
    bottom: 40,
    fontFamily: '微软雅黑',
    fontSize: 16,
    color: 'rgb(124, 75, 0)',
    fontWeight: 400,
    width: 170,
    height: 28,
    backgroundImage: `url(${require('./label.png')})`,
    backgroundSize: 'cover',
    textAlign: 'center',
  },
  chefMedia: {
    width: 225,
    height: 304,
    backgroundSize: 'contain',
    [theme.breakpoints.down('sm')]: {
      width: 160,
      height: 207,
    },
  },
  profile: {
    fontFmily: '微软雅黑',
    fontSize: 20,
    color: 'rgb(7, 145, 58)',
    fontWeight: 700,
    writingMode: 'vertical-lr',
    position: 'relative',
    top: -260,
    left: 30,
    backgroundImage: `url(${require('./bowl.png')})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: 'contain',
    paddingBottom: 40,
    [theme.breakpoints.down('sm')]: {
      top: -190,
      left: 15,
    },
  },
  subProfile: {
    fontFmily: '微软雅黑',
    fontSize: 13,
    color: 'rgb(7, 145, 58)',
    fontWeight: 700,
    writingMode: 'vertical-lr',
    position: 'relative',
    top: -330,
    [theme.breakpoints.down('sm')]: {
      top: -280,
    },
  },
  gridLine: {
    height: 300,
    [theme.breakpoints.down('sm')]: {
      height: 400,
    },
  },
  gridCell: {
    [theme.breakpoints.down('sm')]: {
      height: 200,
    },
  }
}));



export default function Pricing(props) {
  const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
    setOpen(true);
  };
	const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const matchesMobile = useMediaQuery('(max-width:600px)');

  const renderHeadContent = (isMobile) => {
    let comps = [
      <FeaturedPost
        key={"intro"}
        post={{
          title: "线上料理教室",
          subTitle: "活动介绍",
          description: `<p>繁忙都市生活中忙碌的你，是否还在为每日的三餐烦恼？快速、方便、美味的日本速食方便米饭了解一下~</p>
            <p>9月，在日本农林水产省的支援下，（一般社团法人）全日本稻米及相关食品出口促进协议会相邀2位美食博主及4位沪上大厨联手为你带来6场线上料理直播！</p>
            <p>直播现场，在线教你在家就可完成的使用日本富山县产方便米饭制作的快速美味料理！从简单的饭团类料理到精巧的米饭甜品，满足不同料理水平的美食料理爱好者。事先报名入群，直播期间群内回答线上问卷即可有机会获得直播同款料理食材大礼包！ 直播间还将为大家带来足量特惠福利！</p>
            <p>此次活动还邀请日籍大厨开发了6款简单快速操作的料理菜谱！同时还开放平台给热爱料理的你，让你的菜谱有机会与大厨菜谱同台展现！</p>`,
          image: `${require("./1296776134084892302.png")}`,
          imageText: "Image Text",
          subImage: `${require("./1292748164388222750.png")}`,
          ctaText: `美味的日本方便米饭采购请点击下方购物车`,
        }}
      />,
      <Grid item xs={12} md={6} className={classes.rightBanner}>
        <MainFeaturedPost
          post={{
            title: "Title of a longer featured blog post",
            description:
              "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
            image: `${require("./1292751312207193531.png")}`,
            "subImage": `${require("./1292753712257038110.png")}`,
            imgText: "main image description",
            linkText: "Continue reading…",
          }}
        />
      </Grid>,
    ];
    return isMobile ? comps.reverse() : comps;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar} id="back-to-top-anchor">
          {/* <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          ></Typography> */}
          {/* <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Features
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Enterprise
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Support
            </Link>
          </nav>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button> */}
          {matchesMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.herobar}>
          {
            <img
              style={{ display: "none" }}
              src={`${require("./1292745016802146078.png")}`}
              alt={""}
            />
          }
          <Container maxWidth="lg">
            <main>
              <Grid container spacing={4}>
                {renderHeadContent(matchesMobile)}
              </Grid>
            </main>
          </Container>
        </Grid>
      </Grid>

      <Container maxWidth="lg" style={{ overflow: "hidden" }}>
        <Typography
          style={{
            fontFamily: "微软雅黑",
            fontSize: 43,
            color: "rgb(7, 145, 58)",
            fontWeight: 700,
            margin: '30px 0',
          }}
          variant="h5"
          align="center"
          color="textSecondary"
          component="header"
        >
          ​直播活动报名
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.gridLine} style={{marginBottom:  matchesMobile ? 80 : 0,}}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3} className={classes.gridCell}>
                <CardMedia
                  className={classes.chefMedia}
                  image={`${require("./1292780357699478971.png")}`}
                  title=""
                />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.profile}
                  color="textSecondary"
                  component="p"
                >
                  为美味而生
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.subProfile}
                  color="textSecondary"
                  component="p"
                >
                  淘宝美食主播
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 1 : "initial" }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​9月12日
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​20点-21点
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <CardMedia
                      className={classes.qrMedia}
                      image={`${require("./1304258451296679006.jpeg")}`}
                      title=""
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      扫描二维码报名进群
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <DisabledButton
                      variant="contained"
                      size="small"
                      color="primary"
                      className={classes.greenRoundButton}
                    >
                      观看视频
                    </DisabledButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                style={{ order: matchesMobile ? 3 : "initial" }}
              >
                <CardMedia
                  className={classes.chefMedia}
                  style={{backgroundPositionX: 20}}
                  image={`${require("./1299183976695311175.png")}`}
                  title=""
                />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.profile}
                  color="textSecondary"
                  component="p"
                >
                  大宝哎美丽
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.subProfile}
                  color="textSecondary"
                  component="p"
                >
                  抖音美食博主
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                style={{
                  backgroundImage: `url(${require("./qr-title.png")})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 0",
                  textAalign: "center",
                  order: matchesMobile ? 3 : "initial",
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​9月18日
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​20点-21点
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <CardMedia
                      className={classes.qrMedia}
                      image={`${require("./1304258555579659358.jpeg")}`}
                      title=""
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      扫描二维码报名进群
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <DisabledButton
                      variant="contained"
                      size="small"
                      color="primary"
                      className={classes.greenRoundButton}
                    >
                      观看视频
                    </DisabledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.gridLine}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3} className={classes.gridCell}>
                <CardMedia
                  className={classes.chefMedia}
                  image={`${require("./1292787404612543931.png")}`}
                  title=""
                />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.profile}
                  color="textSecondary"
                  component="p"
                >
                  徐璎俊
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.subProfile}
                  color="textSecondary"
                  component="p"
                >
                  杏花楼
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 2 : "initial" }}
              >
                <CardMedia
                  className={classes.liveMedia}
                  image={`${require("./csf.jpg")}`}
                  title=""
                />
                <div className={classes.receipeMenu}>日式叉烧煲仔饭</div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 3 : "initial" }}
              >
                <CardMedia
                  className={classes.liveMedia}
                  image={`${require("./zsmlj.jpg")}`}
                  title=""
                />
                <div className={classes.receipeMenu}>芝士米粒卷</div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                style={{
                  backgroundImage: `url(${require("./qr-title.png")})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 0",
                  textAalign: "center",
                  order: matchesMobile ? 1 : "initial",
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​9月19日
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​20点-21点
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <CardMedia
                      className={classes.qrMedia}
                      image={`${require("./1304258617961528995.jpeg")}`}
                      title=""
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      扫描二维码报名进群
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <DisabledButton
                      variant="contained"
                      size="small"
                      color="primary"
                      className={classes.greenRoundButton}
                    >
                      观看视频
                    </DisabledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.gridLine}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3} className={classes.gridCell}>
                <CardMedia
                  className={classes.chefMedia}
                  image={`${require("./1292805003310135070.png")}`}
                  title=""
                />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.profile}
                  color="textSecondary"
                  component="p"
                >
                  陶锋杰​
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.subProfile}
                  color="textSecondary"
                  component="p"
                >
                  曼己客厨艺研修院
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 2 : "initial" }}
              >
                <CardMedia
                  className={classes.liveMedia}
                  image={`${require("./ygmhb.jpg")}`}
                  title=""
                />
                <div className={classes.receipeMenu}>越光米汉堡</div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 3 : "initial" }}
              >
                <CardMedia
                  className={classes.liveMedia}
                  image={`${require("./ygktdbf.jpg")}`}
                  title=""
                />
                <div className={classes.receipeMenu}>越光卡通蛋包饭</div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                style={{
                  backgroundImage: `url(${require("./qr-title.png")})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 0",
                  textAalign: "center",
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​9月20日
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​20点-21点
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <CardMedia
                      className={classes.qrMedia}
                      image={`${require("./1304258670717498462.jpeg")}`}
                      title=""
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      扫描二维码报名进群
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <DisabledButton
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.greenRoundButton}
                    >
                      观看视频
                    </DisabledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.gridLine}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3} className={classes.gridCell}>
                <CardMedia
                  className={classes.chefMedia}
                  image={`${require("./1292805003551417787.png")}`}
                  title=""
                />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.profile}
                  color="textSecondary"
                  component="p"
                >
                  王翔
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.subProfile}
                  color="textSecondary"
                  component="p"
                >
                  德兴馆
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 2 : "initial" }}
              >
                <CardMedia
                  className={classes.liveMedia}
                  image={`${require("./hfglnrsm.jpg")}`}
                  title=""
                />
                <div className={classes.receipeMenu}>和风咖喱牛肉烧麦</div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 3 : "initial" }}
              >
                <CardMedia
                  className={classes.liveMedia}
                  image={`${require("./yzxmlg.png")}`}
                  title=""
                />
                <div className={classes.receipeMenu}>柚子小米拉糕</div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                style={{
                  backgroundImage: `url(${require("./qr-title.png")})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 0",
                  textAalign: "center",
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​9月26日
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​20点-21点
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <CardMedia
                      className={classes.qrMedia}
                      image={`${require("./1304258726086491811.jpeg")}`}
                      title=""
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      扫描二维码报名进群
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <DisabledButton
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.greenRoundButton}
                    >
                      观看视频
                    </DisabledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.gridLine}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3} className={classes.gridCell}>
                <CardMedia
                  className={classes.chefMedia}
                  image={`${require("./1298206126081676942.png")}`}
                  title=""
                />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.profile}
                  color="textSecondary"
                  component="p"
                >
                  秦卓男
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.subProfile}
                  color="textSecondary"
                  component="p"
                >
                  臻嗪
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 2 : "initial" }}
              >
                <CardMedia
                  className={classes.liveMedia}
                  image={`${require("./mfps.png")}`}
                  title=""
                />
                <div className={classes.receipeMenu}>米饭披萨(配味噌汤)</div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                align="center"
                style={{ order: matchesMobile ? 3 : "initial" }}
              >
                <CardMedia
                  className={classes.liveMedia}
                  image={`${require("./myhbcbf.jpg")}`}
                  title=""
                />
                <div className={classes.receipeMenu} style={{ width: 214 }}>
                  木鱼花包菜包饭(配炸猪排)
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                style={{
                  backgroundImage: `url(${require("./qr-title.png")})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 0",
                  textAalign: "center",
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​9月29日
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      ​20点-21点
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <CardMedia
                      className={classes.qrMedia}
                      image={`${require("./1304258789265306718.jpeg")}`}
                      title=""
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.qrTitle}
                      color="textSecondary"
                      component="p"
                    >
                      扫描二维码报名进群
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <DisabledButton
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.greenRoundButton}
                    >
                      观看视频
                    </DisabledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Grid
        container
        style={{
          backgroundImage: `url(${require("./1292791012674479547.png")})`,
          marginBottom: "-100px",
          height: matchesMobile ? "300px" : "initial",
          alignItems: matchesMobile ? "center" : "initial",
        }}
      >
        <Container
          container
          spacing={1}
          maxWidth="lg"
          style={{ display: "flex" }}
        >
          <Grid item xs={6} sm={3}>
            <CardMedia
              className={classes.strawMedia}
              image={`${require("./straw.png")}`}
              title=""
            />
          </Grid>
          <Grid container item spacing={1} xs={6} sm={9}>
            <Grid
              item
              xs={12}
              sm={4}
              style={{ alignItems: "center", display: "flex" }}
            >
              <Typography
                component="h2"
                variant="h5"
                className={classes.strawTitle}
              >
                供应商采购信息
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{ alignItems: "center", display: "flex" }}
            >
              <a href={matchesMobile ? "./m_zxgm.html" : "./tab/158058"}>
                <RoundGreenButton
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.greenRoundButton}
                  startIcon={<AddShoppingCartIcon />}
                >
                  在线购买
                </RoundGreenButton>
              </a>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{ order: matchesMobile ? -1 : "initial" }}
            >
              <CardMedia
                className={classes.receipeMedia}
                image={`${require("./strawSample.png")}`}
                style={{ backgroundSize: "contain" }}
                title=""
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <div
        style={{
          padding: "40px 0",
          backgroundImage: `url(${require("./1296343136998974247.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 30px",
        }}
      >
        <Container
          maxWidth="lg"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            component="p"
            variant="h5"
            align="center"
            color="secondary" // "initial","inherit","primary","secondary","textPrimary","textSecondary","error"
            className={classes.buttonHead}
            gutterBottom
          >
            富山县产越光方便米饭
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ color: "rgb(255, 69, 0)" }}
          >
            米饭创意菜谱
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            米饭创意菜谱等你来创造哦~
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="lg" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={6}
                sm={tier.title === "Enterprise" ? 12 : 6}
                md={4}
              >
                <div>
                  {/* <CardHeader
                  // title={tier.title}
                  // subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                /> */}
                  <CardContent>
                    <CardMedia
                      className={classes.receipeMedia}
                      image={tier.image}
                      title=""
                    />
                    {/* <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div> */}
                    {/* <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul> */}
                  </CardContent>
                  <CardActions
                    style={{
                      margin: "0 auto",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <a href={tier.link}>
                      <ColorButton
                        fullWidth
                        // variant={tier.buttonVariant}
                        color="primary"
                      >
                        {tier.title} >>
                      </ColorButton>
                    </a>
                  </CardActions>
                </div>
              </Grid>
            ))}
          </Grid>
          <Box
            container
            spacing={5}
            alignItems="center"
            style={{ textAlign: "center", marginTop: 20 }}
          >
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="p"
            >
              更多创意菜谱&创意菜谱提交
            </Typography>
            <a href={matchesMobile ? "m_mf.html" : "./tab/157983/"}>
              <ColorButton
                fullWidth
                size="large"
                style={{ transform: "scale(1.2)", marginTop: 10 }}
                variant="contained"
                color="primary"
              >
                点击进入 >>
              </ColorButton>
            </a>
          </Box>
        </Container>
      </div>
      <Container maxWidth="lg">
        {matchesMobile && (
          <Typography
            style={{
              fontFamily: "微软雅黑",
              fontSize: 22.7513,
              paddingBottom: "30px",
              color: "rgb(7, 145, 58)",
              fontWeight: 700,
              lineHeight: "1.2em",
            }}
            variant="h5"
            align="left"
            color="textSecondary"
            component="header"
          >
            产品介绍
          </Typography>
        )}
        <Grid container spacing={3} component="main">
          <Grid item xs={12} sm={6}>
            <Paper
              style={{
                height: matchesMobile ? 160 : 313,
              }}
              className={classes.paper}
              dangerouslySetInnerHTML={{
                __html: videoPlayer,
              }}
            ></Paper>
          </Grid>
          {!matchesMobile && (
            <Grid item xs={12} sm={2}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <Typography
                    style={{
                      fontFamily: "微软雅黑",
                      fontSize: 43,
                      color: "rgb(7, 145, 58)",
                      fontWeight: 700,
                    }}
                    variant="h5"
                    align="left"
                    color="textSecondary"
                    component="header"
                  >
                    产品介绍
                  </Typography>
                </Grid>
                <Grid item>
                  <CardMedia
                    image={`${require("./arrow.png")}`}
                    title=""
                    style={{
                      width: "100%",
                      height: 73,
                      backgroundSize: "contain",
                      backgroundPosition: "right",
                    }}
                  />
                </Grid>
                <Grid item>
                  <CardMedia
                    image={`${require("./prodIntro.png")}`}
                    title=""
                    style={{
                      height: 200,
                      backgroundSize: "contain",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={4}>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <CardMedia
                  className={classes.bottomHeadlineMedia}
                  image={`${require("./bottomHeadline.png")}`}
                  title=""
                />
              </Grid>
              {matchesMobile && (
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6}>
                      <CardMedia
                        image={`${require("./prodIntro.png")}`}
                        title=""
                        style={{
                          height: 200,
                          backgroundSize: "contain",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Grid container spacing={1} direction="column">
                        <Grid item>
                          <Typography
                            style={{
                              fontFamily: "微软雅黑",
                              fontSize: 20,
                              color: "rgb(7, 145, 58)",
                              fontWeight: 700,
                              lineHeight: "1.2em",
                              marginTop: 50,
                            }}
                            variant="h5"
                            align="left"
                            color="textSecondary"
                            component="header"
                          >
                            富山县产越光方便米饭
                          </Typography>
                        </Grid>
                        <Grid item>
                          <CardMedia
                            image={`${require("./arrow.png")}`}
                            title=""
                            style={{
                              width: "100%",
                              height: 41,
                              backgroundSize: "contain",
                              transform: "rotate(39deg)",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {!matchesMobile && (
                <Grid item>
                  <Typography
                    style={{
                      fontFamily: "微软雅黑",
                      fontSize: 25,
                      color: "rgb(7, 145, 58)",
                      fontWeight: 700,
                      lineHeight: "1.2em",
                    }}
                    variant="h5"
                    align="left"
                    color="textSecondary"
                    component="header"
                  >
                    富山县产越光方便米饭
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <section
                  style={{
                    textIndent: "30px",
                    fontFamily: "微软雅黑",
                    fontSize: "15px",
                    color: "rgb(121, 121, 121)",
                    fontWeight: 400,
                  }}
                >
                  越光方便无菌米饭采用富山县产的免淘洗米、日本名水百选的富山县黑部天然水，制造生产线--利用了清洁蒸汽的瞬间杀菌以及连续煮饭系统。因此，在不使用防腐剂添加剂的情况下，可以做到12个月的保质期。在保持米饭原有风味的情况下，可常温流通及常温保存，利用微波炉加热后就能直接食用，既美味又方便。
                </section>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <SwipeableDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon style={{ fontSize: 30, color: common["white"] }} />
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { p: "首页", l: "#" },
            { p: "米饭创意菜谱", l: "./m_mf.html" },
            { p: "在线购买", l: "./m_zxgm.html" },
          ].map((obj, index) => (
            <ListItem button key={obj.p} style={{ textAlign: "center" }}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText
                primary={obj.p}
                alignitems="center"
                onClick={() => (window.location.href = obj.l)}
              />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        {/* <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
        {/* <Box mt={5}>
          <Copyright />
        </Box> */}
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <AppDownload key={post.date} post={post} />
          ))}
        </Grid>
      </Container>

      <Footer
        title="Footer"
        description="​主办方：（一般社团法人）全日本稻米及相关食品出口促进协议会"
      />
      {/* End footer */}
    </React.Fragment>
  );
}