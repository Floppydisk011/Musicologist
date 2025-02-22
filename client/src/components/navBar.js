 
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './navBar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';

function NavBar(){

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        
        const token = localStorage.getItem('token')
        setToken(token)
        if(token){
        const decoded = jwt_decode(token)
        setUser(decoded)
        setIsLoggedIn(true) 
        console.log("LOGGED IN, Token:" + token)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setIsLoggedIn(false)
        navigate("/")
      }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            navigate(`/results/${searchText}`, { replace: true })
            setSearchText('')
            window.location.reload()
        }
        
    }

    const cartUrl = isLoggedIn ? `/cart/${token}` : '/login';

    return(
        <div className="navBar">
            <a className="navbar_home_button" href="/">
                <h3>Musicologist</h3>
            </a>
            <div className="items">
                    <div className="item">
                        <Link to="/"><h1>Home</h1></Link>
                    </div>
                <div className="textual_navbar">
                <div className="item">
                    {isLoggedIn ? (
                        <Link onClick={handleLogout}><h1>Log-out</h1></Link>
                        ):(
                        <Link to="/login"><h1>Log-in</h1></Link>
                        )
                    }
                    </div>
                    <div className="item">
                        {isLoggedIn ? (
                            <Link to="/account"><h1>Account</h1></Link>
                        ):(
                            <Link to="/login"><h1>Account</h1></Link>
                        )}
                        
                    </div>
                    <div className="item">
                        {isLoggedIn ? (
                            <Link to={cartUrl}><a className="scroll-link" ><h1>Cart</h1></a></ Link>
                        ):(
                            <Link to="/login"><a className="scroll-link" ><h1>Cart</h1></a></ Link>
                        )} 
                    </div>
                    <div className="item">
                        <TextField id="filled-basic" label="Search" variant="filled" onKeyPress={handleKeyPress} onChange={(e) => setSearchText(e.target.value)} InputProps={{ style: { borderColor: 'white' } }} inputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: 'white' } }}/>
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default NavBar;