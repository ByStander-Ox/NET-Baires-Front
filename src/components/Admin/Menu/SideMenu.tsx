import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { syncEvents } from "../../../services/eventsServices";
import { SecureElement } from '../../Auth/SecureElement';
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import CropFreeIcon from '@material-ui/icons/CropFree';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { ListItemAvatar } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import EventIcon from '@material-ui/icons/Event';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
type SideMenuProps = {
  closeMenu: () => void;
};

export const SideMenu: React.SFC<SideMenuProps> = ({ closeMenu }) => {
  const [] = useState(false);
  const classes = useStyles()
  const [openEvents, setOpenEvents] = React.useState(false)
  // useEffect(() => {
  //   if (lastLocation != null && location.pathname != lastLocation.pathname)
  //     closeMenu();
  // });
  const handleSyncEvents = () => {
    syncEvents().then(() => { });
  };
  return (

    <List component="nav" className={`${classes.appMenu} side-menu-container`} disablePadding>
      <ListItem onClick={closeMenu} button className={classes.menuItem}>

        <ListItemAvatar>
          <img src="assets/images/Logo-Blanco.png" className="side-menu-logo" alt="NET-Baires" />
        </ListItemAvatar>
        <ListItemText primary="NET-Baires" />
        <ListItemIcon className={`${classes.menuItemIcon} side-menu-close`}>
          <ChevronLeftIcon />
        </ListItemIcon>
      </ListItem>
      <Divider component="li" />
      <SecureElement roles={["Admin", "Organizer"]}>

        <NavLink
          exact
          className="nav-link-slide-bar"
          activeClassName="active"
          to="/app/panel"
        >
          <ListItem onClick={closeMenu} button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconDashboard />
            </ListItemIcon>
            <span className="pcoded-mtext">Panel de Control</span>
          </ListItem>

        </NavLink>
      </SecureElement>
      <SecureElement roles={["Member"]}>
        <NavLink
          exact
          className="nav-link-slide-bar"
          activeClassName="active"
          to="/app/panel"
        >
          <ListItem onClick={closeMenu} button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconDashboard />
            </ListItemIcon>
            <ListItemText primary="Panel de Control" />
          </ListItem>
        </NavLink>

      </SecureElement>

      <SecureElement roles={["Admin"]}>
        <NavLink
          exact
          className="nav-link-slide-bar"
          activeClassName="active"
          to="/app/sponsors"
        >
          <ListItem onClick={closeMenu} button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Sponsors" />
          </ListItem>
        </NavLink>
        <NavLink
          exact
          className="nav-link-slide-bar"
          activeClassName="active"
          to="/app/badges"
        >
          <ListItem onClick={closeMenu} button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <LoyaltyIcon />
            </ListItemIcon>
            <ListItemText primary="Badges" />
          </ListItem>
        </NavLink>
        {/* <NavLink
          exact
          className="nav-link-slide-bar"
          activeClassName="active"
          to="/app/badges/assign"
        >
          <ListItem button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <LoyaltyIcon />
            </ListItemIcon>
            <ListItemText primary="Asignar Badge" />
          </ListItem>
        </NavLink> */}
        <NavLink
          exact
          className="nav-link-slide-bar"
          activeClassName="active"
          to="/app/members"
        >
          <ListItem onClick={closeMenu} button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Miembros" />
          </ListItem>
        </NavLink>

        <ListItem button onClick={() => setOpenEvents(!openEvents)} className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Eventos" />
          {openEvents ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>
        <Collapse in={openEvents} timeout="auto" unmountOnExit>
          <Divider />
          <List onClick={closeMenu} component="div" disablePadding>
            <NavLink
              exact
              activeClassName="active"
              to="/app/events"
            >
              <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Mis Eventos" />
              </ListItem>
            </NavLink>
            <ListItem button className={classes.menuItem}>
              <NavLink
                exact
                activeClassName="active"
                to="/app/eventsToSync"
              >
                <ListItemText inset primary="Eventos para Sincronizar" />
              </NavLink>
            </ListItem>
            <ListItem button className={classes.menuItem}>
              <NavLink
                exact
                activeClassName="active"
                to="/app/events/live"
              >
                <ListItemText inset primary="Eventos en vivo" />
              </NavLink>
            </ListItem>
            <ListItem button className={classes.menuItem}>
              <a
                className="nav-link-slide-bar"
                onClick={handleSyncEvents}
              >

                <ListItemText inset primary="Sync Eventos" />
              </a>
            </ListItem>

          </List>
        </Collapse>

      </SecureElement>

      <SecureElement roles={["Admin", "Organizer"]}>
        <ListItem onClick={closeMenu} button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <CropFreeIcon />
          </ListItemIcon>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/app/EventLive/Attendances"
          >
            <ListItemText primary="Recibir Miembros" />
          </NavLink>
        </ListItem>
      </SecureElement>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <ExitToAppIcon />
        </ListItemIcon>
        <NavLink
          exact
          className="nav-link-slide-bar"
          activeClassName="active"
          to="/logout"
        >
          <ListItemText primary="Desconectarse" />
        </NavLink>
      </ListItem>
    </List>


  );
};
export default SideMenu;

const drawerWidth = 240

const useStyles = makeStyles(() =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)
