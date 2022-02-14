import { useState } from "react";

const useForm = (initialState) => {
  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    if(!e){
      setState({})
    }else{
      setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
   
  };

  return [state, handleChange];
};

export default useForm;
