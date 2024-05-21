import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Grid, Toolbar } from '@mui/material'
import { DateTime } from 'luxon'
import { Fotografia } from '../foto/Fotografia'

export const Historial = ({ persona }) => {
  function createData(
    ingreso,
    puerta,
    destino,
    placa,
    fotografia,
    motivo,
    observaciones,
    activoList,
    tipoControlId
  ) {
    return {
      ingreso,
      puerta,
      destino,
      placa,
      fotografia,
      motivo,
      observaciones,
      activo: activoList.map((item) => ({
        tipo: item.tipoActivo.valor,
        marca: item.marca,
        modelo: item.modelo,
        serie: item.serie,
        codigo: item.codActivo,
      })),
      tipoControlId,
    }
  }

  function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <TableRow
          sx={{ '& > *': { borderBottom: 'unset' } }}
          style={{
            backgroundColor: row.tipoControlId === 1 ? '#D0FFCF' : '#FFD8CF',
          }}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          <TableCell>{row.ingreso}</TableCell>
          <TableCell>{row.puerta}</TableCell>
          <TableCell>{row.destino}</TableCell>
          <TableCell>{row.placa}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Fotografia uuid={row.fotografia} />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography gutterBottom component="div">
                      <b>Motivo de la visita:</b> {row.motivo}
                    </Typography>
                    <Typography gutterBottom component="div">
                      <b>Observaciones:</b> {row.observaciones}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }

  const rows = []

  persona.forEach((element) => {
    if (element.tipoControlId === 1) {
      rows.push(
        createData(
          DateTime.fromISO(element.control.marcaTemporal).toFormat(
            'yyyy/MM/dd HH:mm'
          ),

          element.control.puerta.nombre,
          element.control.destino.nombre,
          element.control.placa,
          element.control.fotografia,
          element.control.motivo,
          element.control.observaciones,
          element.activoList,
          element.control.tipoControlId
        )
      )
    } else {
      rows.push(
        createData(
          DateTime.fromISO(element.control.marcaTemporal).toFormat(
            'yyyy/MM/dd HH:mm'
          ),

          element.control.puerta.nombre,
          element.control.tipoControlId === 2
            ? '---'
            : element.control.destino.nombre,
          element.control.placa,
          element.control.tipoControlId === 1
            ? element.control.fotografia
            : null,
          element.control.motivo,
          element.control.observaciones,
          element.activoList,
          element.control.tipoControlId
        )
      )
    }
  })

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={5}
        className="p-4"
        style={{ marginTop: '-30px', maxHeight: '600px' }}
      >
        <Typography className="fw-bold"> Historial</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
              {persona[0].persona.nombres +
                ' ' +
                persona[0].persona.paterno +
                ' ' +
                persona[0].persona.materno}
            </Typography>
            <sub className="fw-bold">Leyenda&nbsp;&nbsp; </sub>
            <Button
              style={{ backgroundColor: '#D0FFCF' }}
              className="text-dark"
            >
              ingreso
            </Button>
            <Button
              style={{ backgroundColor: '#FFD8CF' }}
              className="text-dark"
            >
              salida
            </Button>
          </Toolbar>
        </Box>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />

              <TableCell>Hora de Control</TableCell>
              <TableCell>Puerta</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Placa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.nombres} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
