import * as React from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import LogoutIcon from '@mui/icons-material/Logout'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(${(<MeetingRoomIcon />)})`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(${(<MeetingRoomIcon />)})`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}))

export const MySwtich = ({ handleCheckboxClickSwitch, checkedSwitch }) => {
  return (
    <FormGroup className="px-3" style={{ marginTop: '-8px' }}>
      <div className={checkedSwitch ? 'text-success' : 'text-danger'}>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              onClick={handleCheckboxClickSwitch}
            />
          }
        />
        {checkedSwitch ? <MeetingRoomIcon /> : <LogoutIcon />}
        {checkedSwitch ? <>Ingresos</> : <>Salidas</>}
      </div>
    </FormGroup>
  )
}
