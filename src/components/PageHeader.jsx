import React from 'react'
import { Paper, Card, Typography } from '@mui/material'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles( theme => ({
  root: {
    backgroundColor: '#fdfdff',
    marginTop: '64px'
  },
  pageHeader: {
    // padding: theme.spacing(4),
    padding: '0',
    display: 'grid',
    marginBottom: theme.spacing(2) 
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3c44b1'
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6'
    }
  }
}))

export default function PageHeader(props) {
  
  const classes = useStyles()
  const { title, subtitle, icon } = props
  return (
    <div>
      <Paper elevation={0} square className={classes.root} >
        <div className={classes.pageHeader}>
          <Card className={classes.pageIcon}>
            {icon}
            <div>
              <Typography
                variant='h6'
                component='div'
              >{title}</Typography>
              <Typography
                variant='subtitle2'
                component='div'
              >{subtitle}</Typography>
            </div>
          </Card>
        </div>
      </Paper>
    </div>
  )
}
