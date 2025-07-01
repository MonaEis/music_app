interface GreetingsProps {
 name: string;   
}

const Greetings = (props:GreetingsProps) => {
  return (
    <h2>Hallo {props.name}
      
    </h2>
  )
}

export default Greetings
