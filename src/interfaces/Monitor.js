import * as React from 'react'
import { API_URL, API_URL_WEBSOCKET, API_URL_WEBSOCKET_SALA_1 } from '../const'
import { Stomp } from '@stomp/stompjs'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useGlobalState } from '../AppContext'
import Swal from 'sweetalert2'
import { AlertFillets } from '../componentes/alert/AlertFillets'
import { TablaMui } from '../componentes/tabla/TablaMui'

export const Monitor = () => {
  const { tokenVigente } = useGlobalState()
  const [persona, setPersona] = useState()

  if (tokenVigente === false) {
    alert('SESIÓN EXPIRADA! ... VUELVA A INICIAR SESIÓN')
    window.location.reload()
  }

  useEffect(() => {
    if (localStorage.getItem('valueEvento')) findAllTail()
  }, [])

  // WEBSOCKET
  const client = Stomp.client(API_URL_WEBSOCKET)
  useEffect(() => {
    client.debug = () => {}
    client.connect({}, () => {
      const subscription = client.subscribe(
        API_URL_WEBSOCKET_SALA_1 + localStorage.getItem('valueEvento'),

        (message) => {
          const contenido = JSON.parse(message.body)
          const nuevaPersona = [...persona]
          nuevaPersona.pop(contenido.content)
          setPersona(nuevaPersona)
          findAllTail()
        }
      )
      return () => {
        subscription.unsubscribe()
        client.disconnect()
      }
    })
  }, [])

  const findAllTail = async (id) => {
    const eventoId = localStorage.getItem('valueEvento')
    try {
      const endpoint = `/persona/find-tail/${eventoId}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      setPersona(data)
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

  return (
    <>
      {localStorage.getItem('valueEvento') ? (
        <TablaMui data={persona} />
      ) : (
        <AlertFillets text="Asegurese de seleccionar un evento en la opcion de Registro para poder monitorear en tiempo real " />
      )}
    </>
  )
}
