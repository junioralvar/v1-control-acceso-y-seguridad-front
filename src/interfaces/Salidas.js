import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import './Style.css'
import { API_URL, PERSONA_MODEL, ACTIVO_MODEL, SALIDA_MODEL } from '../const'

import Swal from 'sweetalert2'
import { InputsActivos } from '../componentes/input/InputsActivos'
import { InputsPersona } from '../componentes/input/InputsPersona'
import { InputsSalidas } from '../componentes/input/InputsSalidas'
import { useGlobalState } from '../AppContext'

export const Salidas = () => {
  const { tokenVigente } = useGlobalState()

  const [checked, setChecked] = useState(false)
  const [checkedEsColegiado, setCheckedEsColegiado] = useState(false)
  const [checkedSalidaAutomatica, setCheckedSalidaAutomatica] = useState(true)
  const [loader, setLoader] = useState(false)
  const [persona, setPersona] = useState()
  const [activo, setActivo] = useState()
  const [puertas, setPuertas] = useState([])
  const [salida, setSalida] = useState()
  const [controlPayload, setControlPayload] = useState([])
  const [tipoDocumento, setTipoDocumento] = useState([])
  const [tipoActivo, setTipoActivo] = useState([])
  const [buscarDocumento, setBuscarDocumento] = useState('')
  const [buscarCip, setBuscarCip] = useState('')
  const [inputsActivos, setInputsActivos] = useState([])
  const [tipoDocumentoId, setTipoDocumentoId] = useState(1)

  if (tokenVigente == false) {
    alert('SESIÓN EXPIRADA! ... VUELVA A INICIAR SESIÓN')
    window.location.reload()
  }

  useEffect(() => {
    setPersona({ ...PERSONA_MODEL })
    setActivo({ ...ACTIVO_MODEL })
    setSalida({ ...SALIDA_MODEL })
  }, [])

  useEffect(() => {
    findAllAux()
    findAllPuerta()
  }, [])

  useEffect(() => {
    if ('persona' in controlPayload && 'salida' in controlPayload)
      saveControlPayload()
  }, [controlPayload])

  // useEffect(() => {
  //   testCheckend()
  // }, [])

  //YA NO USAMOS LA BUSQUEDA POR CIP
  // const findAllControlPayloadCip = async () => {
  //   try {
  //     const endpoint = `/control-payload/find-by-persona-cip/${buscarCip}`
  //     const { data } = await axios.get(API_URL + endpoint, {
  //       headers: { Authorization: localStorage.getItem('miToken') },
  //     })

  //     setInputsActivos(data.filter((item) => 'ingreso' in item)[0].activoList)
  //     setChecked(true)
  //   } catch (error) {
  //     alert(error.response.data.message)
  //   } finally {
  //     setBuscarCip('')
  //   }
  // }

  // const findAllControlPayloadDoc = async () => {
  //   try {
  //     // ANTIGUO ENDPOINT
  //     // const endpoint = `/control-payload/find-by-persona-documento/${persona?.tipoDocumentoId}/${buscarDocumento}`
  //     const endpoint = `/persona/find-by-persona-documento/${tipoDocumento}/${buscarDocumento}`
  //     const { data } = await axios.get(API_URL + endpoint, {
  //       headers: { Authorization: localStorage.getItem('miToken') },
  //     })

  //     setInputsActivos(data.filter((item) => 'ingreso' in item)[0].activoList)
  //     setChecked(true)
  //   } catch (error) {
  //     alert(error.response.data.mensaje)
  //   } finally {
  //     setBuscarDocumento('')
  //   }
  // }

  //YA NO USAMOS LA BUSQUEDA POR CIP
  // const findAllPersonaCip = async () => {
  //   try {
  //     setLoader(true)
  //     const endpoint = `/controlable/find-by-persona-cip/${buscarCip}`
  //     const { data } = await axios.get(API_URL + endpoint, {
  //       headers: { Authorization: localStorage.getItem('miToken') },
  //     })
  //     if (Object.keys(data).length === 0) {
  //       setControlPayload([])
  //       setPersona({ ...PERSONA_MODEL })
  //     } else {
  //       setPersona(data)
  //     }
  //     findAllControlPayloadCip()
  //   } catch (error) {
  //     alert(error.response.data.message)
  //   } finally {
  //     setLoader(false)
  //   }
  // }

  const findAllPersonaDocumento = async () => {
    try {
      setLoader(true)
      const endpoint = `/persona/find-by-persona-documento/${tipoDocumento}/${buscarDocumento}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      // if (Object.keys(data).length === 0) {
      //   setControlPayload([])
      //   setPersona({ ...PERSONA_MODEL })
      // } else {
      //   setPersona(data)
      // }
      // findAllControlPayloadDoc()
      setPersona(data.persona)
    } catch (error) {
      alert(error.response.data.message)
    } finally {
      setLoader(false)
    }
  }

  // SELECT TIPO DOCUMENTO
  const findAllAux = async () => {
    try {
      const endpoint = `/aux/find-all`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })

      setTipoDocumento(data.tipoDocumento)
      setTipoActivo(data.tipoActivo)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  // SELECT PUERTA
  const findAllPuerta = async () => {
    try {
      const endpoint = `/puerta/find-all`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      setPuertas(data)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const saveControlPayload = async () => {
    const activosList = Object.values(inputsActivos)
    controlPayload.activoList = activosList

    delete persona.tipoDocumento
    delete persona.tipoPersona
    delete persona.destacado
    delete persona.estado
    delete persona.fechaCreacion

    if (salida.marcaTemporal == null) {
      delete salida.marcaTemporal
    }
    controlPayload.salida.puertaId = localStorage.getItem('valuePuerta')
    try {
      // ANTIGUO ENDPOINT
      // const endpoint = `/control-payload/save-salida`
      const endpoint = `/persona/controlar`
      await axios.post(API_URL + endpoint, controlPayload, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      setSalida({ ...SALIDA_MODEL })

      Swal.fire({
        title: 'Salida registrada!',
        icon: 'success',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 1500,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'red',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    } finally {
      setInputsActivos([])
    }
  }

  const addInputActivo = () => {
    setInputsActivos([
      ...inputsActivos,
      { tipoActivoId: 1, marca: '', modelo: '', serie: '', codActivo: '' },
    ])
  }

  const handleChangePersona = (e) => {
    const { name, value } = e.target
    setPersona({ ...persona, [name]: value })
  }

  const handleChangeSalida = (e) => {
    const { name, value } = e.target
    setSalida({ ...salida, [name]: value })
  }

  const handleInputActivoChange = (index, fieldName, value) => {
    const newInputsActivos = [...inputsActivos]
    newInputsActivos[index][fieldName] = value
    setInputsActivos(newInputsActivos)

    setActivo({ ...inputsActivos })
  }
  const handleCheckboxClick = () => {
    setChecked(!checked)
    // testCheckend()
  }

  // function testCheckend() {
  //   checked ? setInputsActivos([]) : null
  // }

  const handleCheckboxClickEsColegiado = () => {
    setCheckedEsColegiado(!checkedEsColegiado)
  }

  const handleCheckboxClickSalidaAutomatica = () => {
    setCheckedSalidaAutomatica(!checkedSalidaAutomatica)
  }

  const handleClickControlPayload = () => {
    setControlPayload({
      persona,
      activoList: activo,
      salida,
    })
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <InputsPersona
              loader={loader}
              checkedEsColegiado={checkedEsColegiado}
              handleCheckboxClickEsColegiado={handleCheckboxClickEsColegiado}
              handleChangePersona={handleChangePersona}
              tipoDocumento={tipoDocumento}
              setBuscarCip={setBuscarCip}
              setBuscarDocumento={setBuscarDocumento}
              buscarCip={buscarCip}
              buscarDocumento={buscarDocumento}
              // findAllPersonaCip={findAllPersonaCip}
              findAllPersonaDocumento={findAllPersonaDocumento}
              persona={persona}
              setPersona={setPersona}
              setTipoDocumentoId={setTipoDocumentoId}
              tipoDocumentoId={tipoDocumentoId}
            />

            <InputsSalidas
              checkedSalidaAutomatica={checkedSalidaAutomatica}
              handleCheckboxClickSalidaAutomatica={
                handleCheckboxClickSalidaAutomatica
              }
              salida={salida}
              handleChangeSalida={handleChangeSalida}
              puertas={puertas}
            />
          </div>
          <div className="col-md-6">
            <InputsActivos
              checked={checked}
              handleCheckboxClick={handleCheckboxClick}
              addInputActivo={addInputActivo}
              inputsActivos={inputsActivos}
              handleInputActivoChange={handleInputActivoChange}
              tipoActivo={tipoActivo}
            />
            <Button
              variant="contained"
              className={
                persona?.nroDoc === '' ||
                persona?.paterno === '' ||
                persona?.materno === '' ||
                persona?.nombres === ''
                  ? 'mt-3 '
                  : 'mt-3 bg-danger text-white'
              }
              onClick={handleClickControlPayload}
              disabled={
                persona?.nroDoc === '' ||
                persona?.paterno === '' ||
                persona?.materno === '' ||
                persona?.nombres === ''
                  ? true
                  : false
              }
            >
              Registrar Salida
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
