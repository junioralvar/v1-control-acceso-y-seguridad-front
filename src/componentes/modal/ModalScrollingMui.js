// NAME COMPONENTE = Scrolling long content - MUI V5.15.11
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Grid } from '@mui/material'

import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />
})
const TransitionSecond = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

export const ModalScrollMui = ({
  titleModal,
  titleButton,
  children,
  open,
  setOpen,
  save,
  disabled,
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{titleModal}</DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid container spacing={3}>
              {children}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancelar</Button>
          <Button onClick={save} variant="contained" disabled={disabled}>
            {titleButton}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export const ModalScrollMuiSecond = ({
  titleButton,
  titleModal,
  children,
  disabled,
  setOpen,
  open,
  save,
}) => {
  const handleClose = () => {
    setOpen(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Para un desplazamiento suave
    })
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        TransitionComponent={TransitionSecond}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{titleModal}</DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid container spacing={3}>
              {children}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atras</Button>
          <Button onClick={save} variant="contained" disabled={disabled}>
            {titleButton}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
