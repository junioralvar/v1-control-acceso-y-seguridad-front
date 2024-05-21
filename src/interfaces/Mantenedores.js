import { Grid } from '@mui/material'
import React from 'react'
import { TabMui } from '../componentes/tabs/TabMui'

export const Mantenedores = () => {
  return (
    <>
      <Grid container spacing={2} className="p-3">
        <Grid item xs={12}>
          <div className="fw-bold mb-2">Estimado usuario</div>
          <div>
            En esta sección, puedes gestionar las configuraciones y opciones
            relacionadas con puertas, eventos y destinos. Estas opciones te
            permiten mantener el sistema actualizado y gestionar de manera
            efectiva las entradas, salidas y accesos dentro de la organización.
          </div>
        </Grid>
        <Grid item xs={12}>
          <TabMui />
        </Grid>
      </Grid>
    </>
  )
}
