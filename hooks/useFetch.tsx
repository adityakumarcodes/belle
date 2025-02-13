import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (link:string)=>{
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      setLoading(true);
      const data = await axios.get(link)
        .then(result => setData(result.data))
        .catch(e =>{
          console.log(e);
          setError(e);
        });
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, [link])

    return {data,error,loading}; 
}

export default useFetch;