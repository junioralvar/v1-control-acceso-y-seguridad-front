import { Paper } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import logo from '../archivos/logo-oficial.png'
import './login.css'

export const Login = ({ setUser, setPass, enviarCredenciales }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      enviarCredenciales()
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-md-12 mt-5">
            <center>
              <Paper elevation={9} className="p-4 div-paper">
                <div className="row">
                  <div className="col-md-12">
                    <img src={logo} alt="" className="login mt-5" />
                    <Typography
                      className="mt-5 fw-bold  text-center"
                      variant="h5"
                    >
                      Inicio de sesión
                    </Typography>
                    <div className="input-group mb-3 mt-5 p-2 div-input">
                      <span className="input-group-text" id="basic-addon1">
                        <AccountCircleIcon />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Usuario"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setUser(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3 p-2 div-input">
                      <span className="input-group-text" id="basic-addon1">
                        <LockIcon />
                      </span>
                      <input
                        onKeyDown={handleKeyPress}
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        aria-label="password"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setPass(e.target.value)}
                      />
                    </div>
                    <Button
                      className="m-2"
                      variant="contained"
                      color="error"
                      onClick={enviarCredenciales}
                    >
                      <LockOpenIcon /> Ingresar
                    </Button>
                  </div>
                </div>
              </Paper>
            </center>
          </div>
        </div>
      </div>
    </>
  )
}
