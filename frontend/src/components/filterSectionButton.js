import filterButton from '../assets/filter-button.svg';

function FilterSectionButton({setSecaoFiltro, secaoFiltro}){

    return (
      <button type="button" onClick={()=> {
        if(secaoFiltro === true){
          setSecaoFiltro(false)
        }
        else{
          setSecaoFiltro(true)
        }
      }} className="open-filters-button">
        <img src={filterButton} alt="filter button" className="filter-image"/>
        <span>Filtrar</span>
      </button>
    )
  }

export default FilterSectionButton;

