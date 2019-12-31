import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
// import Script from 'react-load-script'
import { loading, ready } from "../../store/loading/actions";
import SideMenu from "./Menu/SideMenu";
import FriendsMenu from "./Menu/FriendsMenu";
import TopBar from "./Menu/TopBar";
import { loadScript, loadStyles } from "../../services/helpers/scriptshelpers";
import ReactTooltip from "react-tooltip";
import LoadingOverlay from "react-loading-overlay";
import { AppState } from "../../store";
import { ToastContainer } from 'react-toastify';
import { subscribe, CommunicationMessageType, subscribeGeneral, MemberNotification } from '../../services/communicationServices';
import { UserContext } from '../../contexts/UserContext';
import { infoToast } from '../../services/toastServices';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { BreadcrumbsComponent } from '../Header/BreadcrumbsComponent';
import { subscribeMemberNotification } from '../../services/syncCommunicationServices';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);
interface AppProps {
  isLoading: boolean;
  loading: () => void;
  ready: () => void;
}
const AdminWrapperComponent: React.SFC<AppProps> = ({ children, ...props }) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const classesDrawer = useStylesDrawer();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadScript("assets/js/vendor-all.min.js");
    loadScript("assets/plugins/bootstrap/js/bootstrap.min.js");
    loadScript("assets/js/pcoded.js");
    loadStyles("assets/css/style-app.css");
  });

  useEffect(() => {
    subscribeMemberNotification(user.id, data => {
      infoToast(data.notificationMessage)
    })
  }, [])

  return (
    <>
      {/* 
      <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill"></div>
        </div>
      </div> */}
      {/* <SideMenu></SideMenu>
      <TopBar></TopBar>
      <FriendsMenu></FriendsMenu> */}
      <TopBar openMenu={() => setOpen(true)}></TopBar>
      <div className="pcoded-main-container" onClick={() => setOpen(false)}>
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="page-header">
                <div className="page-block">
                  <div className="row align-items-center">
                    <div className="col-md-12">
                      {/* <BreadcrumbsComponent></BreadcrumbsComponent> */}
                      {/* <div className="page-header-title">
                                            <h5 className="m-b-10">Sample Page</h5>
                                        </div>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                                            <li className="breadcrumb-item"><a href="#!">Sample Page</a></li>
                                        </ul> */}
                    </div>
                  </div>
                </div>
              </div>
              <CssBaseline />

              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >

                <SideMenu closeMenu={() => setOpen(false)}></SideMenu>
              </Drawer>
              <div className="main-body">
                <div className="page-wrapper">

                  {/* <LoadingOverlay
                    active={props.isLoading}
                    spinner
                    clasName="row"
                    text="Procesando..."
                  // tslint:disable-next-line: indent
                  > */}
                  {children}
                  <Backdrop
                    className={classes.backdrop}
                    open={props.isLoading}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  {/* </LoadingOverlay> */}
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.loading.isLoading
});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const AdminWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminWrapperComponent);


const drawerWidth = 240;

const useStylesDrawer = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);