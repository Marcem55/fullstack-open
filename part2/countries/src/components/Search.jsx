const Search = ({ value, onChange }) => (
  <div>
    Find countries <input type="text" onChange={onChange} value={value} />
  </div>
);

export default Search;
