 
import React, {useEffect, useState} from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

function Login(){

    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const [password, setPassword] = useState('')

    function handleSuccessfulLogin(){
        console.log('Login successful')
        window.location.reload()
        alert('Welcome back!')
        navigate('/')
    }

    function HandleForm(event){
        event.preventDefault()
        let userData = {
            username:username,
            password:password
        }
        fetch("/api/login", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        }).then(response => response.json()).then(data => {
            if(data.success){
                localStorage.setItem("token", data.token)
                handleSuccessfulLogin()
            }
            else{
                alert("Attention: login failed")
            }
        }).catch(error => {

        })

    }
    return(
        <div className="login_page">
            <div className="login_container">
                <h1 className="login_title">Log-in</h1>
                <div className="cont4">
                    <h3 className="registration_string">Don't you have an account? <a id="registration_link" href='/register'>Click here to Sign Up</a></h3>
                </div>
                <div className="cont1">
                    <h3 className="login_usr">Username or E-mail </h3>
                    <TextField id="outlined-basic" className="username_field" label="Username or E-mail" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="cont1">
                    <h3 className="login_usr">Password </h3>
                    <TextField id="outlined-basic" className="username_field" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="cont3">
                    <button id="cancel" onClick={() => navigate("/")}>Cancel</button>
                    <button id='login' onClick={HandleForm}>Log-in</button>
                </div>
                <div className="cont4">
                    <h3 className="registration_string">Are you an employee?<a id="registration_link" href='/employeesLogin'>Click here to Log-in</a></h3>
                </div>
            </div>
        </div>
    );
}

export default Login;