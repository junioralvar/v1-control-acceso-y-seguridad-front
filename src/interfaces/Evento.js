import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../AppContext'
import axios from 'axios'
import { API_URL, EVENTO_MODEL } from '../const'
import Swal from 'sweetalert2'
import {
  Box,
  Chip,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { MyTable } from '../componentes/tabla/Tabla'
import { FormControl } from '@mui/material'
import { ModalScrollMui } from '../componentes/modal/ModalScrollingMui'
import PeopleIcon from '@mui/icons-material/People'
import { FileCsv } from '../componentes/fileCsv/FileCsv'
import Papa from 'papaparse'
import { DateTime } from 'luxon'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff'
import csv from '../file/formato.csv'

const BodyModal = ({ handleChangeEvento, evento, setDataCsv, insertModal }) => {
  const { auxData } = useGlobalState()

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        // Eliminar la última fila
        result.data.splice(-1, 1)

        // Iterar sobre cada fila del resultado y convertir tipoDocumentoId a entero
        const convertedData = result.data.map((row) => {
          return {
            ...row,
            tipoDocumentoId: parseInt(row.tipoDocumentoId, 10),
          }
        })

        // Actualizar los datos con las filas convertidas
        setDataCsv(convertedData)
      },
    })
  }

  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            name="nombre"
            id="filled-search"
            label="Nombre"
            type="text"
            value={evento?.nombre}
            onChange={handleChangeEvento}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo Evento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="tipoEventoId"
            value={evento?.tipoEventoId}
            label="Tipo Evento"
            onChange={handleChangeEvento}
          >
            {auxData &&
              auxData.tipoEvento.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.valor}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      {evento?.tipoEventoId === 1 ? null : (
        <>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField
                id="datetime-local"
                label="Fecha de Inicio"
                type="datetime-local"
                name="fechaInicio"
                value={evento?.fechaInicio}
                onChange={handleChangeEvento}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField
                id="datetime-local"
                label="Fecha de Fin"
                type="datetime-local"
                name="fechaFin"
                value={evento?.fechaFin}
                onChange={handleChangeEvento}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
        </>
      )}

      <Grid item xs={12}>
        <Divider>
          <Chip label={<PeopleIcon />} />
        </Divider>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo Fuente</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="tipoFuenteId"
            value={evento?.tipoFuenteId}
            label="Tipo Fuente"
            onChange={handleChangeEvento}
            disabled={insertModal === 'insert' ? true : false}
          >
            {auxData &&
              auxData.tipoFuente.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.valor}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      {evento?.tipoFuenteId === 1 ? null : evento?.tipoFuenteId === 3 ? (
        <>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                name="fuente"
                id="filled-search"
                label="Fuente"
                type="text"
                value={evento?.fuente}
                onChange={handleChangeEvento}
              />
            </FormControl>
          </Grid>
        </>
      ) : evento?.tipoFuenteId === 2 ? (
        <>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FileCsv onFileUpload={handleFileUpload} />
            </FormControl>
            <a download href={csv}>
              Formato de archivo CSV
            </a>
            <br />
            <small>
              <i>Sobre el Formato:</i> <br />
              De la columna "tipoDocumentoId", 1 es DNI, 2 es Carnet de
              Extranjería y 3 es Pasaporte
            </small>
          </Grid>
        </>
      ) : null}
    </>
  )
}

const BodyModalViewCsv = ({ participantes }) => {
  return (
    <>
      {participantes ? (
        <>
          <div className="mt-1 ps-5">
            {participantes.map((item) => {
              return (
                <>
                  <br />
                  <p>
                    Tipo Documento: <b>{item.tipoDocumento.valor}</b> N°
                    Documento: <b>{item.nroDoc}</b>
                  </p>
                </>
              )
            })}
          </div>
        </>
      ) : (
        <>
          <div className="mt-5">
            <p>Aun no se han cargado participantes</p>
          </div>
        </>
      )}
    </>
  )
}

