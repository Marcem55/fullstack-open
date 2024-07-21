import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const BestAnecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleAnecdoteClick = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length);
    if (newIndex === selected) return handleAnecdoteClick();
    setSelected(newIndex);
  };

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] = votesCopy[selected] + 1;
    setVotes(votesCopy);
  };

  let bestAnecdote = anecdotes[0];
  let max = 0;

  for (let i = 0; i < anecdotes.length; i++) {
    const element = anecdotes[i];
    if (votes[i] > max) {
      max = votes[i];
      bestAnecdote = anecdotes[i];
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleAnecdoteClick} text="next anecdote" />
      <BestAnecdote anecdote={bestAnecdote} votes={max} />
    </div>
  );
};

export default App;
