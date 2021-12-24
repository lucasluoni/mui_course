import React from 'react'
import {Button as MuiButton} from '@mui/material'
import { makeStyles } from '@mui/styles'

export default function ActionButton(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 0,
      margin: theme.spacing(0.5)
    },
    secondary: {
      backgroundColor: theme.palette.secondary.light,
      '& .MuiButton-label': {
        color: theme.palette.secondary.main,
      }
    },
    primary: {
      backgroundColor: theme.palette.primary.light,
      '& .MuiButton-label': {
        color: theme.palette.primary.main,
      }
    },
  }) )

  const { color, children, onClick } = props
  const classes = useStyles()
  
  return (
    <MuiButton className={`${classes.root} ${classes[color]}`}
      onClick={onClick}>
      {children}
    </MuiButton>
  )
}
