import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

export const CardMui = ({ title, bodyText, textButton, image }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt="green iguana"
          style={{ height: '140px' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bodyText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {textButton}
        </Button>
      </CardActions>
    </Card>
  )
}
