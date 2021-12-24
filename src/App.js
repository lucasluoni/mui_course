import React from 'react'
import  './index.css'
import { CssBaseline, ThemeProvider } from '@mui/material';
import {makeStyles} from '@mui/styles';
import {createTheme} from '@mui/material/styles'
import Header from './components/Header'
import Employees from './pages/Employees/Employees';

const theme = createTheme({
  pallete: {
    primary: {
      main: '#333996',
      light: '#3c44b126'
    },
    secondary: {
      main: '#f83245',
      light: '#f83245'
    },
    background: {
      dafault: '#f4f5fd'
    },
    overrides: {
      MuiAppBar: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    // paddingLeft: '320px',
    width: '100%'
  },
  pageHeader: {
    marginTop: '68px',
    // width: '100%'
  }
})

export default function App() {
  const classes = useStyles()

  return (
      <ThemeProvider theme={theme} >
        <div className={classes.appMain}>
          <Header />

        <Employees />
        </div>
      <CssBaseline />
      </ThemeProvider>
  );
}
