function FilterButtons({info}){
  return (
    <div className="container-chip">
      <span className="day-text">{info}</span>
      <span className="icon-filter">+</span>
    </div>
  )
}

export default FilterButtons;