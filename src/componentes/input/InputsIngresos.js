import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import React from 'react'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import { InputsActivos } from './InputsActivos'

export const InputsIngresos = ({
  checkedIngresoAutomatico,
  handleCheckboxClickIngresoAutomatico,
  ingreso,
  handleChangeIngreso,
  allDestino,
  checkedSwitch,
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
      {checkedSwitch ? (
        <>
          <Paper
            elevation={5}
            className="p-3 bg-card-ingresos "
            style={{ backgroundColor: checkedSwitch ? '#e6f8e5' : '#f8e6e2' }}
          >
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedIngresoAutomatico}
                      onChange={handleCheckboxClickIngresoAutomatico}
                      name="gilad"
                    />
                  }
                  label={
                    <>
                      <AccessTimeFilledIcon /> Ingreso Automático
                    </>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    id="datetime-local"
                    label={
                      <>
                        <AccessTimeFilledIcon /> Ingreso Manual
                      </>
                    }
                    type="datetime-local"
                    name="marcaTemporal"
                    value={ingreso?.marcaTemporal}
                    onChange={handleChangeIngreso}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={checkedIngresoAutomatico ? true : false}
                  />
                </FormControl>
              </Grid>

              {allDestino == undefined ? null : (
                <>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Destino
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        size="small"
                        id="demo-simple-select"
                        name="destinoId"
                        value={ingreso?.destinoId}
                        label="Experiencia"
                        onChange={handleChangeIngreso}
                      >
                        {allDestino &&
                          allDestino.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                              {item.nombre}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="motivo"
                    label="Motivo de la visita"
                    type="text"
                    value={ingreso?.motivo}
                    onChange={handleChangeIngreso}
                    multiline
                    rows={2}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    label="Placa"
                    type="text"
                    name="placa"
                    value={ingreso?.placa}
                    onChange={handleChangeIngreso}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    label="Cantidad de menores"
                    type="number"
                    name="menores"
                    value={ingreso?.menores}
                    onChange={handleChangeIngreso}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    label="Cantidad de mayores"
                    type="number"
                    name="mayores"
                    value={ingreso?.mayores}
                    onChange={handleChangeIngreso}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    label="Cantidad de mascotas"
                    type="number"
                    name="mascotas"
                    value={ingreso?.mascotas}
                    onChange={handleChangeIngreso}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="observaciones"
                    label="Observaciones"
                    type="text"
                    value={ingreso?.observaciones}
                    onChange={handleChangeIngreso}
                    multiline
                    rows={2}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <InputsActivos
              setChecked={setChecked}
              checked={checked}
              handleCheckboxClick={handleCheckboxClick}
              addInputActivo={addInputActivo}
              inputsActivos={inputsActivos}
              handleInputActivoChange={handleInputActivoChange}
              tipoActivo={tipoActivo}
              checkedSwitch={checkedSwitch}
            />
          </Paper>
        </>
      ) : (
        <>
          <Paper
            elevation={5}
            className="p-3 bg-card-ingresos mt-1"
            style={{ backgroundColor: checkedSwitch ? '#e6f8e5' : '#f8e6e2' }}
          >
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedIngresoAutomatico}
                      onChange={handleCheckboxClickIngresoAutomatico}
                      name="gilad"
                    />
                  }
                  label={
                    <>
                      <AccessTimeFilledIcon /> Salida Automática
                    </>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    id="datetime-local"
                    label={
                      <>
                        <AccessTimeFilledIcon /> Salida Manual
                      </>
                    }
                    type="datetime-local"
                    name="marcaTemporal"
                    value={ingreso?.marcaTemporal}
                    onChange={handleChangeIngreso}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={checkedIngresoAutomatico ? true : false}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    label="Placa"
                    type="text"
                    name="placa"
                    value={ingreso?.placa}
                    onChange={handleChangeIngreso}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <InputsActivos
              setChecked={setChecked}
              checked={checked}
              handleCheckboxClick={handleCheckboxClick}
              addInputActivo={addInputActivo}
              inputsActivos={inputsActivos}
              handleInputActivoChange={handleInputActivoChange}
              tipoActivo={tipoActivo}
              checkedSwitch={checkedSwitch}
            />
          </Paper>
        </>
      )}
    </>
  )
}
