function ModalDelete({setMostrarModalDelete, handleDeleteTransaction, id}){
    return(
      <div className="container-confirm-delete">
        <span>Apagar item?</span>
        <div className="btn-actions-confirm-delete">
          <input
          type="button"
          onClick={()=> handleDeleteTransaction(id)} 
          value="Sim" 
          className="btn-actions-confirm"
          />
          <input 
          onClick={ () => setMostrarModalDelete()}  
          type="button" 
          value="Não" 
          className="btn-actions-delete"
          />     
        </div>
      </div>
    )
  }

export default ModalDelete;