import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SnackbarAlert = ({
  contentMessage,
  open,
  handleClose,
  severity,
  autoHideDuration,
  children,
}) => {
  //   const [open, setOpen] = React.useState(false)

  //   const handleClick = () => {
  //     setOpen(true)
  //   }

  //   const handleClose = (event, reason) => {
  //     if (reason === 'clickaway') {
  //       return
  //     }
  //     setOpen(false)
  //   }

  return (
    <Stack>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {contentMessage}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
