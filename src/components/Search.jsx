var Search = (props) => (
  <div className="search-bar form-inline">
    <input className="form-control" type="text" onChange={(event) => { props.storeFormInput(event.target.value); props.handleChange(); }}/>
    <button className="btn hidden-sm-down">
      <span className="glyphicon glyphicon-search"></span>
    </button>
  </div>
);

Search.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default Search;
