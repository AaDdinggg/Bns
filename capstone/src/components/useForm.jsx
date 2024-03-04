import React, {useState} from 'react'

export default function useForm() {

    const [values, setValues] = useState(initialFValues);

    const handleChange = (field, value) => {
        setValues((prevValues) => ({
          ...prevValues,
          [field]: value,
        }));
      };

  return {
    values,
    setValues,
    handleChange,

  }
}
