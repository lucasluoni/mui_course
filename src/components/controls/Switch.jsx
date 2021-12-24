import React from 'react'
import {Switch as MuiSwitch, FormControl, FormLabel, FormControlLabel} from '@mui/material'

export default function Switch(props) {
  const {name, label, value, onChange} = props
  return (
    <FormControl>
      <FormControlLabel
        control={<MuiSwitch
          checked={value}
          name={name}
          onChange={onChange}
        />}
        label={label}
      />
    </FormControl>
      
  )
}
