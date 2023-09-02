import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableSortLabel ,TableContainer,TablePagination, TableHead, TableRow, Paper } from '@mui/material';

const GeneralTable = ({ data, handleRowClick,getCryptoData,selectedOption, setPage, page, setRowsPerPage, rowsPerPage }) => {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
  console.log(data)

  const columns = Object.keys(data[0]).slice(0, 6);
console.log(columns)
const formatHeaderLabel = (label) => {
  // Remove underscores and capitalize words
  return label.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};
const formatCellValue = (column, value) => {
  if (column === 'current_price') {
    return `${(selectedOption).toUpperCase()} ${value}`; 
  }
  return value;
};
const handleChangePage = (event, newPage) => {
  setPage(newPage);
  getCryptoData(selectedOption)
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0); // Reset page when changing rowsPerPage
};

//sorting for column

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = data.slice().sort((a, b) => {
    if (orderBy === 'current_price' ) {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      return (aValue - bValue) * (order === 'asc' ? 1 : -1);
    }
   
    return 0;
  });
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                 <TableCell key={index}>
                 {column === 'current_price' ? (
                   <TableSortLabel
                     active={orderBy === column}
                     direction={orderBy === column ? order : 'asc'}
                     onClick={() => handleSort(column)}
                   >
                     {formatHeaderLabel(column)}
                     
                   </TableSortLabel>
                 ) : (
                   formatHeaderLabel(column)
                 )}
               </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
        
              {sortedData.map((row, rowIndex) => (
         
                <TableRow key={rowIndex} onClick={() => handleRowClick(row)}>

                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      
                       {typeof row[column] === 'object' ? (
                      null
                    ) : (
                      formatCellValue(column, row[column])
                    )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count='100' 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default GeneralTable;