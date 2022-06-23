import {useState} from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    color: #fff;
    display: block;
    font-size: 24px;
    font-weith: 700;
    margin: 15px 0px;
`
const Select = styled.select `
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`

const selectMonedas = (label,opciones) => {

    const [state, setState] = useState('');

    const Monedas = () => (
            <>
                <Label>{label}</Label>
                <Select 
                    value={state}
                    onChange={e => setState(e.target.value)}
                >
                    <option value=''>Seleccione ...</option>

                    {opciones.map( op => (
                        <option
                            key={op.id}
                            value={op.id}
                        >{op.nombre}</option>    

                    ))}
                </Select>
            </>
    ) 

    return [state, Monedas]
}

export default selectMonedas
