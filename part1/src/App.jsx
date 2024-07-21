const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}


const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Peter" age={26}/>
      <Hello name="John" age={56 - 23}/>
      <Hello name="Amy" age={16}/>
    </>
  )
}

export default App