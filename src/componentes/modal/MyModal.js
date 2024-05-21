import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Button, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: {
    sx: 200,
    sm: 400,
    md: 600,
    lg: 800,
    xl: 1000,
  },
  p: 4,
  backgroundColor: '#FFFFFF',
}

export const MyModal = (props) => {
  return (
    <Modal
      open={props.modalData.isOpen}
      onClose={() =>
        props.handleChangeModal(`${props.actionModal}`, 'isOpen', false)
      }
    >
      <Box sx={styles} style={{ height: `${props.height}px` }}>
        <Grid container spacing={2} style={{ marginBottom: '50px' }}>
          <Grid item xs={6}>
            <span className="fw-bold">
              {props.modalData.title.toUpperCase()}
            </span>
          </Grid>
          <Grid item xs={6}>
            <div style={{ position: 'fixed', right: '40px' }}>
              <Button
                className="bg-light"
                variant="outlined"
                onClick={() =>
                  props.handleChangeModal(props.actionModal, 'isOpen', false)
                }
              >
                <HighlightOffIcon
                  style={{
                    height: '35px',
                    cursor: 'pointer',
                    color: 'black',
                    fontSize: '50px',
                  }}
                  className="text-primary"
                />
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {props.children}
          <div style={{ position: 'fixed', bottom: '20px', right: '40px' }}>
            <Grid item xs={12}>
              {props.idDelete === undefined ? null : (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => props.handleClickDelete(props.idDelete)}
                >
                  <DeleteIcon /> &nbsp; Eliminar
                </Button>
              )}
              &nbsp;&nbsp;
              <Button
                onClick={props.save}
                variant="contained"
                disabled={props.disabled}
              >
                <SaveIcon /> &nbsp;
                {props.action}
              </Button>
            </Grid>
          </div>
        </Grid>
      </Box>
    </Modal>
  )
}
