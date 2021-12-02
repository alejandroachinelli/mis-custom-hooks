import { useEffect, useRef, useState } from 'react'

export const useFetch = (url) => {

    //Se uso el useRef para que cuando el usuario llame a montar el componente, pero antes de que se monte
    //el usuario haga click para desmontarlo (o cuando el usuario hace una peticion y lo cierra antes de que se cumpla)
    //se pueda evitar un error por haber cancelado antes la peticion
    const isMounted = useRef(true);

    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({data: null, loading: true, error: null});

        fetch(url)
            .then( resp => resp.json())
            .then(data => {
                setTimeout(() => {
                    if(isMounted.current){
                        setState({
                            loading: false,
                            error: null,
                            data
                        })
                    }
                });
            })
    }, [url])

    return state;

}
