import { getAuth, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

import './App.css'
import { app } from './firebase'
// import { getFirestore, collection, getDocs } from 'firebase/firestore'
function App() {
  const auth = getAuth()

  const onClickCreateProduct = () => {
    const database = getDatabase(app)

    set(ref(database, 'products/'), {
      name: 'rose',
      price: 20,
      picture: '',
    })
  }

  const onAuthAnonimusly = () =>
    signInAnonymously(auth)
      .then(res => {
        // Signed in..
        alert('YOU ARE ANONIMUS')
        console.log(res)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        // ...
      })

  const onClickHandler = () => {
    signInWithEmailAndPassword(auth, 'artem@gmail.com', '123456').then(res => console.log(res))
  }

  return (
    <div>
      Hello
      <button onClick={onClickHandler}>Click</button>
      <button onClick={onAuthAnonimusly}>Anonimys</button>
      <button onClick={onClickCreateProduct}>CreateProduct</button>
    </div>
  )
}

export default App
