import axios from "axios"

const CryptoApi ={
   getCoinsMarket:async(params)=>{
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}coins/markets`,
        {
          params: params
         
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  
    }
}
export default CryptoApi