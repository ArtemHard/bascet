import './App.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { getFirestore, collection, getDocs } from 'firebase/firestore'

function App() {
  const auth = getAuth()

  const onClickHandler = () => {
    signInWithEmailAndPassword(auth, 'artem@gmail.com', '123456').then(res => console.log(res))
  }

  return (
    <div>
      Hello
      <button onClick={onClickHandler}>Click</button>
    </div>
  )
}

export default App
