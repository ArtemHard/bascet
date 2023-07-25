import replace from '@rollup/plugin-replace'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.REACT_APP_FIREBASE_API_KEY': JSON.stringify(
          'AIzaSyB2iA2UGvx4YKYu_1DoNlE8waL7wKO5bOA'
        ),
        'process.env.REACT_APP_FIREBASE_AUTH_DOMAIN': JSON.stringify(
          'basket-e1373.firebaseapp.com'
        ),
        'process.env.REACT_APP_FIREBASE_DATABASE_URL': JSON.stringify(
          'https://basket-e1373-default-rtdb.europe-west1.firebasedatabase.app'
        ),
        'process.env.REACT_APP_FIREBASE_PROJECT_ID': JSON.stringify('basket-e1373'),
        'process.env.REACT_APP_FIREBASE_STORAGE_BUCKET': JSON.stringify('basket-e1373.appspot.com'),
        'process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(24242639849),
        'process.env.REACT_APP_FIREBASE_MESSAGING_APP_ID': JSON.stringify(
          '1:24242639849:web:18eedd324999833be83178'
        ),
        // 'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      },
    }),
  ],
})
