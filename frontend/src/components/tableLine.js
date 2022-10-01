import {useState} from 'react';
import editButton from '../assets/editButton.svg';
import removeButton from '../assets/removeButton.svg';
import { converterMoeda, formatarData, getWeekDay} from '../conversoes';
import ModalEditar from './modalEditar';
import ModalDelete from './modalDelete';
function TableLine({setIdModalDelete, transaction, handleDeleteTransaction, idModalDelete, handleEditTransaction}){
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
    return(
      <div className="table-line">
        <div className="line-items">{formatarData(transaction.date)}</div>
        <div className="line-items">{getWeekDay(transaction.date)}</div>
        <div className="line-items">{transaction.description}</div>
        <div className="line-items">{transaction.category}</div>
        <div className={`line-items ${transaction.type === 'credit'? 'value-color-blue': 'value-color-red' }`}>{converterMoeda(Number(transaction.value))}</div>
        <div className="line-items">
          <img 
          onClick={()=> setMostrarModalEditar(true)}
          className="edit-icon" 
          src={editButton} 
          alt="Edit icon"
          />
          <div className="delete-icon-container">
            <img 
            onClick={()=> setIdModalDelete(transaction.id)}
            className="delete-icon" 
            src={removeButton} 
            alt="Delete icon"
            />
            {idModalDelete === transaction.id && <ModalDelete 
            setMostrarModalDelete={setIdModalDelete} 
            handleDeleteTransaction={handleDeleteTransaction}
            id={transaction.id}
            />}
          </div>
          {mostrarModalEditar && <ModalEditar 
          setMostrarModalEditar={setMostrarModalEditar} 
          handleEditTransaction={handleEditTransaction}
          transaction={transaction}
          id={transaction.id}
          />}
        </div>
      </div>
    )
  }

export default TableLine;