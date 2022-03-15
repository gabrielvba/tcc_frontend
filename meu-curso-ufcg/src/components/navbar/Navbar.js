import { useHistory } from 'react-router';
import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import MenuIcon from '../icons/iconMenu';
import ProfileIcon from '../icons/iconProfile';
import AngleLeftIcon from '../icons/iconAngleLeft';
import UsersIcon from '../icons/iconUsers';
import SearchIcon from '../icons/iconSearch';
import DiagramIcon from '../icons/iconDiagram';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& header.MuiAppBar-root': {
      backgroundColor: '#3F72AF',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
    color: '#F9F7F7',
  },
  button: {
    color: '#F9F7F7',
  },
  avatar: {
    backgroundColor: '#F9F7F7',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#3112D4E',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

function Navbar({ children }) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await localStorage.removeItem('meu_curso_token');
    history.push('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon color="#F9F7F7" />
          </IconButton>
          <Typography variant="h5" className={classes.title} noWrap>
            Minha Graduação
          </Typography>
          <IconButton color="inherit" aria-label="profile" onClick={() => history.push('/profile')}>
            <Avatar className={classes.avatar}>
              <ProfileIcon size="1x" color="#112D4E" />
            </Avatar>
          </IconButton>
          <Button color="inherit" className={classes.button} onClick={logout}>
            SAIR
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <MenuIcon color="#F9F7F7" />
            ) : (
              <AngleLeftIcon color="#112D4E" />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="fluxograma" onClick={() => history.push('/schoolrecords')}>
            <ListItemIcon>
              <DiagramIcon />
            </ListItemIcon>
            <ListItemText primary="Histórico acadêmico" />
          </ListItem>
          <ListItem button key="users" onClick={() => history.push('/disciplines')}>
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary="Disciplinas" />
          </ListItem>
          <ListItem button key="preMatricula" onClick={() => history.push('/search')}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar curso" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Navbar;
