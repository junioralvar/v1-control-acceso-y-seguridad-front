export const API_URL = process.env.REACT_APP_API
export const API_URL_WEBSOCKET = process.env.REACT_APP_WEB_SOCKET
export const API_URL_FOTO = process.env.REACT_APP_API + `/archivo/find-by-id/`
export const API_URL_WEBSOCKET_SALA_1 = `/topic/messages/`

export const Elementos1 = 10
export const Elementos2 = 50
export const Elementos3 = 100
export const widthCamera = 720
export const heightCamera = 720

export const EVENTO_MODEL = {
  tipoEventoId: 1,
  nombre: '',
  fechaInicio: '',
  fechaFin: '',
  tipoFuenteId: 1,
  fuente: null,
  estado: true,
  usuarioCreacion: localStorage.getItem('usuarioId') || 1,
}
export const PUERTA_MODEL = {
  nombre: '',
  direccion: '',
  eventoId: 1,
  usuarioCreacion: localStorage.getItem('usuarioId') || 1,
}

export const PERSONA_MODEL = {
  usuarioCreacion: localStorage.getItem('usuarioId') || 1,
  tipoPersonaId: 1,
  tipoDocumentoId: 1,
  nroDoc: '',
  cip: '',
  paterno: '',
  materno: '',
  nombres: '',
}
export const ACTIVO_MODEL = {
  usuarioCreacion: localStorage.getItem('usuarioId') || 1,
  tipoActivoId: 2,
  marca: '',
  modelo: '',
  serie: '',
  codActivo: '',
  fotografia: '',
  personaId: 1,
}
export const INGRESO_MODEL = {
  marcaTemporal: null,
  placa: '',
  puertaId: parseInt(localStorage.getItem('valuePuerta'), 10) || 1,
  observaciones: '',
  usuarioCreacion: parseInt(localStorage.getItem('usuarioId'), 10) || 1,
  destinoId: 1,
  agenteId: parseInt(localStorage.getItem('usuarioId'), 10) || 1,
  eventoId: parseInt(localStorage.getItem('valueEvento'), 10) || 1,
  motivo: '',
  menores: 0,
  mascotas: 0,
  mayores: 0,
}

export const SALIDA_MODEL = {
  marcaTemporal: null,

  puertaId: 1,
  observaciones: '',
  usuarioCreacion: localStorage.getItem('usuarioId') || 1,
  agenteId: localStorage.getItem('usuarioId') || 1,
}

export const DESTINO_MODEL = {
  usuarioCreacion: localStorage.getItem('usuarioId') || 1,
  nombre: '',
  eventoId: 1,
}

export const CONTROL_MODEL = {
  control: {
    tipoControlId: 1,
    marcaTemporal: null,
    agenteId: localStorage.getItem('usuarioId') || 1,
    eventoId: localStorage.getItem('valueEvento') || 1,
    puertaId: localStorage.getItem('valuePuerta') || 1,
    destinoId: 1,
    fotografia: '',
    motivo: '',
    menores: 0,
    mayores: 0,
    mascotas: 0,
    placa: '',
    observaciones: '',
    usuarioCreacion: localStorage.getItem('usuarioId') || 1,
  },
  persona: {
    destacado: true,
    usuarioCreacion: localStorage.getItem('usuarioId') || 1,
    tipoPersonaId: 1,
    tipoDocumentoId: 1,
    nroDoc: '',
    cip: '',
    paterno: '',
    materno: '',
    nombres: '',
  },
  activoList: [
    {
      destacado: true,
      usuarioCreacion: localStorage.getItem('usuarioId') || 1,
      tipoActivoId: 2,
      marca: '',
      modelo: '',
      serie: '',
      codActivo: '',
      fotografia: '',
      personaId: 1,
    },
  ],
  enlistado: true,
}

// DOCKERIZANDO 30-05-2024
// docker build -t rjalvarez13/cas-front-prod:1.1.6 -f Dockerfile.prod .
// docker build -t rjalvarez13/cas-front-test:1.2.0 -f Dockerfile.test .

// docker push rjalvarez13/cas-front-prod:1.1.6
// docker push rjalvarez13/cas-front-test:1.2.0
