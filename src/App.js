import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { API_URL } from './const'
import axios from 'axios'
import { MyDrawer } from './componentes/drawer/Drawer'
import { Login } from './componentes/login/Login'
import { AppProvider } from './AppContext'
import { LoginNew } from './componentes/login/LoginNew'
import { AppBarMui } from './componentes/appbar/AppBarMui'
import { MenuPrincipal } from './interfaces/MenuPrincipal'
import { Registros } from './interfaces/Registros'
import { Reporte } from './interfaces/Reporte'
import { Monitor } from './interfaces/Monitor'
import { Mantenedores } from './interfaces/Mantenedores'

export const App = () => {
  const [opcion, setOpcion] = useState('Registro')
  const [verificado, setVerificado] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [tipoDocumentoId, setTipoDocumentoId] = useState(1)
  const [nroDoc, setNroDoc] = useState('')
  const [pass, setPass] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setOpcion(opcion)
  }, [opcion])

  useEffect(() => {
    verificarToken()
  }, [])

  const cerrarSesion = async () => {
    try {
      const endpoint = `/autenticacion/sign-out`
      const tokenGuardado = localStorage.getItem('miToken')
      await axios.post(API_URL + endpoint, {
        token: tokenGuardado,
      })
      setVerificado(false)
      setNombreUsuario('')
    } catch (error) {
      alert(error.response.data.mensaje)
    } finally {
      setPass('')
      setNroDoc('')
      localStorage.clear()
      setOpcion('Registro')
    }
  }

  const enviarCredenciales = async () => {
    try {
      const endpoint = `/autenticacion/sign-in`
      const { data } = await axios.post(API_URL + endpoint, {
        tipoDocumentoId,
        nroDoc,
        pass,
      })
      setVerificado(true)
      setNombreUsuario(data.user)
      localStorage.setItem(
        'nombres',
        data.nombres + ' ' + data.paterno + ' ' + data.materno
      )
      localStorage.setItem('miToken', data.token)
      localStorage.setItem('usuarioId', data.id)
      localStorage.setItem('user', data.user)
      setCargando(false)
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
    }
  }

  const verificarToken = async () => {
    try {
      const endpoint = `/autenticacion/verify`
      const tokenGuardado = localStorage.getItem('miToken')

      const response = await axios.post(API_URL + endpoint, {
        token: tokenGuardado,
      })
      setCargando(false)
      setVerificado(true)
      setNombreUsuario(response.user)
    } catch (error) {
      setVerificado(false)
      setCargando(false)
      localStorage.clear()
    }
  }

  const handleClickCerrarSesion = () => {
    cerrarSesion()
  }

  if (cargando) {
    return <></>
  }

  if (verificado) {
    return (
      <>
        <AppProvider>
          <AppBarMui
            opcion={opcion}
            setOpcion={setOpcion}
            nombreUsuario={nombreUsuario}
            setNombreUsuario={setNombreUsuario}
            handleClickCerrarSesion={handleClickCerrarSesion}
          />
          {opcion === 'Inicio' && <MenuPrincipal />}
          {opcion === 'Registro' && <Registros />}
          {opcion === 'Monitoreo' && <Monitor />}
          {opcion === 'Reporte' && <Reporte />}
          {opcion === 'Mantenedor' && <Mantenedores />}
        </AppProvider>
      </>
    )
  } else {
    return (
      <LoginNew
        tipoDocumentoId={tipoDocumentoId}
        setTipoDocumentoId={setTipoDocumentoId}
        nroDoc={nroDoc}
        setNroDoc={setNroDoc}
        pass={pass}
        setPass={setPass}
        nombreUsuario={nombreUsuario}
        setNombreUsuario={setNombreUsuario}
        handleLogin={enviarCredenciales}
      />
    )
  }
}
