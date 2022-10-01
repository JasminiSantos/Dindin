import { converterMoeda, gerarEntrada, gerarSaida, gerarSaldo} from '../conversoes';

function Resume({registros, setMostrarModal}){
  

    return (
      <div className="resume-section">
        <div className="container-resume">
          <h2 className='resume-title'>Resumo</h2>
  
          <div className="entrada">
            <span>Entrada</span>
            <span className="in">{converterMoeda(gerarEntrada(registros))}</span>
          </div>
                
          <div className="saida">
            <span>Saída</span>
            <span className="out">{converterMoeda(gerarSaida(registros))}</span>
          </div>
                
          <div className="saldo">
            <span>Saldo</span>
            <span className="balance">{converterMoeda(gerarSaldo(registros))}</span>
          </div>
        </div>
        <button 
        onClick={()=> setMostrarModal(true)} 
        className="btn-add">Adicionar Registro</button>
      </div>
    )
  }

export default Resume;