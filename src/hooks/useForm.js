import { useState, useEffect} from 'react';

function useForm(callback, current= {}){
    const [inputs, setInputs] = useState(current);

    useEffect(()=>{
        console.log(current)
        if (current.getSinglePost){
            delete current.getSinglePost.__typename
            setInputs({...current.getSinglePost})
        }
    }, [current])

    const handleSubmit = (event) => {
        if(event) event.preventDefault();
        callback(inputs);
    }; // cachar el submit de mi formulario

    const handleInputChange = (event) => {
        event.persist();
        const {name, value} = event.target
        setInputs(fields => ({ ...fields,[name]: value })); // se va ejecutar cuando el onchange se ejecute en los inputs y se modifique el valor
    }

    return {
        inputs,
        handleSubmit,
        handleInputChange,
    }
}

export default useForm;