const Person = ({ person, handleDelete }) => {
  return (
    <div>
      <p key={person.name}>
        {person.name} {person.number}
      </p>
      <button onClick={(id) => handleDelete(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {!persons.length ? (
        <p>No person found</p>
      ) : (
        persons.map((person) => (
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        ))
      )}
    </div>
  )
}

export default Persons
