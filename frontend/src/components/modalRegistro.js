import close from "../assets/close.svg";
import ReactInputMask from 'react-input-mask';
import {useState} from 'react';
import { formatarDataBanco, formatarDia} from '../conversoes';
function ModalRegistro({setMostrarModal, handleCreateTransaction}){
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('debit');
  
    async function handleSubmit(){
      try {
        if(!value || !category || !description || !date){
          return alert('Preencha todos os campos!');
        }
    
        const body = {
          date: formatarDataBanco(date),
          week_day: formatarDia(date),
          description,
          value,
          category,
          type
        }
  
        setValue('');
        setCategory('');
        setDescription('');
        setDate('');
    
        await handleCreateTransaction(body);
      } catch (error) {
        console.log(error);
      }
    }
  
    return(
    <div className={`backdrop`}>
      <div className="modal-container">
        <div className="title_close">
          <h2 className="modal-title">Adicionar Registro</h2>
          <img 
          onClick={()=> setMostrarModal(false)} 
          src={close} 
          className="close-icon" 
          alt="modal close"
          />
        </div>
  
  
        <div className="buttons">
          <button 
          onClick={()=> setType('credit')} 
          className={
            `type-button credit-border ${type === 'credit' && 'credit-button'}`
          }>
            Entrada
          </button>
          <button 
          onClick={()=> setType('debit')} 
          className={
            `type-button debit-border ${type === 'debit' && 'debit-button'}`
          }>
            Saída
          </button>
        </div>
  
        <div className="modal-inputs">
          <label for="value">Valor</label>
          <input 
          type="number"
          onChange={(event) => setValue(event.target.value)}
          value={value} 
          name="value" 
          id="value"/>
        </div>
  
        <div className="modal-inputs">
          <label for="category">Categoria</label>
          <input 
          type="category"
          onChange={(event) => setCategory(event.target.value)}
          value={category} 
          name="category" 
          id="category"
          />
        </div>
  
        <div className="modal-inputs">
          <label for="date">Data</label>
          <ReactInputMask 
          mask="99/99/9999" 
          onChange={(event) => setDate(event.target.value)}
          value={date}
          type="text" 
          name="date" 
          id="date"
          />
        </div>
  
        <div className="modal-inputs">
          <label for="description">Descrição</label>
          <input 
          type="text" 
          onChange={(event) => setDescription(event.target.value)}
          value={description} 
          name="description" 
          id="description"
          />
        </div>
  
        <input onClick={handleSubmit} type="button" value="Confirmar" className="btn-insert"/>
      </div>
    </div>
    );
  }

export default ModalRegistro;