import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DoorSlidingIcon from '@mui/icons-material/DoorSliding'
import BusinessIcon from '@mui/icons-material/Business'
import FlagIcon from '@mui/icons-material/Flag'
import { Evento } from '../../interfaces/Evento'
import { Puertas } from '../../interfaces/Puertas'
import { Destino } from '../../interfaces/Destino'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export const TabMui = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab
            icon={<BusinessIcon />}
            iconPosition="start"
            label="Eventos"
            {...a11yProps(0)}
          />
          <Tab
            icon={<DoorSlidingIcon />}
            iconPosition="start"
            label="Puertas"
            {...a11yProps(1)}
          />
          <Tab
            icon={<FlagIcon />}
            iconPosition="start"
            label="Destinos"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Evento />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Puertas />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Destino />
      </CustomTabPanel>
    </Box>
  )
}
