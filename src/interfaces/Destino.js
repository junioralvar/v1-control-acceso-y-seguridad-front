import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../AppContext'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Swal from 'sweetalert2'
import { API_URL, DESTINO_MODEL } from '../const'
import axios from 'axios'
import { MyTable } from '../componentes/tabla/Tabla'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { MyModal } from '../componentes/modal/MyModal'

const BodyModal = ({
  handleChangeDestino,
  destino,
  allEvento,
  valueEvento,
}) => {
  return (
    <>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField
            name="nombre"
            id="filled-search"
            label="Nombre"
            type="text"
            value={destino?.nombre}
            onChange={handleChangeDestino}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Evento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="eventoId"
            value={valueEvento}
            label="Evento"
            onChange={handleChangeDestino}
            disabled
          >
            {allEvento &&
              allEvento.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.nombre}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  )
}

export const Destino = () => {
  const { tokenVigente } = useGlobalState()

  const [totalElements, setTotalElements] = useState()
  const [modalInsert, setModalInsert] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [modals, setModals] = useState({
    insertModal: {
      isOpen: false,
      title: 'Insertar Registro',
    },
    updateModal: {
      isOpen: false,
      title: 'Actualizar Registro',
    },
  })
  const [destino, setDestino] = useState()
  const [allDestino, setAllDestino] = useState()
  const [allEvento, setAllEvento] = useState()
  const [valueEvento, setValueEvento] = useState(1)

  if (tokenVigente == false) {
    alert('SESIÓN EXPIRADA! ... VUELVA A INICIAR SESIÓN')
    window.location.reload()
  }

  useEffect(() => {
    setDestino({ ...DESTINO_MODEL })
  }, [])

  useEffect(() => {
    if (valueEvento !== undefined) findAllDestino()
  }, [page, rowsPerPage, valueEvento])

  useEffect(() => {
    findAllEvento()
  }, [])

  const findAllDestino = async () => {
    try {
      const endpoint = `/destino/find-by-evento-id/${valueEvento}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      const startIndex = page * rowsPerPage
      const paginatedData = data.slice(startIndex, startIndex + rowsPerPage)

      setAllDestino(paginatedData)
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

  const findAllEvento = async () => {
    try {
      const endpoint = `/evento/find-all`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      setAllEvento(data)
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

  const saveDestino = async () => {
    delete destino.cantidadIngresos
    delete destino.cantidadSalidas
    try {
      const endpoint = `/destino/save`
      await axios.post(
        API_URL + endpoint,
        { ...destino, eventoId: valueEvento },
        {
          headers: { Authorization: localStorage.getItem('miToken') },
        }
      )
      findAllDestino()
      setDestino({ ...DESTINO_MODEL })
      if (modalInsert) {
        Swal.fire({
          title: 'Registrado con éxito',
          icon: 'success',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1000,
        })
      } else {
        Swal.fire({
          title: 'Registro actualizado!',
          icon: 'success',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1000,
        })
      }
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
    } finally {
      setModalInsert(false)
    }
  }

  const deleteByIdDestino = async (id) => {
    try {
      const endpoint = `/destino/delete-by-id/${id}`
      await axios.delete(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      findAllDestino()
      setDestino({ ...DESTINO_MODEL })
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
    handleChangeModal('insertModal', 'isOpen', false)
    handleChangeModal('updateModal', 'isOpen', false)
    saveDestino()
  }

  const handleClickInsert = () => {
    setModalInsert(true)
    setDestino({ ...DESTINO_MODEL })
    handleChangeModal('insertModal', 'isOpen', true)
  }

  const handleClickUpdate = (item) => {
    setModalInsert(false)
    setDestino({ ...item })
    handleChangeModal('updateModal', 'isOpen', true)
  }

  const handleClickDelete = (item) => {
    Swal.fire({
      icon: 'question',
      title: '¿Confirma que desea eliminar?',
      confirmButtonColor: 'red',
      cancelButtonColor: 'blue',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        handleChangeModal('insertModal', 'isOpen', false)
        handleChangeModal('updateModal', 'isOpen', false)
        deleteByIdDestino(item)
      }
    })
  }

  const handleChangeDestino = (e) => {
    const { name, value } = e.target
    setDestino({ ...destino, [name]: value })
  }
  const handleChangeModal = (modalName, prop, value) => {
    const myModals = { ...modals }
    myModals[modalName][prop] = value
    setModals(myModals)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const rows =
    allDestino &&
    allDestino.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      eventoId: item.eventoId,
      flagEvento: item.evento.nombre,
      cantidadIngresos: item.cantidadIngresos,
      cantidadSalidas: item.cantidadSalidas,
    }))

  const columns = [
    {
      field: 'flagEvento',
      headerName: 'Nombre del Evento',
      width: 150,
      align: 'left',
    },
    {
      field: 'nombre',
      headerName: 'Nombre del Destino',
      width: 100,
      align: 'left',
    },
    {
      field: 'cantidadIngresos',
      headerName: 'Cantidad de Ingresos',
      width: 80,
      align: 'right',
    },
    {
      field: 'cantidadSalidas',
      headerName: 'Cantidad de Salidas',
      width: 80,
      align: 'right',
    },
    {
      field: '',
      headerName: '',
      width: 100,
      align: 'left',
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
        </Grid>
      ),
    },
  ]
  return (
    <>
      <Typography className="fw-bold" variant="h6">
        Modulo de Destino
      </Typography>

      <Stack direction="row" spacing={2} mt={4}>
        <Button variant="contained" onClick={handleClickInsert}>
          <ControlPointIcon /> &nbsp;&nbsp;Registrar Destino
        </Button>
        <FormControl sx={{ minWidth: 300 }} size="small">
          <InputLabel id="demo-select-small-label">
            Seleccione el Evento
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Seleccione puerta"
            required
            name="id"
            onChange={(e) => setValueEvento(e.target.value)}
            value={valueEvento}
          >
            {!!allEvento &&
              allEvento.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nombre}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>

      <br />

      {allDestino && (
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

      <MyModal
        disabled={destino?.nombre === '' ? true : false}
        modalData={modals.insertModal}
        actionModal="insertModal"
        save={handleClickSave}
        action="Guardar"
        handleChangeModal={handleChangeModal}
        height={250}
      >
        <BodyModal
          destino={destino}
          handleChangeDestino={handleChangeDestino}
          allEvento={allEvento}
          valueEvento={valueEvento}
        />
      </MyModal>

      <MyModal
        disabled={destino?.nombre === '' ? true : false}
        modalData={modals.updateModal}
        actionModal="updateModal"
        save={handleClickSave}
        action="Actualizar"
        handleChangeModal={handleChangeModal}
        height={250}
      >
        <BodyModal
          destino={destino}
          handleChangeDestino={handleChangeDestino}
          allEvento={allEvento}
          valueEvento={valueEvento}
        />
      </MyModal>
    </>
  )
}
