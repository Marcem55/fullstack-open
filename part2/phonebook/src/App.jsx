import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/numbers";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => console.log(`Ups! An error ocurred in getAll(): ${err}`));
  }, []);

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) return alert("Please, complete all the fields");
    const foundedName = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (foundedName) {
      //  return alert(`${newName} is alerady added to phonebook`)
      const resultConfirm = window.confirm(
        `${newName} is already added to phonebook, do you want to replace the old number with a new one?`
      );
      if (resultConfirm) {
        const updatedPerson = {
          ...foundedName,
          number: newNumber,
        };
        personService
          .updatePerson(foundedName.id, updatedPerson)
          .then((result) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundedName.id ? person : result
              )
            );
            setMessageType("success");
            setMessage(`Updated ${updatedPerson.name}`);
            setTimeout(() => {
              setMessage("");
            }, 5000);
          })
          .catch((err) => {
            setMessageType("error");
            if (
              err.response.data.error.includes("validation") ||
              err.response.data.error.includes("Validation")
            ) {
              setMessage(
                `Name must be at least 3 characters long and number must be at least 8 characters long and respect the format: XX-XXXXXXXXX`
              );
            } else {
              setMessage(
                `Information of "${updatedPerson.name}" has already been removed from server`
              );
              setPersons(persons.filter((person) => person.name !== newName));
            }
            setTimeout(() => {
              setMessage("");
            }, 5000);
            console.log(`Ups! An error ocurred in createPerson(): ${err}`);
          });
        return;
      } else {
        return;
      }
    }
    personService
      .createPerson({
        name: newName,
        number: newNumber,
      })
      .then((response) => {
        console.log("response", response);
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setMessageType("success");
        setMessage(`Added ${response.name}`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((err) => {
        console.log({ err, errR: err.response.data });
        setMessageType("error");
        if (
          err.response.data.error.includes("validation") ||
          err.response.data.error.includes("Validation")
        ) {
          setMessage(
            `Name must be at least 3 characters long and number must be at least 8 characters long and respect the format: XX-XXXXXXXXX`
          );
        } else {
          setMessage(`An error ocurred while "${newName}" was created`);
        }
        setTimeout(() => {
          setMessage("");
        }, 5000);
        console.log(`Ups! An error ocurred in createPerson(): ${err}`);
      });
  };

  const handleFilter = (e) => setFilterInput(e.target.value);

  const filteredPersons = filterInput
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterInput.toLowerCase())
      )
    : persons;

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const resultConfirm = window.confirm(`Delete ${person.name}?`);
    if (resultConfirm) {
      personService
        .deletePerson(person.id)
        .then((response) => {
          setMessageType("success");
          setMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((err) => {
          setMessageType("error");
          setMessage(`An error ocurred while "${person.name}" was deleted`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
          console.log(`Ups! An error ocurred in createPerson(): ${err}`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filterInput={filterInput} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
