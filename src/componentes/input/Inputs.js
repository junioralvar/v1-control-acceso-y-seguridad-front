import {
  Chip,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material'
import React from 'react'
import { FcSearch } from 'react-icons/fc'

export const Inputs = ({
  xs,
  name,
  label,
  typeNumber,
  value,
  onChange,
  multiline,
  rows,
  disabled,
  variantFilled,
  typePassword,
}) => {
  return (
    <Grid item xs={xs}>
      <FormControl fullWidth>
        <TextField
          size="small"
          name={name}
          label={label}
          type={typePassword ? 'password' : typeNumber ? 'number' : 'text'}
          value={value}
          onChange={onChange}
          multiline={multiline ? true : false}
          rows={rows ? rows : 0}
          disabled={disabled}
          variant={variantFilled ? 'filled' : 'outlined'}
          // inputProps={{ readonly: true }}
        />
      </FormControl>
    </Grid>
  )
}

export const InpustSelect = ({
  xs,
  label,
  value,
  name,
  onChange,
  data,
  entity,
  disabled,
}) => {
  return (
    <Grid item xs={xs}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          disabled={disabled}
        >
          {data &&
            data.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {entity ? item.nombre : item.valor}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

export const InputsDate = ({ xs, label, name, value, onChange, disabled }) => {
  return (
    <Grid item xs={xs}>
      <FormControl fullWidth>
        <TextField
          size="small"
          id="datetime-local"
          label={label}
          type="datetime-local"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '0.91rem' },
          }}
          InputProps={{
            style: { fontSize: '0.91rem' },
          }}
        />
      </FormControl>
    </Grid>
  )
}

export const InputsChip = ({ xs, label }) => {
  return (
    <Grid item xs={xs}>
      <Divider>
        <Chip label={label} />
      </Divider>
    </Grid>
  )
}

export const InputBuscador = ({ xs, label, name, value, onChange }) => {
  return (
    <Grid item xs={xs}>
      <FormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">{label} </InputLabel>
        <OutlinedInput
          size="small"
          id="outlined-adornment-password"
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          color="primary"
          endAdornment={
            <InputAdornment position="end">
              <FcSearch />
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
    </Grid>
  )
}
