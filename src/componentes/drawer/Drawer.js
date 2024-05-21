import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import MapIcon from '@mui/icons-material/Map'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import './Drawer.css'
import { MenuPrincipal } from '../../interfaces/MenuPrincipal'
import { Registros } from '../../interfaces/Registros'
import { Puertas } from '../../interfaces/Puertas'
import logo from './../../archivos/logo.jpg'
import linea from './../../archivos/linea.png'
import { Monitor } from '../../interfaces/Monitor'
import { useState } from 'react'
import security from '../archivos/security-guard.png'
import { useEffect } from 'react'
import { Destino } from '../../interfaces/Destino'
import AssessmentIcon from '@mui/icons-material/Assessment'
import { Reporte } from '../../interfaces/Reporte'
import { Evento } from '../../interfaces/Evento'
import EventNoteIcon from '@mui/icons-material/EventNote'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export const MyDrawer = ({ nombreUsuario, handleClickCerrarSesion }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [opcion, setOpcion] = useState('Menu Principal')

  useEffect(() => {}, [])
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={4}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <img
              src={logo}
              alt="logo"
              style={{ width: '50px', marginRight: '1px' }}
            />
            &nbsp; CAS
            <img
              src={linea}
              alt="linea"
              style={{ width: '50px', marginRight: '1px' }}
            />
            <span>Evento:</span>{' '}
            <strong>{localStorage.getItem('valorEvento')}</strong> &nbsp;
            <img
              src={linea}
              alt="linea"
              style={{ width: '50px', marginRight: '1px' }}
            />
            <span>Puerta:</span>{' '}
            <strong>{localStorage.getItem('valorPuerta')}</strong>
          </Typography>
          <Box sx={{ flexGrow: 1 }}> </Box>
          <span className="text-dark ">
            <img src={security} alt="logo" style={{ height: '35px' }} />
            <strong>{localStorage.getItem('user')}</strong>
          </span>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon style={{ color: 'white' }} />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          {/* MENU PRINCIPAL */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => setOpcion('Menu Principal')}
            className={opcion === 'Menu Principal' ? 'selected-option' : ''}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <HomeIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                className="text-hover"
                primary="Menu Principal"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* Registros */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => setOpcion('Registros')}
            className={opcion === 'Registros' ? 'selected-option' : ''}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <BorderColorIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                className="text-hover"
                primary="Registros"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* AREAS */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => setOpcion('Monitor')}
            className={opcion === 'Monitor' ? 'selected-option' : ''}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MyLocationIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                className="text-hover"
                primary="Monitor"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* PUERTAS */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => setOpcion('Puertas')}
            className={opcion === 'Puertas' ? 'selected-option' : ''}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MeetingRoomIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                className="text-hover"
                primary="Puertas"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => setOpcion('Destino')}
            className={opcion === 'Destino' ? 'selected-option' : ''}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MapIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                className="text-hover"
                primary="Destino"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => setOpcion('Reporte')}
            className={opcion === 'Reporte' ? 'selected-option' : ''}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <AssessmentIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                className="text-hover"
                primary="Reporte Diario"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => setOpcion('Evento')}
            className={opcion === 'Evento' ? 'selected-option' : ''}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <EventNoteIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                className="text-hover"
                primary="Eventos"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <hr />
        <List>
          {/* SALIR*/}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={handleClickCerrarSesion}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ExitToAppIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                className="text-hover"
                primary="Cerrar Sesión"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {opcion == 'Menu Principal' && <MenuPrincipal />}
        {opcion == 'Registros' && <Registros />}
        {opcion == 'Monitor' && <Monitor />}
        {opcion == 'Puertas' && <Puertas />}
        {opcion == 'Evento' && <Evento />}
        {opcion == 'Destino' && <Destino />}
        {opcion == 'Reporte' && <Reporte />}
      </Box>
    </Box>
  )
}
