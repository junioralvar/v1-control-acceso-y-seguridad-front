import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import './Style.css'
import { API_URL, PERSONA_MODEL, ACTIVO_MODEL, INGRESO_MODEL } from '../const'

import { InputsIngresos } from '../componentes/input/InputsIngresos'
import { InputsPersona } from '../componentes/input/InputsPersona'

import { useGlobalState } from '../AppContext'
import TransferWithinAStationSharpIcon from '@mui/icons-material/TransferWithinAStationSharp'
import { Alert, AlertTitle, Fab, Grid, Stack } from '@mui/material'
import { Historial } from '../componentes/historial/Historial'
import Swal from 'sweetalert2'

export const Ingresos = ({ checkedSwitch }) => {
  const { tokenVigente, setMostrarFoto, valuePuerta } = useGlobalState()

  const [checkedCamara, setCheckedCamara] = useState(false)
  const [checked, setChecked] = useState(false)

  const [checkedEsColegiado, setCheckedEsColegiado] = useState(false)
  const [checkedIngresoAutomatico, setCheckedIngresoAutomatico] = useState(true)
  const [controlPayload, setControlPayload] = useState()
  const [puertas, setPuertas] = useState([])
  const [loader, setLoader] = useState(false)
  const [persona, setPersona] = useState(PERSONA_MODEL)
  const [activo, setActivo] = useState()
  const [ingreso, setIngreso] = useState()
  const [activarCamara, setActivarCamara] = useState(false)
  const [fotoTomada, setFotoTomada] = useState(false)
  const [tipoDocumento, setTipoDocumento] = useState([])
  const [tipoActivo, setTipoActivo] = useState([])
  const [buscarDocumento, setBuscarDocumento] = useState('')

  const [foco, setFoco] = useState(true)
  const [inputsActivos, setInputsActivos] = useState([])
  const [historialEncontrado, setHistorialEncontrado] = useState(false)
  const [historialPersona, setHistorialPersona] = useState()
  const [pathRelativo, setPathRelativo] = useState('')
  const [allDestino, setAllDestino] = useState()
  const [tipoDocumentoId, setTipoDocumentoId] = useState(1)
  const [enlistado, setEnlistado] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)
  const [isLoading, setIsLoading] = useState()

  const [data, setData] = useState()

  const [responseBusqueda, setResponseBusqueda] = useState('')

  useEffect(() => {
    if (data) {
      if (data.esColegiado === false && data.condicion === false) {
        setResponseBusqueda(
          `Este usuario NO es colegiado de nuestro consejo departamental`
        )
      } else if (data.condicion === false && data.esColegiado === true) {
        setResponseBusqueda(`El colegiado se encuentra NO HABILITADO`)
      } else if (data.condicion === true && data.esColegiado === true) {
        setResponseBusqueda(`El colegiado se encuentra HABILITADO`)
      }
    }
    if (!checkedSwitch) {
      setResponseBusqueda('')
      setData()
    }
  }, [data, checkedSwitch])

  useEffect(() => {
    if (checkedSwitch) {
      if (
        persona?.nroDoc === '' ||
        persona?.paterno === '' ||
        persona?.materno === '' ||
        persona?.nombres === '' ||
        fotoTomada === false
      ) {
        setDisabledButton(true)
      } else {
        setDisabledButton(false)
      }
    } else {
      if (
        persona?.nroDoc === '' ||
        persona?.paterno === '' ||
        persona?.materno === '' ||
        persona?.nombres === ''
      ) {
        setDisabledButton(true)
      } else {
        setDisabledButton(false)
      }
    }
  }, [
    checkedSwitch,
    persona?.nroDoc,
    persona?.paterno,
    persona?.materno,
    persona?.nombres,
    fotoTomada,
  ])

  if (tokenVigente === false) {
    alert('SESIÓN EXPIRADA! ... VUELVA A INICIAR SESIÓN')
    window.location.reload()
  }

  useEffect(() => {
    setPersona({ ...PERSONA_MODEL })
    setActivo({ ...ACTIVO_MODEL })
    setIngreso({ ...INGRESO_MODEL })
  }, [])

  useEffect(() => {
    findAllAux()
    findAllPuerta()
  }, [])

  useEffect(() => {
    if (valuePuerta) findAllDestino()
  }, [valuePuerta])

  useEffect(() => {
    if (checkedSwitch) {
      if (controlPayload !== undefined && controlPayload.control.fotografia)
        saveControlPayload()
    } else {
      if (controlPayload) saveControlPayload()
    }
  }, [controlPayload])

  const findAllAux = async () => {
    try {
      const endpoint = `/aux/find-all`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })

      setTipoDocumento(data.tipoDocumento)
      setTipoActivo(data.tipoActivo)
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

  const findAllHistorialDoc = async () => {
    const eventoId = localStorage.getItem('valueEvento')
    try {
      const endpoint = `/persona/find-historial/${eventoId}/${tipoDocumentoId}/${buscarDocumento}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })

      setHistorialPersona(data)
      if (data.length > 0) {
        setHistorialEncontrado(true)
      } else {
        setHistorialEncontrado(false)
      }
    } catch (error) {}
  }

  const findAllPersonaDocumento = async () => {
    setIsLoading(true)
    const eventoId = localStorage.getItem('valueEvento')

    try {
      setLoader(true)
      const endpoint = `/persona/find-by-documento/${eventoId}/${tipoDocumentoId}/${buscarDocumento}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })

      setData(data)
      setEnlistado(data.enlistado)

      setPersona(data.persona)

      findAllHistorialDoc()
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
      setLoader(false)
      setActivarCamara(true)
      setCheckedCamara(true)
      setBuscarDocumento('')
      setMostrarFoto(false)
      setIsLoading(false)
    }
  }

  const findAllPuerta = async () => {
    try {
      const endpoint = `/puerta/find-all`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      setPuertas(data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'findAllPuerta: ' + error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'red',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    }
  }

  const findAllDestino = async () => {
    try {
      const eventoId = localStorage.getItem('valueEvento')
      const endpoint = `/destino/find-by-evento-id/${eventoId}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })

      setAllDestino(data)
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

  const saveControlPayload = () => {
    const activosList = Object.values(inputsActivos)
    controlPayload.activoList = activosList
    if (checkedIngresoAutomatico) {
      const control = controlPayload.control
      delete control.marcaTemporal
      controlPayload.control = control
      const persona = controlPayload.persona
      delete persona.tipoPersona
      delete persona.tipoDocumento
      delete persona.fechaCreacion
      delete persona.estado
      delete persona.destacado
      controlPayload.persona = persona
    } else {
      const persona = controlPayload.persona
      delete persona.tipoPersona
      delete persona.tipoDocumento
      delete persona.fechaCreacion
      delete persona.estado
      delete persona.destacado
      controlPayload.persona = persona
    }
    const idEvento = parseInt(localStorage.getItem('valueEvento'), 10)
    const idPuerta = parseInt(localStorage.getItem('valuePuerta'), 10)
    controlPayload.control.eventoId = idEvento
    controlPayload.control.puertaId = idPuerta
    const endpoint = `/persona/controlar`

    if (controlPayload) {
      axios
        .post(API_URL + endpoint, controlPayload, {
          headers: { Authorization: localStorage.getItem('miToken') },
        })
        .then((response) => {
          setControlPayload()
          setPersona({ ...PERSONA_MODEL })
          setActivo({ ...ACTIVO_MODEL })
          setIngreso({
            ...INGRESO_MODEL,
            destinoId: controlPayload.control.destinoId,
          })
          Swal.fire({
            title: checkedSwitch ? 'Ingreso registrado!' : 'Salida Registrada',
            icon: 'success',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
          })
          setFoco(true)
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: error.response.data.mensaje,
            confirmButtonText: 'Cerrar',
            confirmButtonColor: 'red',
            showConfirmButton: true,
            timer: 5000,
            timerProgressBar: true,
          })
        })
        .finally(() => {
          setActivarCamara(false)
          setCheckedCamara(false)

          setBuscarDocumento('')
          setHistorialEncontrado(false)
          setInputsActivos([])
          setChecked(false)
          setFotoTomada(false)
          setFoco(true)
          setMostrarFoto(false)
          setEnlistado(false)
          setResponseBusqueda('')
        })
    }
  }

  const addInputActivo = () => {
    setInputsActivos([
      ...inputsActivos,
      { tipoActivoId: 2, marca: '', modelo: '', serie: '', codActivo: '' },
    ])
  }

  const handleChangePersona = (e) => {
    const { name, value } = e.target
    setPersona({ ...persona, [name]: value })
  }

  const handleChangeIngreso = (e) => {
    const { name, value } = e.target
    setIngreso({ ...ingreso, [name]: value })
  }
  const handleInputActivoChange = (index, fieldName, value) => {
    const newInputsActivos = [...inputsActivos]
    newInputsActivos[index][fieldName] = value
    setInputsActivos(newInputsActivos)

    setActivo({ ...inputsActivos })
  }

  const handleCheckboxClick = () => {
    setChecked(!checked)
  }

  const handleCheckboxClickCamara = () => {
    setCheckedCamara(!checkedCamara)
    setActivarCamara(!activarCamara)
  }

  const handleCheckboxClickEsColegiado = () => {
    setCheckedEsColegiado(!checkedEsColegiado)
  }

  const handleCheckboxClickIngresoAutomatico = () => {
    setCheckedIngresoAutomatico(!checkedIngresoAutomatico)
  }

  const handleClickControlPayload = () => {
    setControlPayload({
      persona,
      activoList: activo,
      control: ingreso,
    })

    setControlPayload((prevState) => ({
      ...prevState,
      control: {
        ...prevState.control,
        tipoControlId: checkedSwitch ? 1 : 2,
        fotografia: pathRelativo,
      },
      enlistado: enlistado,
    }))
  }

  const idFuente = localStorage.getItem('tipoFuenteId')

  if (valuePuerta)
    return (
      <>
        <Grid container spacing={1} className="px-3">
          <Grid item xs={12} sm={12} md={7}>
            <InputsPersona
              responseBusqueda={responseBusqueda}
              loader={loader}
              checkedEsColegiado={checkedEsColegiado}
              handleCheckboxClickEsColegiado={handleCheckboxClickEsColegiado}
              handleChangePersona={handleChangePersona}
              tipoDocumento={tipoDocumento}
              setBuscarDocumento={setBuscarDocumento}
              buscarDocumento={buscarDocumento}
              findAllPersonaDocumento={findAllPersonaDocumento}
              persona={persona}
              setPersona={setPersona}
              camara="si"
              checkedCamara={checkedCamara}
              handleCheckboxClickCamara={handleCheckboxClickCamara}
              historialPersona={historialPersona}
              historialEncontrado={historialEncontrado}
              pathRelativo={pathRelativo}
              setPathRelativo={setPathRelativo}
              setControlPayload={setControlPayload}
              setFotoTomada={setFotoTomada}
              foco={foco}
              setTipoDocumentoId={setTipoDocumentoId}
              tipoDocumentoId={tipoDocumentoId}
              checkedSwitch={checkedSwitch}
              enlistado={enlistado}
              isLoading={isLoading}
              data={data}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <InputsIngresos
              checkedIngresoAutomatico={checkedIngresoAutomatico}
              handleCheckboxClickIngresoAutomatico={
                handleCheckboxClickIngresoAutomatico
              }
              ingreso={ingreso}
              handleChangeIngreso={handleChangeIngreso}
              puertas={puertas}
              allDestino={allDestino}
              checkedSwitch={checkedSwitch}
              setChecked={setChecked}
              checked={checked}
              handleCheckboxClick={handleCheckboxClick}
              addInputActivo={addInputActivo}
              inputsActivos={inputsActivos}
              handleInputActivoChange={handleInputActivoChange}
              tipoActivo={tipoActivo}
            />

            {idFuente === '3' ? (
              <>
                {enlistado ? (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="info">
                      <AlertTitle>Detalle</AlertTitle>
                      <pre>
                        {JSON.stringify(JSON.parse(data.detalle), null, 2)}
                      </pre>
                    </Alert>
                  </Stack>
                ) : null}
              </>
            ) : (
              <></>
            )}
          </Grid>

          <Grid item xs={12} className="mt-5">
            {historialEncontrado ? (
              <Historial persona={historialPersona} />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        <div className="insert-icon">
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleClickControlPayload}
            disabled={disabledButton}
          >
            <TransferWithinAStationSharpIcon />
          </Fab>
        </div>
      </>
    )
}
