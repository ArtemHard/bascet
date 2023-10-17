import { FormEvent, useState } from 'react'

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDatabase, ref, set, get, onValue } from 'firebase/database'

import { databaseApi } from './api/databaseApi'
import { app, db } from './firebase'

import './App.css'

function writeProductsList(products: any) {
  const db = getDatabase()

  set(ref(db, 'products/'), {
    ...products,
  })
}

// export const databaseApi = {
//   async getProducts(token: string) {
//     return axios.get(
//       'https://basket-e1373-default-rtdb.europe-west1.firebasedatabase.app/products.json',
//       {
//         params: {
//           auth: token,
//         },
//       }
//     )
//   },
//   async getProductsFetch(token: string) {
//     return fetch(
//       'https://basket-e1373-default-rtdb.europe-west1.firebasedatabase.app/products.json?' +
//         new URLSearchParams({
//           auth: token,
//         }),
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//   },
// }
// import { getFirestore, collection, getDocs } from 'firebase/firestore'

function App() {
  const database = getDatabase()
  const auth = getAuth()
  const starCountRef = ref(database, 'products/')

  const productsObserver = onValue(starCountRef, snapshot => {
    const data = snapshot.val()
  })
  // get(ref(database, 'products')).then(res => console.log(res))

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [products, setProducts] = useState<any>()

  const onClickCreateProduct = () => {
    set(ref(database, 'products/flowers/rose'), {
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

  const onClickSignInWithEmail = () => {
    signInWithEmailAndPassword(auth, 'artem@gmail.com', '123456').then(res => console.log(res))
  }
  const createUser = () => {
    createUserWithEmailAndPassword(auth, 'kabaktema@gmail.com', '12345678')
      .then(() => {
        console.log('User was created sucessfull')
      })
      .catch(() => console.warn('Sugn UP - ERROR'))
  }

  const getProducts = async () => {
    const user = getAuth().currentUser

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // ...
      console.log('isAnonimous: ' + user.isAnonymous)

      user
        .getIdToken()
        .then(function (idToken) {
          // Send token to your backend via HTTPS
          // ...
          databaseApi
            .getProducts(idToken)
            .then(res => {
              console.log(res.data)
              writeProductsList(res.data.flowers)
            })
            .catch(err => console.log(err))
        })
        .catch(function (error) {
          // Handle error
        })

      // databaseApi.getProducts(tokenId).then(res => console.log(res))
    } else {
      // No user is signed in.
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = {
      email,
      password,
    }

    console.log(user)
  }

  return (
    <div>
      Hello
      <form
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '15rem', gap: '0.5rem' }}
        onSubmit={onSubmit}
      >
        <input id={'email'} type="text" onChange={e => setEmail(e.target.value)}></input>
        <input id={'password'} type="password" onChange={e => setPassword(e.target.value)}></input>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClickSignInWithEmail}>SignInWithEmail</button>
      <button onClick={onAuthAnonimusly}>Anonimys</button>
      <button onClick={onClickCreateProduct}>CreateProduct</button>
      <button onClick={createUser}>CreateUser</button>
      <button onClick={getProducts}>Get Products</button>
    </div>
  )
}

export default App
