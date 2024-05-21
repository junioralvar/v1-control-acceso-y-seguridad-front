import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { useId } from 'react'

export const MyTable = ({
  rows,
  columns,
  component,
  onRowClick,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  totalElements,
}) => {
  const MyRow = ({ row }) => {
    const id = useId()
    return (
      <TableRow
        hover
        onClick={!!onRowClick ? () => onRowClick(row) : undefined}
      >
        {columns.map((col) => (
          <TableCell key={id} style={{ width: col.width }} align={col.align}>
            {!!col.render ? col.render({ row, columns }) : row[col.field]}
          </TableCell>
        ))}
      </TableRow>
    )
  }
  const id = useId()
  return (
    <>
      <Paper elevation={7}>
        <TableContainer component={component}>
          <Table sx={{ minWidth: 700 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={id} align={col.align}>
                    {col.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <MyRow key={id} row={row} />
              ))}
            </TableBody>
          </Table>
          {!!totalElements && (
            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={'Filas por página'}
            />
          )}
        </TableContainer>
      </Paper>
    </>
  )
}
