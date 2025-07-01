import Button from "./components/Button"
import Counter from "./components/Counter"
import Footer from "./components/Footer"
import Greetings from "./components/Greetings"
import Header from "./components/Header"

function App() {
 

  return (
    <>
      <Header />
      <Counter />
      <Greetings name="Dude" />
      <Greetings name="Du" />
      <Button label="Click me" onClick={() => console.log("clicked")} />
      <Footer />
    </>
  )
}

export default App
