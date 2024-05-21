import {
  Checkbox,
  Paper,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row } from 'react-bootstrap'

export const InputsIngresos = ({
  checkedIngresoAutomatico,
  handleCheckboxClickIngresoAutomatico,
  ingreso,
  handleChangeIngreso,
  allDestino,
}) => {
  const handleAutocompleteChange = (event, newValue) => {
    const destinoId = allDestino.find((item) => item.nombre == newValue)?.id
    handleChangeIngreso({ target: { name: 'destinoId', value: destinoId } })
  }
  return (
    <>
      <Paper elevation={5} className="p-4 bg-card-ingresos mt-1">
        <Row>
          <Col xxl={4}>
            <Typography className=" fw-bold">Horario de ingreso</Typography>
            <Checkbox
              checked={checkedIngresoAutomatico}
              onClick={handleCheckboxClickIngresoAutomatico}
            />
            Automático
          </Col>
          <Col xxl={4}>
            <TextField
              size="small"
              id="datetime-local"
              label="Marca Temporal"
              type="datetime-local"
              name="marcaTemporal"
              value={ingreso?.marcaTemporal}
              onChange={handleChangeIngreso}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={checkedIngresoAutomatico ? true : false}
            />
          </Col>
          <Col xxl={4}>
            {allDestino == undefined ? null : (
              <Autocomplete
                size="small"
                options={allDestino}
                getOptionLabel={(option) => option.nombre}
                onInputChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField {...params} label="Destino" variant="outlined" />
                )}
              />
            )}
          </Col>
        </Row>

        <Row>
          <Col xxl={12}>
            <TextField
              fullWidth
              className="pe-4 ps-1"
              name="motivo"
              id="filled-search"
              label="Motivo de la visita"
              type="text"
              variant="outlined"
              value={ingreso?.motivo}
              onChange={handleChangeIngreso}
            />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xxl={4}>
            <TextField
              size="small"
              name="placa"
              id="filled-search"
              label="Placa"
              type="number"
              variant="outlined"
              value={ingreso?.placa}
              onChange={handleChangeIngreso}
            />
          </Col>
          <Col xxl={4}>
            <TextField
              size="small"
              name="menores"
              id="filled-search"
              label="Cantidad de menores"
              type="number"
              variant="outlined"
              value={ingreso?.menores}
              onChange={handleChangeIngreso}
            />
          </Col>
          <Col xxl={4}>
            {' '}
            <TextField
              size="small"
              name="mascotas"
              id="filled-search"
              label="Cantidad de mascotas"
              type="number"
              variant="outlined"
              value={ingreso?.mascotas}
              onChange={handleChangeIngreso}
            />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xxl={12}>
            <TextField
              className="pe-4 ps-1"
              fullWidth
              id="outlined-multiline-static"
              label="Observaciones"
              multiline
              variant="outlined"
              name="observaciones"
              value={ingreso?.observaciones}
              onChange={handleChangeIngreso}
            />
          </Col>
        </Row>
      </Paper>
    </>
  )
}
