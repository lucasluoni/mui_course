import React from 'react'
import {AppBar, Toolbar, Grid, InputBase, IconButton, Badge} from '@mui/material';
import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff !important',
    transform: 'translateZ(0)'
  },
  searchInput: {
    opacity: '0.6',
    padding: '0 8px',
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2 !important'
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px'
    }
  }
})

export default function Header() {
  const classes = useStyles()
  return (
    <AppBar postion='static' className={classes.root} >
      <Toolbar >
        <Grid container>
        <Grid item>
          <InputBase
              placeholder='Search topics'
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize='small' /> }  
          />
        </Grid>
        <Grid item sm></Grid>
          <Grid item alignItems='center' >
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon fontSize='small' />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="secondary">
                <FlashAutoIcon fontSize='small' />
              </Badge>
            </IconButton>
            <IconButton>
                <PowerSettingsNewIcon fontSize='small' />
            </IconButton>
        </Grid>
        </Grid>
      </Toolbar> 
      




    </AppBar>
    )
}
