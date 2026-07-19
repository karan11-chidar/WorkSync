import { onAuthStateChanged } from 'firebase/auth';
import React, {  useEffect,useState } from 'react'
import { auth } from '../../firebase/firebaseConfig';
import AuthContext from './AuthContext';
import getUserProfile from './profileService';

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
    const unSubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          hideLoader();
          return;
        }
        const profile = await getUserProfile(firebaseUser.uid);
        if (!profile) {
          setUser(null);
          setLoading(false);
          hideLoader();
          return;
        }
        const currentUser = {
          ...firebaseUser,
          ...profile,
        };
        setUser(currentUser);
        setLoading(false);
        hideLoader();
      } catch (error) {
         console.error(error);
         setUser(null);
         setLoading(false);
        hideLoader();
         alert(`Firebase authentication error: ${error.message}`);
      }
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