import React, { useEffect, useState } from 'react'
import { login } from '../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signUpPage, setSignUpPage] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const history = useNavigate();

  const handleSignUpButton = (value) => {
    setSignUpPage(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    if(!(userName)){
        toast.error('Please enter your username!');
        return;
    }else if(!password){
        toast.error('Please enter your password!');
        return;
    }
    const data = await login(userName, password);
    if(data){
        toast.success('User login successfully!');
        history('/homepage')
    }

    console.log(data);
  }

  return (
        <div className={signUpPage ? 'container sign-up-mode' : 'container'}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" value={userName} onChange={(e)=>setUserName(e.target.value)} autoComplete='off' required/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
                        </div>
                        <button className="btn solid" onClick={(e)=>handleLogin(e)}>Login</button>
                    </form>
    
                    <form action="" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" value={userName} onChange={(e)=>setUserName(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
                        </div>
                        <button className="btn solid">Sign up</button>
                    </form>
                </div>
            </div>
    
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>Enter your personal details and start journey with us.</p>
                        <button className="btn transparent" id="sign-up-btn" onClick={()=>handleSignUpButton(true)}>Sign up</button>
                    </div>
    
                    <img src="img/log.svg" className="image" alt=""/>
                </div>
    
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>Sign in with your account details and begin your journey with us.</p>
                        <button className="btn transparent" id="sign-in-btn" onClick={()=>handleSignUpButton(false)}>Sign in</button>
                    </div>
    
                    <img src="img/register.svg" className="image" alt=""/>
                </div>
            </div>
        </div>
  )
}

export default Login