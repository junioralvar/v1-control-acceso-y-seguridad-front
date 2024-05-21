import { Alert, Stack } from '@mui/material'
import React from 'react'

export const AlertFillets = ({ severity, text }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={0} className="pb-1">
      <Alert severity={severity || 'info'}>{text}</Alert>
    </Stack>
  )
}
