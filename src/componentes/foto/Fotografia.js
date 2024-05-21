import { useEffect, useState } from 'react'
import { API_URL_FOTO } from '../../const'
import axios from 'axios'

export const Fotografia = ({ uuid }) => {
  const [imagenUrl, setImagenUrl] = useState(null)
  useEffect(() => {
    if (uuid !== '') getFoto()
  }, [uuid])

  const getFoto = async () => {
    try {
      const config = {
        responseType: 'arraybuffer',
        headers: {
          Authorization: localStorage.getItem('miToken'),
        },
      }
      const response = await axios.get(API_URL_FOTO + uuid, config)

      const blob = new Blob([response.data], { type: 'image/jpg' })
      const imageUrl = URL.createObjectURL(blob)
      setImagenUrl(imageUrl)
    } catch (error) {}
  }

  return (
    <>
      {imagenUrl !== null ? (
        <a target="_blank" style={{ textDecoration: 'none' }} href={imagenUrl}>
          <img
            src={imagenUrl}
            alt="No existe foto"
            style={{ height: '200px' }}
            className="rounded-circle"
          />
        </a>
      ) : (
        <></>
      )}
    </>
  )
}
