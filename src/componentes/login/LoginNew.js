import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import logoPortada from '../archivos/logo_portada.png'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import casImg from '../archivos/casImg3.webp'
import { API_URL } from '../../const'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      className="text-white"
    >
      {`Copyright © ${new Date().getFullYear()} Área de Tecnologías de la Información - `}
      <Link
        color="inherit"
        href="https://cdlima.org.pe/acerca-del-cdlima/"
        target="_blank"
      >
        CIP CD LIMA.
      </Link>{' '}
      {' Todos los derechos reservados.'}
    </Typography>
  )
}

const defaultTheme = createTheme()

export const LoginNew = ({
  tipoDocumentoId,
  setTipoDocumentoId,
  nroDoc,
  setNroDoc,
  pass,
  setPass,
  handleLogin,
}) => {
  const [auxData, setAuxData] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin()
    }
  }

  useEffect(() => {
    const findAuxData = async () => {
      try {
        const endpoint = `/aux/find-all`
        const { data } = await axios.get(API_URL + endpoint, {
          headers: { Authorization: localStorage.getItem('miToken') },
        })
        setAuxData(data)
      } catch (error) {
        alert(error.response.data.mensaje)
      }
    }
    findAuxData()
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            // backgroundImage: `url(${casImg})`,${casImg}
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${casImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ backgroundColor: '#940100' }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={logoPortada} alt="logo" className="img-fluid" />
            <Typography
              component="h1"
              variant="h5"
              className="text-white my-4 fw-bold"
            >
              CONTROL DE ACCESO Y SEGURIDAD
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: 'white' }}
                >
                  Tipo de Documento
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="tipoDocumentoId"
                  value={tipoDocumentoId}
                  label="Tipo de Documento"
                  onChange={(e) => setTipoDocumentoId(e.target.value)}
                  style={{ color: 'white' }}
                >
                  {auxData &&
                    auxData.tipoDocumento.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.valor}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                label="N° Documento"
                autoFocus
                variant="filled"
                value={nroDoc}
                onChange={(e) => setNroDoc(e.target.value)}
                InputLabelProps={{
                  style: { color: 'white' }, // Aquí estableces el color blanco
                }}
                inputProps={{
                  style: { color: 'white' }, // Establece el color blanco para el texto ingresado
                }}
              />
              <TextField
                onKeyDown={handleKeyPress}
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                variant="filled"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                InputLabelProps={{
                  style: { color: 'white' }, // Aquí estableces el color blanco
                }}
                inputProps={{
                  style: { color: 'white' }, // Establece el color blanco para el texto ingresado
                }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" />}
                style={{ color: 'white' }}
                label="Recuérdame"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="warning"
                onClick={handleLogin}
              >
                Ingresar
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
