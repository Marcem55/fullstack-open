const Countries = ({ countries, handleDetail }) => {
  return (
    <>
      {countries.map((country) => (
        <div key={country.name.official}>
          <p>{country.name.common}</p>
          <button onClick={() => handleDetail(country.name.common)}>
            Details
          </button>
        </div>
      ))}
    </>
  );
};

export default Countries;
