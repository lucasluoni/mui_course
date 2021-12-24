import { Grid } from '@mui/material'
import React, {useEffect} from 'react'
import { UseForm, Form } from './../../components/UseForm'
import Controls from './../../components/controls/Controls'
import * as employeeService from './../../services/EmployeeService'

const genderItems = [
  {id: 'male', title: 'Male'},
  {id: 'female', title: 'Female'},
  {id: 'other', title: 'Other'}
]

const initialFValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false
}

export default function EmployeeForm(props) {

  const {addOrEdit, recordForEdit} = props

  const validate = (fieldValues = values) => {
    let temp = {...errors}
    if ('fullName' in fieldValues)
    temp.fullName = fieldValues.fullName ? '' : 'This field is required.'
    if ('email' in fieldValues)
    temp.email = (/$ˆ|.+@.+..+/).test(fieldValues.email) ? '' : 'Email is not valid.'
    if ('mobile' in fieldValues)
    temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required'
    if ('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'This field is required'
    setErrors({
      ...temp
    })
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '')
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputchange,
    resetForm
  } = UseForm(initialFValues, true, validate)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (validate()) {
      addOrEdit(values, resetForm)
    }
  }

  useEffect(()=> {
    if (recordForEdit !== null) {
      setValues({...recordForEdit})
    }
  },[recordForEdit])

  return (
    <Form onSubmit={handleSubmit} >
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='fullName'
            label='Full Name'
            value={values.fullName}
            onChange={handleInputchange}
            error={errors.fullName}
            />
          <Controls.Input
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputchange}
            error={errors.email}
            />
          <Controls.Input
            label='Mobile'
            name='mobile'
            value={values.mobile}
            onChange={handleInputchange}
            error={errors.mobile}
          />
          <Controls.Input
            label='City'
            name='city'
            value={values.city}
            onChange={handleInputchange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='gender'
            label='Gender'
            value={values.gender}
            onChange={handleInputchange}
            items={genderItems}
          />
          <Controls.Select
            name='departmentId'
            label='Department'
            value={values.departmentId}
            onChange={handleInputchange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          {/* <Controls.DatePicker
            name='hireDate'
            label='Hire'
            value={values.hireDate}
            onChange={handleInputchange}
          /> */}
          <Controls.Switch
            name='isPermanent'
            label='Permanent employee'
            values={values.isPermanent}
            onChange={handleInputchange}
          />
          <div>
            <Controls.Button
              type='submit'
              text='Submit'
              />
            <Controls.Button
              text='Reset'
              color='text'
              onClick={resetForm}
            />
          </div>

        </Grid>
      </Grid>
    </Form>
  )
}
