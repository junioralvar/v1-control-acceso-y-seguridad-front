import { Checkbox } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { InputLabel } from '@mui/material'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { Paper } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row } from 'react-bootstrap'

export const InputsSalidas = ({
  checkedSalidaAutomatica,
  handleCheckboxClickSalidaAutomatica,
  salida,
  handleChangeSalida,
}) => {
  return (
    <>
      <Paper elevation={5} className="p-4 bg-card-ingresos mt-1">
        <Row>
          <Col xxl={6}>
            <Typography className=" fw-bold">Horario de Salida</Typography>
            <Checkbox
              checked={checkedSalidaAutomatica}
              onClick={handleCheckboxClickSalidaAutomatica}
            />
            Automático
          </Col>
          <Col xxl={6}>
            <TextField
              size="small"
              id="datetime-local"
              label="Seleccione Fecha"
              type="datetime-local"
              name="marcaTemporal"
              value={salida?.marcaTemporal}
              onChange={handleChangeSalida}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={checkedSalidaAutomatica ? true : false}
            />
          </Col>
        </Row>
        <Row>
          <Col xxl={12}>
            <TextField
              fullWidth
              className="pe-4 "
              id="outlined-multiline-static"
              label="Observaciones"
              multiline
              variant="outlined"
              name="observaciones"
              value={salida?.observaciones}
              onChange={handleChangeSalida}
            />
          </Col>
        </Row>
      </Paper>
    </>
  )
}
