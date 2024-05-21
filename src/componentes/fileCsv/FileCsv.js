import { useDropzone } from 'react-dropzone'
import PublishIcon from '@mui/icons-material/Publish'
import { useGlobalState } from '../../AppContext'

export const FileCsv = ({ onFileUpload }) => {
  const { statusText, setStatusText, setSendCsv } = useGlobalState()
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'text/csv, application/csv, application/vnd.ms-excel',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        // Verificar si el archivo es CSV
        if (
          file.type === 'text/csv' ||
          file.type === 'application/csv' ||
          file.type === 'application/vnd.ms-excel'
        ) {
          setStatusText('Archivo subido con éxito!')
          setSendCsv(true)
        } else {
          setStatusText('Formato denegado')
          setSendCsv(false)
        }
        onFileUpload(file)
      }
    },
  })

  return (
    <div
      {...getRootProps()}
      style={{ height: '40px', paddingTop: '5px' }}
      className="bg-success text-white text-center fw-bold rounded  "
    >
      <input {...getInputProps()} />
      <p>
        <PublishIcon /> {statusText}
      </p>
    </div>
  )
}
