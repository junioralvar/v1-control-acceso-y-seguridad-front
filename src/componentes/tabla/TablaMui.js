import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { DateTime } from 'luxon'
import React, { useId } from 'react'
import { Fotografia } from '../foto/Fotografia'

export const TablaMui = ({ data }) => {
  const id = useId()
  if (data)
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      scope="col"
                      style={{ backgroundColor: '#2A3042', color: 'white' }}
                      className="text-center"
                    >
                      Persona
                    </TableCell>
                    <TableCell
                      scope="col"
                      style={{ backgroundColor: '#2A3042', color: 'white' }}
                    >
                      Tipo de control
                    </TableCell>

                    <TableCell
                      scope="col"
                      style={{ backgroundColor: '#2A3042', color: 'white' }}
                    >
                      Registro
                    </TableCell>

                    <TableCell
                      scope="col"
                      style={{ backgroundColor: '#2A3042', color: 'white' }}
                    >
                      Placa
                    </TableCell>
                    <TableCell
                      scope="col"
                      style={{ backgroundColor: '#2A3042', color: 'white' }}
                    >
                      Acompañantes
                    </TableCell>

                    <TableCell
                      scope="col"
                      style={{ backgroundColor: '#2A3042', color: 'white' }}
                    >
                      Observaciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((element) => {
                    return (
                      <TableRow key={id} className="text-center">
                        <TableCell className="text-center">
                          {element.control.tipoControlId === 1 ? (
                            <>
                              <Fotografia uuid={element.control.fotografia} />
                              <p style={{ fontSize: '13px' }}>
                                {element.persona.nombres +
                                  ' ' +
                                  element.persona.paterno +
                                  ' ' +
                                  element.persona.materno}{' '}
                                <br />
                                <span className="fw-bold">
                                  {element.persona.tipoDocumento.valor}
                                </span>{' '}
                                {element.persona.nroDoc}
                                <br />
                                <span className="fw-bold">CIP </span>{' '}
                                {element.persona.cip}
                              </p>
                            </>
                          ) : (
                            <p style={{ fontSize: '13px' }}>
                              {element.persona.nombres +
                                ' ' +
                                element.persona.paterno +
                                ' ' +
                                element.persona.materno}{' '}
                              <br />
                              <span className="fw-bold">
                                {element.persona.tipoDocumento.valor}
                              </span>{' '}
                              {element.persona.nroDoc}
                              <br />
                              <span className="fw-bold">CIP </span>{' '}
                              {element.persona.cip}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          {element.control.tipoControlId === 1 ? (
                            <p className="text-center bg-success rounded text-white p-1">
                              Ingreso
                            </p>
                          ) : (
                            <p className="text-center bg-danger rounded text-white p-1">
                              Salida
                            </p>
                          )}
                        </TableCell>

                        <TableCell>
                          {element.control.tipoControlId === 1 ? (
                            <>
                              <span className="fw-bold">Hora</span>{' '}
                              {DateTime.fromISO(
                                element.control.marcaTemporal
                              ).toFormat('HH:mm')}{' '}
                              <br />
                              <span className="fw-bold">Puerta</span>{' '}
                              {element.control.puerta.nombre} <br />
                              <span className="fw-bold">Destino</span>{' '}
                              {element.control.tipoControlId === 1
                                ? element.control.destino.nombre
                                : ''}
                            </>
                          ) : (
                            <>
                              <span className="fw-bold">Hora</span>{' '}
                              {DateTime.fromISO(
                                element.control.marcaTemporal
                              ).toFormat('HH:mm')}{' '}
                              <br />
                              <span className="fw-bold">Puerta</span>{' '}
                              {element.control.puerta.nombre} <br />
                            </>
                          )}
                        </TableCell>

                        <TableCell>{element.control.placa}</TableCell>
                        <TableCell>
                          <span className="fw-bold">Menores</span>{' '}
                          {element.control.menores} <br />{' '}
                          <span className="fw-bold">Mayores</span>{' '}
                          {element.control.mayores} <br />{' '}
                          <span className="fw-bold">Activos</span>{' '}
                          {element.activoList.length === 0
                            ? 0
                            : element.activoList.length}
                        </TableCell>

                        <TableCell>{element.control.observaciones}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </>
    )
}
