import {useState} from 'react';
import FilterButtons from "./filterButtons";
function FilterContainer({transactions, setArrayFiltrado, setFiltro }){
    const [valorMinimo, setValorMinimo] = useState();
    const [valorMaximo, setValorMaximo] = useState();

  
    function filtrarValores(transactions){
      const transacoes = transactions.filter((transaction) => Number(transaction.value) >= valorMinimo);
      const transacoesFiltradas = transacoes.filter((transaction) => Number(transaction.value) <= valorMaximo);
      setArrayFiltrado(transacoesFiltradas);
    }
    return (
      <div className="container-filters">
        <div className="first-filter-section">
          <h2 className="filter-section-title">Dia de Semana</h2>
          <div className="filter-section">
            <div className="left-section">
              <FilterButtons info="Segunda"/>
              <FilterButtons info="Terça"/>
              <FilterButtons info="Quarta"/>
              <FilterButtons info="Quinta"/>
            </div>
            <div className="right-section">
              <FilterButtons info="Sexta"/>
              <FilterButtons info="Sábado"/>
              <FilterButtons info="Domingo"/>
            </div>   
          </div>
        </div>
        <div className="second-filter-section">
          <h2 className="filter-section-title">Categoria</h2>
          <div className="filter-section">
            <div className="left-section">
              <FilterButtons info="Contas"/>
              <FilterButtons info="Lazer"/>
              <FilterButtons info="Compras"/>
              <FilterButtons info="Alimentação"/>
            </div>
            <div className="right-section">
              <FilterButtons info="Depósito"/>
              <FilterButtons info="TED"/>
              <FilterButtons info="Pix"/>
            </div>   
          </div>
        </div>
        <div className="third-filter-section">
          <h2 className="filter-section-title">Categoria</h2>
          <div className="filter-section">
            <div className="left-section">
              <div className="label-value">
                <label>Min</label>
                <input 
                id="min-value"
                onChange={(event)=> setValorMinimo(event.target.value)} 
                type="number" 
                alt="Min input"
                />
              </div>
              <div className="label-value">
                <label>Max</label>
                <input 
                id="max-value"
                onChange={(event) => setValorMaximo(event.target.value)} 
                type="number" 
                alt="Max input"
                />
              </div>
              <div className="btns-filter">
                <input 
                className="btn-clear-filters" 
                value="Limpar Filtros" 
                onClick={()=> setFiltro(false)}
                type="button" 
                alt="botão limpar"
                />
                <input 
                className="btn-apply-filters"
                onClick={()=> {
                  filtrarValores(transactions);
                  setFiltro(true);
                }} 
                value="Aplicar Filtros" 
                type="button" 
                alt="botão aplicar filtros"
                />
              </div>
            </div>  
          </div>
        </div>
      </div>
    )
  }
export default FilterContainer;