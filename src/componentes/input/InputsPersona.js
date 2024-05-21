import { Backdrop, CircularProgress, FormControl, Grid } from '@mui/material'
import { Select } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { MenuItem } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Paper } from '@mui/material'
import { CameraComponent } from '../camara/MyCamara'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PERSONA_MODEL } from '../../const'

export const InputsPersona = ({
  checkedEsColegiado,
  setPersona,
  handleChangePersona,
  tipoDocumento,
  setBuscarDocumento,
  buscarDocumento,
  findAllPersonaDocumento,
  persona,
  checkedSwitch,
  pathRelativo,
  setPathRelativo,
  setControlPayload,
  setFotoTomada,
  setTipoDocumentoId,
  tipoDocumentoId,
  enlistado,
  isLoading,
  data,
  responseBusqueda,
}) => {
  const handleKeyPress = (event) => {
    setPersona({ ...PERSONA_MODEL })
    if (event.key === 'Enter') {
      findAllPersonaDocumento()
    }
  }

  return (
    <>
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <Paper
        elevation={5}
        className="p-4 bg-card-ingresos"
        style={{ backgroundColor: checkedSwitch ? '#e6f8e5' : '#f8e6e2' }}
      >
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-select-small-label">
                Tipo Documento
              </InputLabel>
              <Select
                size="small"
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Tipo Documento"
                required
                name="tipoDocumentoId"
                onChange={(e) => setTipoDocumentoId(e.target.value)}
                value={tipoDocumentoId}
                disabled={checkedEsColegiado ? true : false}
              >
                {tipoDocumento.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.valor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                autoFocus={true}
                onKeyDown={handleKeyPress}
                onChange={(e) => setBuscarDocumento(e.target.value)}
                id="filled-search"
                label={'Nro Documento'}
                type="number"
                variant="outlined"
                name={'nroDoc'}
                value={buscarDocumento}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Button
                variant="contained"
                color="info"
                className="pt-2"
                onClick={findAllPersonaDocumento}
                disabled={
                  buscarDocumento.length >= 8 && buscarDocumento.length <= 12
                    ? false
                    : true
                }
              >
                <PersonSearchIcon />
                &nbsp;Buscar
              </Button>
            </FormControl>
          </Grid>
          <hr />

          {responseBusqueda ? (
            <Grid
              item
              xs={12}
              style={{
                fontSize: '13px',
              }}
            >
              {responseBusqueda}
            </Grid>
          ) : null}

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-select-small-label">
                Tipo Documento
              </InputLabel>
              <Select
                size="small"
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Tipo Documento"
                required
                name="tipoDocumentoId"
                onChange={handleChangePersona}
                value={persona?.tipoDocumentoId}
              >
                {tipoDocumento.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.valor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                name="nroDoc"
                id="filled-search"
                label="Nro Documento"
                type="text"
                variant="outlined"
                value={persona?.nroDoc}
                onChange={handleChangePersona}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                name="cip"
                id="filled-search"
                label="Nro CIP"
                type="text"
                variant="outlined"
                value={persona?.cip}
                onChange={handleChangePersona}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                name="nombres"
                id="filled-search"
                label="Nombres"
                type="text"
                variant="outlined"
                value={persona?.nombres}
                onChange={handleChangePersona}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                name="paterno"
                id="filled-search"
                label="Apellido Paterno"
                type="text"
                variant="outlined"
                value={persona?.paterno}
                onChange={handleChangePersona}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                name="materno"
                id="filled-search"
                label="Apellido Materno"
                type="text"
                variant="outlined"
                value={persona?.materno}
                onChange={handleChangePersona}
              />
            </FormControl>
          </Grid>

          {checkedSwitch ? (
            <>
              <CameraComponent
                pathRelativo={pathRelativo}
                setPathRelativo={setPathRelativo}
                setControlPayload={setControlPayload}
                setFotoTomada={setFotoTomada}
                enlistado={enlistado}
                data={data}
              />
            </>
          ) : null}
        </Grid>
      </Paper>
    </>
  )
}
