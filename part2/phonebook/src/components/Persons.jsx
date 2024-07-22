const Person = ({ person }) => (
  <p key={person.name}>
    {person.name} {person.number}
  </p>
);

const Persons = ({ persons }) => {
  return (
    <div>
      {!persons.length ? (
        <p>No person found</p>
      ) : (
        persons.map((person) => <Person key={person.name} person={person} />)
      )}
    </div>
  );
};

export default Persons;
