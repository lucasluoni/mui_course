import { NotListedLocation } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Controls from './controls/Controls'

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: 'absolute',
    padding: theme.spacing(2),
    top: theme.spacing(5),
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center'
  },
  dialogTitle: {
    justifyContent: 'center'
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default'
    },
    '& MuiSvgIcon-root': {
      fontSize: '8rem !important'
    }
  }
}))

export default function ConfirmDialog(props) {

  const { confirmDialog, setConfirmDialog } = props
  const classes = useStyles()

  return (
    <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableFocusRipple className={classes.titleIcon}>
          <NotListedLocation />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6' >
          {confirmDialog.title}
        </Typography>
        <Typography variant='subtitle2' >
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text='No'
          color='primary'
          onClick={()=> setConfirmDialog({...confirmDialog,isOpen:false})}
        />
        <Controls.Button
          text='Yes'
          color='secondary'
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  )
}
