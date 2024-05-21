import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import axios from 'axios'
import { API_URL } from '../const'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { CSVLink } from 'react-csv'
import { InpustSelect, InputsDate } from '../componentes/input/Inputs'
import { TablaMui } from '../componentes/tabla/TablaMui'

export const Reporte = () => {
  const [fecha, setFecha] = useState()
  const [allEvento, setAllEvento] = useState([])
  const [valueEvento, setValueEvento] = useState(1)
  const [csv, setCsv] = useState()
  const [dataReporte, setDataReporte] = useState()

  const findPorDia = async () => {
    try {
      const endpoint = `/persona/find-por-dia/${valueEvento}/${fecha}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      setDataReporte(data)

      setCsv(
        data.map((item) => ({
          id: item.control.id,
          tipoIngreso: item.control.tipoControlId === 1 ? 'Ingreso' : 'Salida',
          hora: item.control.marcaTemporal,

          evento: item.control.evento.nombre,
          puerta: item.control.puerta.nombre,
          destino:
            item.control.tipoControlId === 1 ? item.control.destino.nombre : '',
          motivo: item.control.motivo,
          menores: item.control.menores,
          mayores: item.control.mayores,
          mascotas: item.control.mascotas,
          placa: item.control.placa,
          observaciones: item.control.observaciones,

          persona:
            item.persona.paterno +
            ' ' +
            item.persona.materno +
            ' ' +
            item.persona.nombres,
          tipoDocumento: item.persona.tipoDocumento.valor,
          nroDoc: item.persona.nroDoc,
          cip: item.persona.cip,
          enlistado: item.enlistado ? 'SI' : 'NO',
        }))
      )
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error: ' + error + ' - Detalle:  ' + error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'red',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    }
  }

  useEffect(() => {
    const findAllEvento = async () => {
      try {
        const endpoint = `/evento/find-all`
        const { data } = await axios.get(API_URL + endpoint, {
          headers: { Authorization: localStorage.getItem('miToken') },
        })
        setAllEvento(data)
      } catch (error) {
        alert(error.response.data.mensaje)
      }
    }
    findAllEvento()
  }, [])

  const buscarFecha = () => {
    findPorDia()
  }

  return (
    <>
      <Grid container spacing={1} className="mt-2 px-3">
        <InpustSelect
          xs={4}
          label="Seleccione el evento"
          name="valueEvento"
          value={valueEvento}
          data={allEvento}
          entity={true}
          onChange={(e) => setValueEvento(e.target.value)}
        />

        <InputsDate
          xs={4}
          label="Fecha"
          name="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <Grid item xs={4}>
          <Button variant="contained" className="ms-4 " onClick={buscarFecha}>
            Buscar <ContentPasteSearchIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          {csv !== undefined ? (
            <div>
              <CSVLink
                data={csv}
                filename={`Control de Ingreso y salida ${fecha}`}
                style={{ textDecoration: 'none' }}
              >
                Exportar a CSV
              </CSVLink>
            </div>
          ) : null}
        </Grid>
      </Grid>

      <TablaMui data={dataReporte} />
    </>
  )
}
