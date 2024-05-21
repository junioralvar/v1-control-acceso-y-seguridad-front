import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export const MyRadioGroup = ({
  chekendRadioButton,
  setCheckendRadioButton,
}) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Tipo Documento
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue={chekendRadioButton}
      >
        <FormControlLabel
          onChange={(e) => setCheckendRadioButton(e.target.value)}
          value={1}
          control={<Radio />}
          label="DNI"
        />
        <FormControlLabel
          onChange={(e) => setCheckendRadioButton(e.target.value)}
          value={2}
          control={<Radio />}
          label="CE"
        />
        <FormControlLabel
          onChange={(e) => setCheckendRadioButton(e.target.value)}
          value={3}
          control={<Radio />}
          label="Pasaporte"
        />
      </RadioGroup>
    </FormControl>
  )
}
