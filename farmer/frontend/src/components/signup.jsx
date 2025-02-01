import logo from '../assets/verna-logo.png'
import './login.css'

export default function Signup(){
    return(
        <>
        <div className="login-main">
            <div className="login-main-one">
                <img src={logo} alt="" />
            </div>
            <div className="login-main-two">
                <div className="login-card signup">
                    <h2>Signup</h2>
                    <form action="" className='login-form'>
                        <input type="text" placeholder='Enter your phone number' className='id-and-pass'/>
                        <input type="text" placeholder='Enter your phone number' className='id-and-pass'/>
                        <input type="text" placeholder='Enter your phone number' className='id-and-pass'/>
                        <input type="password" placeholder='Enter your password' className='id-and-pass'/>
                        <input type="password" placeholder='Confirm your password' className='id-and-pass'/>
                        {/* <div className="show-pass">
                            <input type="checkbox" name="" id="" />
                            <p>Show Password?</p>
                        </div> */}
                        <button className='login-button'>Register</button>
                    </form>
                    <p><a href="" className="signup-link">Have an account?</a></p>
                </div>
            </div>
        </div>
        </>
    )
}