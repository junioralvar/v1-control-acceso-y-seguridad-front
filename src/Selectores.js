import React, { useEffect, useState } from 'react'
import { InpustSelect } from './componentes/input/Inputs'
import { API_URL } from './const'
import axios from 'axios'
import { useGlobalState } from './AppContext'

export const Selectores = ({ ocultarPuerta }) => {
  const { valueEvento, setValueEvento, valuePuerta, setValuePuerta } =
    useGlobalState()
  const [allEvento, setAllEvento] = useState()
  const [allPuertas, setAllPuertas] = useState()

  useEffect(() => {
    findAllEvento()
  }, [])

  useEffect(() => {
    if (localStorage.getItem('valueEvento')) findAllPuerta()
  }, [localStorage.getItem('valueEvento')])

  const findAllEvento = async () => {
    try {
      const endpoint = `/evento/find-disponibles`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })

      setAllEvento(data)
    } catch (error) {
      alert(error.response.data.mensaje)
    }
  }

  const findAllPuerta = async () => {
    try {
      const endpoint = `/puerta/find-by-evento-id/${valueEvento}`
      const { data } = await axios.get(API_URL + endpoint, {
        headers: { Authorization: localStorage.getItem('miToken') },
      })
      setAllPuertas(data)
    } catch (error) {
      alert(error.response.data.mensaje)
    }
  }

  const handleChangeEvento = (event) => {
    setValueEvento(event.target.value)
    localStorage.setItem('valueEvento', event.target.value)

    const evento = allEvento.find((item) => item.id === event.target.value)
    localStorage.setItem('tipoFuenteId', evento.tipoFuenteId)

    localStorage.removeItem('valuePuerta')
    setValuePuerta()
  }

  const handleChangePuerta = (event) => {
    setValuePuerta(event.target.value)
    localStorage.setItem('valuePuerta', event.target.value)
  }
  return (
    <>
      <InpustSelect
        xs={6}
        label="Seleccione el evento"
        value={valueEvento}
        onChange={handleChangeEvento}
        data={allEvento}
        entity={true}
      />
      {ocultarPuerta ? null : (
        <InpustSelect
          xs={6}
          label="Seleccione la puerta"
          value={valuePuerta}
          onChange={handleChangePuerta}
          data={allPuertas}
          entity={true}
        />
      )}
    </>
  )
}
