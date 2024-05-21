import { Button, Grid } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { API_URL, heightCamera, widthCamera } from '../../const'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useGlobalState } from '../../AppContext'
import check from '../archivos/check.png'
import error from '../archivos/error.png'

export const CameraComponent = ({
  setPathRelativo,
  enlistado,
  setFotoTomada,
}) => {
  const { mostrarFoto, setMostrarFoto } = useGlobalState()
  const [photo, setPhoto] = useState(null)
  const [cameras, setCameras] = useState([])
  const [currentCamera, setCurrentCamera] = useState(null)
  const videoRef = useRef()

  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        )
        setCameras(videoDevices)
        if (videoDevices.length > 0) {
          setCurrentCamera(videoDevices[0].deviceId)
        }
      } catch (error) {
        console.error('Error al enumerar dispositivos:', error)
      }
    }

    const requestCameraPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true })
        getCameras()
      } catch (error) {
        console.error('Permiso de cámara denegado:', error)
        alert(
          'Permiso para usar la cámara denegado. Por favor, permite el acceso a la cámara en la configuración del navegador.'
        )
      }
    }

    requestCameraPermissions()
  }, [])

  useEffect(() => {
    const startCamera = async () => {
      if (currentCamera) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: currentCamera,
              width: widthCamera,
              height: heightCamera,
            },
          })
          videoRef.current.srcObject = stream
        } catch (error) {
          console.error('Error al acceder a la cámara:', error)
        }
      }
    }
    startCamera()
  }, [currentCamera])

  useEffect(() => {
    enviarFoto()
  }, [photo])

  const enviarFoto = () => {
    const endpoint = `/archivo/save/${localStorage.getItem('usuarioId')}`
    if (photo) {
      const formData = new FormData()
      formData.append('files', dataURLtoBlob(photo), 'photo.jpg')
      axios
        .post(API_URL + endpoint, formData, {
          headers: {
            Authorization: localStorage.getItem('miToken'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setPathRelativo(response.data[0].id)
        })
        .catch((error) => {
          console.error('Error al enviar la foto:', error)
          setFotoTomada(false)
        })
    } else {
      console.warn('No hay una foto para enviar.')
    }
  }

  const tomarFoto = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const video = videoRef.current
    canvas.width = widthCamera
    canvas.height = heightCamera
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataURL = canvas.toDataURL('image/jpeg')
    setPhoto(dataURL)
    setFotoTomada(true)
    setMostrarFoto(true)
  }

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1])
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array = new Uint8Array(arrayBuffer)
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i)
    }
    return new Blob([arrayBuffer], { type: mimeString })
  }

  const changeCamera = () => {
    if (cameras.length > 1) {
      const currentIndex = cameras.findIndex(
        (camera) => camera.deviceId === currentCamera
      )
      const nextIndex = (currentIndex + 1) % cameras.length
      if (cameras[nextIndex]) {
        setCurrentCamera(cameras[nextIndex].deviceId)
      }
    } else {
      console.warn('No hay más de una cámara disponible.')
    }
  }

  const idFuente = localStorage.getItem('tipoFuenteId')

  return (
    <>
      <Grid container spacing={0} className="mt-2">
        <Grid item xs={4}>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="border border-1 border-success"
            style={{
              width: '150px',
              height: '150px',
            }}
          />
        </Grid>
        <Grid item xs={4}>
          {mostrarFoto ? (
            <>
              {photo && (
                <img
                  src={photo}
                  alt="Captura de la cámara"
                  className="border border-5 border-success img-fluid"
                  style={{
                    width: '150px',
                    height: '150px',
                  }}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </Grid>

        {idFuente === '1' ? (
          <></>
        ) : (
          <>
            {enlistado !== undefined ? (
              <>
                <Grid item xs={4}>
                  {enlistado ? (
                    <>
                      <img src={check} alt="ENLISTADO" className="img-fluid" />
                    </>
                  ) : (
                    <>
                      <img
                        src={error}
                        alt="NO ENLISTADO"
                        className="img-fluid"
                      />
                    </>
                  )}
                </Grid>
              </>
            ) : (
              <></>
            )}
          </>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="info" onClick={tomarFoto}>
            <RadioButtonCheckedIcon />
            &nbsp; Tomar foto
          </Button>
        </Grid>
        <Grid item xs={12} className="mt-2">
          <Button variant="contained" color="secondary" onClick={changeCamera}>
            Cambiar Cámara
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
