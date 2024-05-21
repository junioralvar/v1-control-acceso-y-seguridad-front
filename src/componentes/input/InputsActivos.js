import { Checkbox, Paper, Fab, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { TextField } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row } from 'react-bootstrap'
import { ModalScrollMui } from '../modal/ModalScrollingMui'

export const InputsActivos = ({
  checked,
  setChecked,
  handleCheckboxClick,
  addInputActivo,
  inputsActivos,
  handleInputActivoChange,
  tipoActivo,
}) => {
  return (
    <>
      <Row style={{ marginBottom: '-15px' }}>
        <Col xxl={12}>
          ¿Tiene activos?
          <Checkbox checked={checked} onClick={handleCheckboxClick} />
        </Col>
      </Row>

      <ModalScrollMui
        titleModal="Agregar Activos"
        titleButton="Guardar"
        open={checked}
        setOpen={setChecked}
        save={(e) => setChecked(false)}
      >
        <Grid item xs={12} className="mb-3">
          <FormControl fullWidth>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={addInputActivo}
              disabled={checked ? false : true}
            >
              <AddIcon />
            </Fab>
          </FormControl>
        </Grid>

        {inputsActivos &&
          inputsActivos.map((item, index) => (
            <div key={index} style={{ paddingLeft: '50px' }}>
              <Row>
                <Col xxl={12}>
                  <FormControl sx={{ minWidth: 170 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Tipo de Activo
                    </InputLabel>
                    <Select
                      name="tipoActivoId"
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Tipo de Activo"
                      required
                      onChange={(e) =>
                        handleInputActivoChange(
                          index,
                          'tipoActivoId',
                          e.target.value
                        )
                      }
                      value={item.tipoActivoId}
                      disabled={checked ? false : true}
                    >
                      {tipoActivo.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.valor}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <TextField
                    size="small"
                    name="marca"
                    id="filled-search"
                    label="Marca"
                    type="text"
                    variant="outlined"
                    value={item.marca}
                    onChange={(e) =>
                      handleInputActivoChange(index, 'marca', e.target.value)
                    }
                    disabled={checked ? false : true}
                  />
                </Col>
                <Col>
                  <TextField
                    size="small"
                    name="modelo"
                    id="filled-search"
                    label="Modelo"
                    type="text"
                    variant="outlined"
                    value={item.modelo}
                    onChange={(e) =>
                      handleInputActivoChange(index, 'modelo', e.target.value)
                    }
                    disabled={checked ? false : true}
                  />
                </Col>
                <Col>
                  {' '}
                  <TextField
                    size="small"
                    name="serie"
                    id="filled-search"
                    label="Serie"
                    type="text"
                    variant="outlined"
                    value={item.serie}
                    onChange={(e) =>
                      handleInputActivoChange(index, 'serie', e.target.value)
                    }
                    disabled={checked ? false : true}
                  />
                </Col>
                <Col>
                  <TextField
                    size="small"
                    name="codActivo"
                    id="filled-search"
                    label="Codigo de Activo"
                    type="text"
                    variant="outlined"
                    value={item.codActivo}
                    onChange={(e) =>
                      handleInputActivoChange(
                        index,
                        'codActivo',
                        e.target.value
                      )
                    }
                    disabled={checked ? false : true}
                  />
                </Col>
              </Row>

              <hr />
            </div>
          ))}
      </ModalScrollMui>
    </>
  )
}
