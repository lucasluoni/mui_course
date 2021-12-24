import React, {useState} from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from './../../components/PageHeader'
import UseTable from './../../components/UseTable'
import Notification from './../../components/Notification'
import * as employeeService from './../../services/EmployeeService'
import Controls from './../../components/controls/Controls'
import Popup from '../../components/Popup'
import ConfirmDialog from './../../components/ConfirmDialog'
import {InputAdornment, Paper, TableBody, TableCell, TableRow, Toolbar} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Search } from '@mui/icons-material'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone'
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute !important',
    right: '10px' 
  }
}))

const headCells = [
  {id: 'fullName', label: 'Employee Name'},
  {id: 'email', label: 'Email Address (Personal)'},
  {id: 'mobile', label: 'Mobile Number'},
  {id: 'department', label: 'Department'},
  {id: 'actions', label: 'Actions', disableSorting: true}
]

export default function Employees() {
  
  const classes = useStyles()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState(employeeService.getAllEmployees())
  const [filterFn, setFilterFn] = useState({fn: items => {return items}})
  const [openPopup, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaginationAndSorting, 
  } = UseTable(records,headCells,filterFn)

  const handleSearch = (e) => {
    let target = e.target
    setFilterFn({
      fn: items => {
        if (target.value === '') {
          return items
        } else {
          return items.filter((x)=> x.fullName.toLowerCase().includes(target.value))
        }
      }
    })
  }

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) {
      employeeService.insertEmployee(employee)
    } else {
      employeeService.updateEmployee(employee)
    }
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
    setRecords(employeeService.getAllEmployees())
    setNotify({
      isOpen: true,
      message: 'Submitted Succesfully',
      type: 'success'
    })
  }

  const openInPopup = (item) => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
      })
      employeeService.deleteEmployee(id)
      setRecords(employeeService.getAllEmployees())
      setNotify({
        isOpen: true,
        message: 'Deleted Succesfully',
        type: 'error'
      })
    }
  
  return (
    <>
      <PageHeader
        className={classes.pageHeader}
        title='New Employee'
        subtitle='Form with validation'
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent} >
        <Toolbar>
          <Controls.Input
            label='Search employees'
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
            )
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text='Add New'
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => { setOpenPopup(true);setRecordForEdit(null)}}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterPaginationAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color='primary'
                      onClick={()=>{openInPopup(item)}}>
                      <EditOutlinedIcon fontSize='small' />  
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color='secondary'
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to delete this record?',
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {onDelete(item.id)}
                        })
                      }}>
                      <CloseIcon fontSize='small' />  
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup 
        title='Employee Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm
        recordForEdit={recordForEdit}
        addOrEdit={addOrEdit} />
      </Popup> 
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  )
}
