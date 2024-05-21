import { Alert, AlertTitle, Grid, Stack, Typography } from '@mui/material'

import { useGlobalState } from '../AppContext'

export const MenuPrincipal = () => {
  const { tokenVigente } = useGlobalState()

  if (tokenVigente == false) {
    alert('SESIÓN EXPIRADA! ... VUELVA A INICIAR SESIÓN')
    window.location.reload()
  }

  return (
    <>
      <Grid container spacing={3} className="mt-2 px-4">
        <Grid item xs={12}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="info">
              <AlertTitle>Bienvenido</AlertTitle>
              {localStorage.getItem('nombres')}
            </Alert>
          </Stack>
        </Grid>
        <Grid item xs={12} className="text-center">
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              // display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CONTROL DE ACCESO Y SEGURIDAD
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
