import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { API_URL } from '../const'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export const ArchivoButton = ({
  archivoId,
  setArchivoId,
  textButton,
  tipoArchivo,
}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [objectUrl, setObjectUrl] = useState('')

  useEffect(() => {
    obtenerArchivo()
  }, [archivoId])

  useEffect(() => {
    guardarArchivo()
  }, [selectedFile])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const guardarArchivo = () => {
    const usuarioId = localStorage.getItem('usuarioId')
    const endpoint = `archivo/save/${usuarioId}`
    if (selectedFile) {
      const formData = new FormData()
      formData.append('files', selectedFile)

      axios
        .post(API_URL + endpoint, formData, {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setArchivoId(response.data[0].id)
        })
        .catch((error) => {
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
        })
    }
  }

  const obtenerArchivo = async () => {
    if (!archivoId) return
    try {
      const endpoint = `${API_URL}archivo/find-by-id/${archivoId}`
      const response = await axios.get(endpoint, {
        responseType: 'arraybuffer',
        headers: { Authorization: localStorage.getItem('token') },
      })

      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      })
      setObjectUrl(URL.createObjectURL(blob))
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Alerta',
        text: error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#1565C0',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    }
  }

  return (
    <>
      <Button
        component="label"
        variant="contained"
        onChange={handleFileChange}
        startIcon={<CloudUploadIcon />}
      >
        {textButton}
        <VisuallyHiddenInput
          type="file"
          accept={tipoArchivo === 'all' ? '' : 'application/pdf'}
        />
      </Button>

      {!!objectUrl ? (
        <a target="_blank" rel="noopener noreferrer" href={objectUrl}>
          Ver archivo
        </a>
      ) : (
        <small>No se cargó ningún archivo</small>
      )}
    </>
  )
}

export const ArchivoVisualizador = ({ archivoId }) => {
  const [objectUrl, setObjectUrl] = useState('')

  useEffect(() => {
    obtenerArchivo()
  }, [archivoId])

  const obtenerArchivo = async () => {
    if (!archivoId) return
    try {
      const endpoint = `${API_URL}archivo/find-by-id/${archivoId}`
      const response = await axios.get(endpoint, {
        responseType: 'arraybuffer',
        headers: { Authorization: localStorage.getItem('token') },
      })

      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      })
      setObjectUrl(URL.createObjectURL(blob))
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Alerta',
        text: error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#1565C0',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    }
  }

  return (
    <>
      <iframe
        src={objectUrl}
        frameborder="0"
        width="100%" // Ajusta el ancho según tus necesidades
        height="100%" // Ajusta la altura según tus necesidades
        style={{ overflow: 'hidden' }}
        title="myFrame"
      ></iframe>
    </>
  )
}

export const ArchivoDescargar = ({ archivoId }) => {
  const [objectUrl, setObjectUrl] = useState('')

  useEffect(() => {
    obtenerArchivo()
  }, [archivoId])

  const obtenerArchivo = async () => {
    if (!archivoId) return
    try {
      const endpoint = `${API_URL}archivo/find-by-id/${archivoId}`
      const response = await axios.get(endpoint, {
        responseType: 'arraybuffer',
        headers: { Authorization: localStorage.getItem('token') },
      })

      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      })
      setObjectUrl(URL.createObjectURL(blob))
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Alerta',
        text: error.response.data.mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#1565C0',
        showConfirmButton: true,
        timer: 3500,
        timerProgressBar: true,
      })
    }
  }

  return (
    <>
      {!!objectUrl ? (
        <a target="_blank" rel="noopener noreferrer" href={objectUrl}>
          Ver archivo
        </a>
      ) : (
        <small>No se cargó ningún archivo</small>
      )}
    </>
  )
}
