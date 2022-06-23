import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import selectMonedas from '../hooks/selectMonedas'
import {Monedas} from '../data/monedas'

const BotonEnviar = styled.input`
    background-color: #9897ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weght: 700;
    text-transform: uppercase;
    font-size:20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #747dfe;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {  

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [moneda, SelectMonedas] = selectMonedas('Elige tu moneda',Monedas);
  const [criptomoneda, SelectCripto] = selectMonedas('Elige tu criptomoneda',criptos);

  useEffect(() => {
    const consultadoAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCriptos = resultado.Data.map( cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        
        return objeto
      })

      setCriptos(arrayCriptos)

    }

    consultadoAPI()
  },[])

  const handleSubmit = e => {
    e.preventDefault()

    if ([moneda, criptomoneda].includes('')) {
      setError(true)

      return
    }
    setError(false)

    setMonedas({
      moneda,
      criptomoneda
    })
  }

  return (    
    <>      
      {error && <Error>Todos los campos son obligatorios</Error>}

      <form onSubmit={handleSubmit}>
        <SelectMonedas /> 
        <SelectCripto /> 
        
        <BotonEnviar type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default Formulario
