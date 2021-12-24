import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import Controls from './controls/Controls'
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0'
  }
}))

export default function Popup(props) {

  const { title, children, openPopup, setOpenPopup } = props
  const classes = useStyles()
  
  return (
    <Dialog open={openPopup} maxWidth='md' classes={{paper:classes.dialogWrapper}} >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{display:'flex'}}>
          <Typography variant='h6' component='div' style={{flexGrow:1}}>
            {title}
          </Typography>
          <Controls.ActionButton
            color='primary'
            onClick={()=> {setOpenPopup(false)}}
          >
            <CloseIcon /> 
          </Controls.ActionButton>
        </div>        
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}
