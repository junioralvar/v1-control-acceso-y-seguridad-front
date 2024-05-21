import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL, PUERTA_MODEL } from '../const'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MyTable } from '../componentes/tabla/Tabla'
import { Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { MyModal } from '../componentes/modal/MyModal'
import Swal from 'sweetalert2'
import { useGlobalState } from '../AppContext'

const BodyModal = ({ handleChangePuerta, puerta, allEvento, valueEvento }) => {
  return (
    <>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <TextField
            name="nombre"
            id="filled-search"
            label="Nombre"
            type="text"
            value={puerta?.nombre}
            onChange={handleChangePuerta}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <TextField
            name="direccion"
            id="filled-search"
            label="Direccion"
            type="text"
            value={puerta?.direccion}
            onChange={handleChangePuerta}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Evento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="eventoId"
            value={valueEvento}
            label="Evento"
            onChange={handleChangePuerta}
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

export const Puertas = () => {
  const { tokenVigente } = useGlobalState()
  const [totalElements, setTotalElements] = useState()
  const [modalInsert, setModalInsert] = useState(false)
  const [puerta, setPuerta] = useState([])
  const [allPuerta, setAllPuerta] = useState([])
  const [allEvento, setAllEvento] = useState()
  const [valueEvento, setValueEvento] = useState(1)
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

  if (tokenVigente === false) {
    alert('SESIÓN EXPIRADA! ... VUELVA A INICIAR SESIÓN')
    window.location.reload()
  }

  useEffect(() => {
    setPuerta({ ...PUERTA_MODEL })
  }, [])
  useEffect(() => {
    if (valueEvento !== undefined) findAllPuerta()
  }, [page, rowsPerPage, valueEvento])

  useEffect(() => {
    findAllEvento()
  }, [])

  const findAllPuerta = async () => {
    try {
      const endpoint = `/puerta/find-by-evento-id/${valueEvento}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      const startIndex = page * rowsPerPage
      const paginatedData = data.slice(startIndex, startIndex + rowsPerPage)

      setAllPuerta(paginatedData)
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

  const savePuerta = async () => {
    delete puerta.flagEvento
    delete puerta.cantidadIngresos
    delete puerta.cantidadSalidas

    try {
      const endpoint = `/puerta/save`
      await axios.post(
        API_URL + endpoint,
        { ...puerta, eventoId: valueEvento },
        {
          headers: { Authorization: localStorage.getItem('miToken') },
        }
      )
      findAllPuerta()
      setPuerta({ ...PUERTA_MODEL })
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
        text: error.response.data.mensaje,

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

  const deleteByIdPuerta = async (id) => {
    try {
      const endpoint = `/puerta/delete-by-id/${id}`
      await axios.delete(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      findAllPuerta()
      setPuerta({ ...PUERTA_MODEL })
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
    savePuerta()
  }

  const handleClickInsert = () => {
    setModalInsert(true)
    setPuerta({ ...PUERTA_MODEL })
    handleChangeModal('insertModal', 'isOpen', true)
  }

  const handleClickUpdate = (item) => {
    setModalInsert(false)
    setPuerta({ ...item })
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
        deleteByIdPuerta(item)
      }
    })
  }

  const handleChangePuerta = (e) => {
    const { name, value } = e.target
    setPuerta({ ...puerta, [name]: value })
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
    allPuerta &&
    allPuerta.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      direccion: item.direccion,
      eventoId: item.eventoId,
      flagEvento: item.evento.nombre,
      cantidadIngresos: item.cantidadIngresos,
      cantidadSalidas: item.cantidadSalidas,
    }))

  const columns = [
    {
      field: 'flagEvento',
      headerName: 'Nombre del Evento',
      width: 200,
      align: 'left',
    },
    {
      field: 'nombre',
      headerName: 'Nombre de la Puerta',
      width: 150,
      align: 'left',
    },
    {
      field: 'direccion',
      headerName: 'Dirección',
      width: 200,
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
      width: 150,
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
        Modulo de Puertas
      </Typography>

      <Stack direction="row" spacing={2} mt={4}>
        <Button variant="contained" onClick={handleClickInsert}>
          <ControlPointIcon /> &nbsp;&nbsp;Registrar Puerta
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
      {allPuerta && (
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
        disabled={
          puerta?.nombre === '' || puerta?.direccion === '' ? true : false
        }
        modalData={modals.insertModal}
        actionModal="insertModal"
        save={handleClickSave}
        action="Guardar"
        handleChangeModal={handleChangeModal}
        height={270}
      >
        <BodyModal
          puerta={puerta}
          handleChangePuerta={handleChangePuerta}
          allEvento={allEvento}
          valueEvento={valueEvento}
        />
      </MyModal>

      <MyModal
        disabled={
          puerta?.nombre === '' || puerta?.direccion === '' ? true : false
        }
        modalData={modals.updateModal}
        actionModal="updateModal"
        save={handleClickSave}
        action="Actualizar"
        handleChangeModal={handleChangeModal}
        valueEvento={valueEvento}
        height={270}
      >
        <BodyModal
          puerta={puerta}
          handleChangePuerta={handleChangePuerta}
          allEvento={allEvento}
          valueEvento={valueEvento}
        />
      </MyModal>
    </>
  )
}
