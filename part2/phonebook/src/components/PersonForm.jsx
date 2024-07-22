const PersonForm = ({
  handleSubmit,
  handleNameInput,
  newName,
  handleNumberInput,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameInput} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberInput} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