export const Evento = () => {
  const { tokenVigente, setStatusText } = useGlobalState()
  const [dataCsv, setDataCsv] = useState([])
  const [evento, setEvento] = useState()
  const [allEvento, setAllEvento] = useState()
  const [totalElements, setTotalElements] = useState()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [openModalInsert, setOpenModalInsert] = useState(false)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [openModalViewList, setOpenModalViewList] = useState(false)
  const [eventoId, setEventoId] = useState()
  const [participantes, setParticipantes] = useState()

  if (tokenVigente === false) {
    alert('SESIÓN EXPIRADA! ... VUELVA A INICIAR SESIÓN')
    window.location.reload()
  }

  useEffect(() => {
    findAllEvento()
    setEvento({ ...EVENTO_MODEL })
  }, [page, rowsPerPage])

  const findAllEvento = async () => {
    try {
      const endpoint = `/evento/find-all`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })

      const startIndex = page * rowsPerPage
      const paginatedData = data.slice(startIndex, startIndex + rowsPerPage)
      setAllEvento(paginatedData)
      setTotalElements(data.length)
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

  const saveCsv = async () => {
    try {
      const endpoint = `/evento/load-fuente/${eventoId}`
      await axios.post(API_URL + endpoint, dataCsv, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
    } catch (error) {}
  }

  const viewFuente = async (id) => {
    try {
      const endpoint = `/evento/view-fuente/${id}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      setParticipantes(data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'red',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    }
  }
  const deleteFuente = async (id) => {
    try {
      const endpoint = `/evento/trunk-fuente/${id}`
      await axios.delete(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      findAllEvento()
      setEvento({ ...EVENTO_MODEL })
      Swal.fire({
        title: 'Fuente eliminada!',
        icon: 'success',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 1000,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'red',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    }
  }

  const saveEvento = async () => {
    delete evento.flagEvento
    delete evento.flagFuente
    delete evento.flagFechaInicio
    delete evento.flagFechaFin

    try {
      const endpoint = `/evento/save`
      await axios.post(API_URL + endpoint, evento, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      if (dataCsv.length > 0) {
        saveCsv()
      }
      findAllEvento()
      setEvento({ ...EVENTO_MODEL })
      setStatusText('Importar CSV')
      Swal.fire({
        title: 'Guardado con éxito',
        icon: 'success',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 1000,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'red',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    }
  }

  const deleteByIdEvento = async (id) => {
    try {
      const endpoint = `/evento/delete-by-id/${id}`
      await axios.delete(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      findAllEvento()
      setEvento({ ...EVENTO_MODEL })
      Swal.fire({
        title: 'Registro eliminado!',
        icon: 'success',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 1000,
      })
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

  const handleClickSave = () => {
    setOpenModalInsert(false)
    setOpenModalUpdate(false)
    setEvento({ ...evento, nombre: 'dataCsv' })
    saveEvento()
  }

  const handleClickInsert = () => {
    setEvento({ ...EVENTO_MODEL })
    setOpenModalInsert(true)
  }

  const handleClickUpdate = (item) => {
    setOpenModalUpdate(true)
    setEvento({ ...item })
    setEventoId(item.id)
  }

  const handleClickViewList = (item) => {
    setOpenModalViewList(true)
    viewFuente(item)
  }

  const handleClickDelete = (item) => {
    Swal.fire({
      icon: 'question',
      title: '¿Confirma que desea eliminar toda la fila?',
      confirmButtonColor: 'red',
      cancelButtonColor: 'blue',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModalInsert(false)
        setOpenModalUpdate(false)
        deleteByIdEvento(item)
      }
    })
  }
  const handleClickDeleteFuente = (item) => {
    Swal.fire({
      icon: 'question',
      title: '¿Confirma que desea eliminar toda la fuente?',
      confirmButtonColor: 'red',
      cancelButtonColor: 'blue',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModalInsert(false)
        setOpenModalUpdate(false)
        deleteFuente(item)
      }
    })
  }

  const handleChangeEvento = (e) => {
    const { name, value } = e.target
    setEvento({ ...evento, [name]: value })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const rows =
    allEvento &&
    allEvento.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      tipoEventoId: item.tipoEventoId,
      tipoFuenteId: item.tipoFuenteId,
      fechaInicio: item.fechaInicio,
      fechaFin: item.fechaFin,
      fuente: item.fuente,
      flagFechaInicio:
        item.fechaInicio === null
          ? ''
          : DateTime.fromISO(item.fechaInicio).toFormat('yyyy/MM/dd HH:mm'),
      flagFechaFin:
        item.fechaFin === null
          ? ''
          : DateTime.fromISO(item.fechaFin).toFormat('yyyy/MM/dd HH:mm'),
      flagEvento: item.tipoEvento.valor,
      flagFuente: item.tipoFuente.valor,
    }))

  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre del Evento',
      width: 250,
      align: 'left',
    },
    {
      field: 'flagEvento',
      headerName: 'Tipo del Evento',
      width: 100,
      align: 'left',
    },
    {
      field: 'flagFuente',
      headerName: 'Tipo de Fuente',
      width: 100,
      align: 'left',
    },
    {
      field: 'flagFechaInicio',
      headerName: 'Fecha de Inicio',
      width: 100,
      align: 'left',
    },
    {
      field: 'flagFechaFin',
      headerName: 'Fecha de Finalización',
      width: 100,
      align: 'left',
    },
    {
      field: '',
      headerName: '',
      width: 300,
      align: '',
      render: (params) => (
        <Grid container spacing={2} pt={1}>
          <Button
            className="bg-warning"
            variant="contained"
            onClick={() => handleClickUpdate(params.row)}
          >
            <EditIcon />
          </Button>
          &nbsp; &nbsp;
          <Button
            className="bg-danger"
            variant="contained"
            onClick={() => handleClickDelete(params.row.id)}
          >
            <DeleteForeverIcon />
          </Button>
          &nbsp; &nbsp;
          <Button
            className="bg-success"
            variant="contained"
            onClick={() => handleClickViewList(params.row.id)}
          >
            <FindInPageIcon />
          </Button>
          &nbsp; &nbsp;
          <Button
            className="bg-info"
            variant="contained"
            onClick={() => handleClickDeleteFuente(params.row.id)}
          >
            <ContentPasteOffIcon />
          </Button>
        </Grid>
      ),
    },
  ]
  return (
    <>
      <Typography className="fw-bold" variant="h6">
        Módulo de Eventos
      </Typography>
      <Stack direction="row" spacing={2} mt={4}>
        <Button variant="contained" onClick={handleClickInsert}>
          <ControlPointIcon /> &nbsp;&nbsp;Registrar Evento
        </Button>
      </Stack>
      <br />
      {allEvento && (
        <MyTable
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          totalElements={totalElements}
          columns={columns}
          rows={rows}
        />
      )}

      <ModalScrollMui
        titleModal="Actualizar Evento"
        titleButton="Actualizar"
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
        save={handleClickSave}
        disabled={evento?.nombre === '' ? true : false}
      >
        <BodyModal
          evento={evento}
          handleChangeEvento={handleChangeEvento}
          setDataCsv={setDataCsv}
        />
      </ModalScrollMui>

      <ModalScrollMui
        titleModal="Nuevo Evento"
        titleButton="Guardar"
        open={openModalInsert}
        setOpen={setOpenModalInsert}
        save={handleClickSave}
        disabled={evento?.nombre === '' ? true : false}
      >
        <BodyModal
          insertModal="insert"
          evento={evento}
          handleChangeEvento={handleChangeEvento}
          setDataCsv={setDataCsv}
        />
      </ModalScrollMui>

      <ModalScrollMui
        titleModal="Participantes"
        titleButton="Cerrar"
        open={openModalViewList}
        setOpen={setOpenModalViewList}
        save={(e) => setOpenModalViewList(false)}
      >
        {participantes && participantes.length > 0 ? (
          <BodyModalViewCsv participantes={participantes} />
        ) : (
          <p className="mt-5 ps-5">Aun no se han cargado participantes</p>
        )}
      </ModalScrollMui>
    </>
  )
}
