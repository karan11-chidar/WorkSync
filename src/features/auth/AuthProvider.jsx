import { onAuthStateChanged } from 'firebase/auth';
import React, {  useEffect,useState } from 'react'
import { auth } from '../../firebase/firebaseConfig';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const [loaderState, setLoaderState] = useState({
              active: false,
              mode: null,
      });
  const  showLoader = (mode)=> {
    setLoaderState({
      active: true,
      mode:mode,
    });
  }

  const hideLoader = ()=> {
    setLoaderState({
      active: false,
      mode: null,
    });
  }
  useEffect(() => {
    showLoader('refresh');
      const unSubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false)
        hideLoader();
      })
        return () => unSubscribe();
    }, [])
    
  return (
    <AuthContext.Provider
      value={{ user, loading, loaderState, showLoader,hideLoader }}
    >
      {children}
    </AuthContext.Provider>
  );
}