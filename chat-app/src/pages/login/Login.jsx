import { useState } from "react";
import './Login.scss'
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";



const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };


  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <span className="logo">yChati w yBati</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='Enter your Email...' />
          <input type="password" placeholder='Enter your Password...' />
          <button>Log in</button>
        </form>
        <p>Don't have an account ?  <Link to="/register"> Sign Up  </Link> </p>
      </div>
    </div>
  )
}

export default Login