import { Grid } from '@mui/material'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Style.css'
import { MySwtich } from '../componentes/switch/Swtich'
import { Ingresos } from './Ingresos'
import { Selectores } from '../Selectores'

export const Registros = () => {
  const [checkedSwitch, setCheckedSwitch] = useState(true)

  const handleCheckboxClickSwitch = () => {
    setCheckedSwitch(!checkedSwitch)
  }

  return (
    <>
      <Grid container spacing={1} className="mt-2 px-2">
        <Grid item xs={8}>
          <Grid container spacing={3} className="px-3">
            <Selectores />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <MySwtich
            handleCheckboxClickSwitch={handleCheckboxClickSwitch}
            checkedSwitch={checkedSwitch}
          />
        </Grid>

        <Grid item xs={12}>
          <Ingresos checkedSwitch={checkedSwitch} />
        </Grid>
      </Grid>
    </>
  )
}
