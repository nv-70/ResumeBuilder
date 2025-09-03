import React,{createContext} from 'react'
export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(()=>{
    // Check if user data exists in local storage
    if(user)return;
    const accessToken = localStorage.getItem('token');
    if(!accessToken){
        setLoading(false);
        return;
    }
    const fetchUser = async()=>{
        try {
            const response = await fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch user');
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
  }, []);

};

export default UserProvider;
