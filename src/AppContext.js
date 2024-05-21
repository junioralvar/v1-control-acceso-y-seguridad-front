import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { API_URL } from './const'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [valueEvento, setValueEvento] = useState(
    localStorage.getItem('valueEvento') || 0
  )
  const [valuePuerta, setValuePuerta] = useState(
    localStorage.getItem('valuePuerta') || 0
  )
  const [tokenVigente, setTokenVigente] = useState()
  const [auxData, setAuxData] = useState()
  const [statusText, setStatusText] = useState('Importar CSV')
  const [sendCsv, setSendCsv] = useState(false)
  const [mostrarFoto, setMostrarFoto] = useState(false)
  useEffect(() => {
    const intervalId = setInterval(verificarToken, 60000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const findAuxData = async () => {
      try {
        const endpoint = `/aux/find-all`
        const { data } = await axios.get(API_URL + endpoint)
        setAuxData(data)
      } catch (error) {
        alert(error.response.data.mensaje)
      }
    }
    findAuxData()
  }, [])

  const verificarToken = async () => {
    try {
      const endpoint = `/autenticacion/verify`
      const tokenGuardado = localStorage.getItem('miToken')
      await axios.post(API_URL + endpoint, {
        token: tokenGuardado,
      })
      setTokenVigente(true)
    } catch (error) {
      setTokenVigente(false)
      localStorage.clear()
    }
  }

  return (
    <AppContext.Provider
      value={{
        tokenVigente,
        setTokenVigente,
        auxData,
        setAuxData,
        statusText,
        setStatusText,
        sendCsv,
        setSendCsv,
        mostrarFoto,
        setMostrarFoto,
        valueEvento,
        setValueEvento,
        valuePuerta,
        setValuePuerta,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalState = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error(
      'useGlobalState debe ser utilizado dentro de un AppProvider'
    )
  }
  return context
}
