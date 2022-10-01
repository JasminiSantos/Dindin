import './App.css';
import {useState, useEffect} from 'react';
import Header from './components/header';
import FilterSectionButton from './components/filterSectionButton';
import FilterContainer from './components/filterContainer';
import TableLine from './components/tableLine';
import ModalRegistro from './components/modalRegistro';
import Resume from './components/resume';

function App() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalDelete, setMostrarModalDelete] = useState();
  const [transactions, setTransactions] = useState([]);
  const [secaoFiltro, setSecaoFiltro] = useState(false);
  const [transacoesOrdenadas, setTransacoesOrdenadas] = useState([]);
  const [transacoesDesordenadas, setTransacoesDesordenadas] = useState([]);
  const [ordenada, setOrdenada] = useState(false);
  const [desordenada, setDesordenada] = useState(false);
  const [filtro, setFiltro] = useState(false);
  const [arrayFiltrado, setArrayFiltrado] = useState([]);
  
  function ordenadaData(){
    const transacoes = transactions.sort((a,b)=> {
      return new Date(a.date) - new Date(b.date)
    });
    setTransacoesOrdenadas(transacoes);  
  }
  function desordenadaData(){
    const transacoes = transactions.sort((a,b)=> {
      return new Date(b.date) - new Date(a.date)
    });
    setTransacoesDesordenadas(transacoes);  
  }
  function ordenadaValor(){
    const transacoes = transactions.sort((a,b)=> {
      return a.value - b.value;
    });
    setTransacoesOrdenadas(transacoes);  
  }
  function desordenadaValor(){
    const transacoes = transactions.sort((a,b)=> {
      return b.value - a.value;
    });
    setTransacoesDesordenadas(transacoes);  
  }
  function ordenadaDia(){
    const transacoes = transactions.sort((a,b)=> {
      return (new Date(a.date).getDay() - (new Date(b.date)).getDay());
    });
    setTransacoesOrdenadas(transacoes);  
  }
  function desordenadaDia(){
    const transacoes = transactions.sort((a,b)=> {
      return (new Date(b.date)).getDay() - (new Date(a.date)).getDay();
    });
    setTransacoesDesordenadas(transacoes);  
  }
  
  
  function handleClickData(){
    if(ordenada){
      desordenadaData();
      setDesordenada(true);
      setOrdenada(false);
      return;      
    }
    ordenadaData();
    setOrdenada(true);
    setDesordenada(false);
  }
  
  
  function handleClickValor(){
    if(ordenada){
      desordenadaValor();
      setDesordenada(true);
      setOrdenada(false);
      return;      
    }
    ordenadaValor();
    setOrdenada(true);
    setDesordenada(false);
  }


  function handleClickDia(){
    if(ordenada){
      desordenadaDia();
      setDesordenada(true);
      setOrdenada(false);
      return;      
    }
    ordenadaDia();
    setOrdenada(true);
    setDesordenada(false);
  }

  let registros = [];

  if(ordenada){
    registros = transacoesOrdenadas;
  }
  else if(desordenada){
    registros = transacoesDesordenadas;
  }
  else if(!ordenada && !desordenada){
    registros = transactions;
  }

  if(filtro){
    registros = arrayFiltrado;
  }

  useEffect( () => { 
    loadTransactions();
  }, [])

  async function loadTransactions(){
    try {
      const response = await fetch('http://localhost:3333/transactions', {
      method: 'GET'
      });
      console.log(response)
      const data = await response.json();
      
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleCreateTransaction(formData){

    try {
      const response = await fetch('http://localhost:3333/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      setTransactions((prevState)=> [...prevState, data]);

    } catch (error) {
      console.log(error)
    }
  }
  
  async function handleDeleteTransaction(transactionId){
    try {
      await fetch(`http://localhost:3333/transactions/${transactionId}`, {
      method: 'DELETE'
      });

      setTransactions((prevState)=> prevState.filter((transaction) => transaction.id !== transactionId));
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEditTransaction(formData, transactionId){
    try {
      await fetch(`http://localhost:3333/transactions/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      });

      loadTransactions();

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="background">
      <Header/>
      <main>
        <FilterSectionButton 
        setSecaoFiltro={setSecaoFiltro}
        secaoFiltro={secaoFiltro}
        />
        <div className="content">
          <div className="left-content">
            {secaoFiltro && <FilterContainer 
            transactions={transactions}
            filtro={filtro}
            setFiltro={setFiltro}
            arrayFiltrado={arrayFiltrado}
            setArrayFiltrado={setArrayFiltrado} 
            />}
            <div className="table">
              <div className="table-head">
                  <div className="column-title" id="date" onClick={()=> handleClickData()}>Data</div>
                  <div className="column-title" id="week-day" onClick={()=> handleClickDia()}>Dia da semana</div>
                  <div className="column-title">Descrição</div>
                  <div className="column-title">Categoria</div>
                  <div className="column-title last" id="value" onClick={()=> handleClickValor()}>Valor</div>
              </div>
                <div className="table-body">
                    {registros.map((transaction) =>{
                      return(
                      <TableLine 
                      key={transaction.id} 
                      setIdModalDelete={setMostrarModalDelete}
                      idModalDelete={mostrarModalDelete}
                      handleDeleteTransaction={handleDeleteTransaction}
                      handleEditTransaction={handleEditTransaction}
                      transaction={transaction}
                      />
                      )
                    })}
                </div>
            </div>
        </div>
          <div className="right-content">
            <Resume 
            setMostrarModal={setMostrarModal}
            registros={registros}
            />
          </div>
        </div>
      </main>
      {mostrarModal && <ModalRegistro 
      setMostrarModal={setMostrarModal} 
      handleCreateTransaction={handleCreateTransaction}
      />}
      
    </div>
  );
}

export default App;
