import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'

import Formulario from './components/Formulario'
import Resultados from './components/Resultados'
import Spinner from './components/Spinner'

const Contenedor = styled.div `
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
` 

const Imagen = styled.img`
  max-width: 480px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  color: #fff;
  text-align: center;
  font-weight: 700;
  matgin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)
  
  useEffect(() => {
    if (Object.keys(monedas).length > 0 ) {

      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})
        
        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const resp = await fetch(url)
        const resul = await resp.json()

        setResultado(resul.DISPLAY[criptomoneda][moneda])

        setCargando(false)

      }
      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt='imagen de criptos' />
      <div>
        <Heading>Cotizador de Criptomonedas al instante</Heading>

        <Formulario 
          setMonedas={setMonedas}
        />

          {cargando && <Spinner />}

        {resultado.PRICE && <Resultados resultado={resultado}/>}
      </div>
   </Contenedor>
  )
}

export default App
