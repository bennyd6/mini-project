import logo from '../assets/verna-logo.png'
import './login.css'

export default function Login(){
    return(
        <>
        <div className="login-main">
            <div className="login-main-one">
                <img src={logo} alt="" />
            </div>
            <div className="login-main-two">
                <div className="login-card">
                    <h2>Login</h2>
                    <form action="" className='login-form'>
                        <input type="text" placeholder='Enter your phone number' className='id-and-pass'/>
                        <input type="password" placeholder='Enter your password' className='id-and-pass'/>
                        <div className="show-pass">
                            <input type="checkbox" name="" id="" />
                            <p>Show Password?</p>
                        </div>
                        <button className='login-button'>Login</button>
                    </form>
                    <p><a href="" className="signup-link">Dont have an account?</a></p>
                </div>
            </div>
        </div>
        </>
    )
}