import { onAuthStateChanged } from 'firebase/auth';
import React, {  useEffect,useState } from 'react'
import { auth } from '../../firebase/firebaseConfig';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
     const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const unSubscribe =  onAuthStateChanged(auth,(user) => {
            setUser(user);
            setLoading(false)
      })
        return () => unSubscribe();
    }, [])
    
  return (
      <AuthContext.Provider value={user}>
          {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
