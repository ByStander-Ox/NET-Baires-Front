import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
// import Script from 'react-load-script'
import { loading, ready, setMemberDetail } from "../../store/loading/actions";
import SideMenu from "./Menu/SideMenu";
import { loadScript, loadStyles } from "../../services/helpers/scriptshelpers";
import { AppState } from "../../store";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";
import { infoToast } from "../../services/toastServices";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  subscribeMemberNotification,
  subscribeUpdateEventInformationSync,
} from "../../services/syncCommunicationServices";
import { getMe } from "../../services/profileServices";
import { DialogInstallPwa } from "../InstallPwa/DialogInstallPwa";
import { TopBar } from "./Menu/TopBar";
import { Member } from "../../services/models/Member";
import { useHistory } from "react-router-dom";
interface AppProps {
  isLoading: boolean;
  loading: () => void;
  ready: () => void;
  setMemberDetail: (member: Member) => void;
}
const AdminWrapperComponent: React.SFC<AppProps> = ({
  children,
  setMemberDetail,
  ...props
}) => {
  const { user, setUserDetail } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  useEffect(() => {
    loadScript("assets/js/vendor-all.min.js");
    loadScript("assets/js/bootstrap.min.js");
    loadScript("assets/js/pcoded.js");
    loadStyles("assets/css/style-app.css");
  });

  useEffect(() => {
    getMe().then((x) => {
      setUserDetail(x);
      setMemberDetail(x);
    });
    subscribeMemberNotification(user.userId, (data) => {
      infoToast(data.notificationMessage, () => {
        if (data.url != null) history.push(data.url);
      });
    });
  }, []);

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
      <TopBar
        onClick={() => setOpen(false)}
        openMenu={() => setOpen(true)}
      ></TopBar>
      <div className="pcoded-main-container">
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
                <div className="page-wrapper" onClick={() => setOpen(false)}>
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
      <DialogInstallPwa></DialogInstallPwa>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.loading.isLoading,
});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  },
  setMemberDetail: (member: Member) => {
    dispatch(setMemberDetail(member));
  },
});

export const AdminWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminWrapperComponent);

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
