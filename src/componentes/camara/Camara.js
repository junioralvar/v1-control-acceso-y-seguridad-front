import { Button } from '@mui/material'
import React, { useEffect, useRef } from 'react'

// ESTE NO ES

export const MyCamara = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    startCamera()
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const takePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Puedes obtener la imagen en base64 o como Blob, según tus necesidades
    const dataURL = canvas.toDataURL('image/jpeg')
    // Opcionalmente, puedes crear un Blob a partir de la imagen:
    // const blob = dataURItoBlob(dataURL);

    // Aquí puedes trabajar con la imagen o enviarla a un servidor, etc.
  }

  return (
    <div style={{ padding: '50px' }}>
      {/* <button onClick={startCamera}>Iniciar cámara</button> */}
      <Button onClick={takePhoto}>Tomar foto</Button>
      <video ref={videoRef} autoPlay style={{ width: '300px' }}></video>
      {/* <canvas ref={canvasRef} style={{ display: "none" }}></canvas> */}
    </div>
  )
}
