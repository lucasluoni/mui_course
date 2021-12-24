import React, {useState} from 'react'
import { Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      // color: theme.palette.primary.light,
      color: '#311b92',
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: '#ede7f6',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}))

export default function UseTable(records, headCells, filterFn) {

  const classes = useStyles()

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()
  
  const TblContainer = ({children}) => (
    <Table className={classes.table}>
      {children}
    </Table>
  )

  
  const TblHead = (props) => {

    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)
    }

    return (
      <TableHead>
      <TableRow>
        {
          headCells.map(({ id, label }) => (
            <TableCell key={id}
              sortDirection={orderBy === id ? order : false}>
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={() => {handleSortRequest(id)}}
              >
              {label}
              </TableSortLabel>
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>)
  }

  const handleChangePage = (evt, newPage) => {
    setPage(newPage)
  }
  
  const handleChangeRowsPerPage = (evt) => {
    setRowsPerPage(parseInt(evt.target.value,10))
    setPage(0)
  }

  const TblPagination = () => (<TablePagination
    component='div'
    page={page}
    rowsPerPageOptions={pages}
    rowsPerPage={rowsPerPage}
    count={records.length}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />)

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  function getComparator(order, setOrderBy) {
    return order === 'desc'
      ? (a,b) => descendingComparator(a,b,orderBy)
      : (a,b) => -descendingComparator(a,b,orderBy)
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  

  const recordsAfterPaginationAndSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, setOrderBy))
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }


  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaginationAndSorting
  }
}
