

import React, { useEffect, useState } from 'react';
import GeneralTable from './../components/generalTable';
import CryptoApi from '../api';
import { Alert, AlertTitle,CircularProgress,Select, MenuItem, FormControl,InputLabel } from '@mui/material';
const Crypto = () => {
    const [data, setData]= useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [selectedOption, setSelectedOption] = useState('usd');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const getCryptoData = async(data )=>{
      const params=  {
          vs_currency: data?data:'usd', 
          order: 'market_cap_desc', // Order by market cap in descending order
          per_page: rowsPerPage, // Display top 10 cryptocurrencies
          page: page +1,
          sparkline: false,
        }
        try {
            const response = await CryptoApi.getCoinsMarket(params);
            console.log(response);
            setData(response);
          } catch (error) {
            console.log(error.message);
            setError('An error occurred while fetching data from the API.'); // error message
          }finally {
            setLoading(false); // Set loading to false when done (in both cases i.e. success or error)
          }
        
        }
      
        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
            getCryptoData(event.target.value);
          };
        useEffect(()=>{
        getCryptoData()
        },[])

  return(
    <>
     {loading ? ( 
        <div className="loaderStyle">
        <CircularProgress className="loader" />
      </div>
      ) :error ? ( 
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : (
        <>
        <FormControl >
   
      <Select
        labelId="select-label"
        id="select"
        value={selectedOption}
        onChange={handleOptionChange}
        label="Select currency"
        className='dropEnd'
      >
        <MenuItem value="usd">USD</MenuItem>
        <MenuItem value="eur">EUR</MenuItem>
        <MenuItem value="jpy">JPY</MenuItem>
      </Select>
    </FormControl>
        <GeneralTable  data={data} getCryptoData={getCryptoData} selectedOption={selectedOption} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} setPage={setPage} page={page}/>
        </>
      )}
      </>
  )

};

export default Crypto;