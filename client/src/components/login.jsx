import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContextProvider";
import {motion} from "framer-motion"
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
    const {setShowLogin , backendUrl , setToken , setUser} = useContext(AppContext);

    const [state,setState] = useState('SignUp');
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
          if(state == 'Login'){
           const {data} =  await axios.post(backendUrl + '/api/user/login' , {email,password})
      

          if(data.success){
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('token',data.token)
            setShowLogin(false)
          }else {
            toast.error(data.message);
          } 
        } else {
          const {data} =  await axios.post(backendUrl + '/api/user/register' , {name ,email,password})
      

          if(data.success){
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('token',data.token)
            setShowLogin(false)
          }else {
            toast.error(data.message);
          }  
        }
        } catch (error) {
          toast.error(error.message);
        }
    }


    useEffect(()=>{
        document.body.style.overflow = 'hidden';

        return()=>{
            document.body.style.overflow = 'unset';
        }
    })
  return (
    <>
      <div className="fixed left-0 right-0  border-0 top-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
        <motion.form onSubmit={onSubmitHandler}
          initial={{opacity:0.2 ,y:50}}
          transition={{duration:0.3}}
          whileInView={{opacity:1, y:0}}
          viewport={{once:true}}
        className="bg-white rounded-lg  w-80 my-50 mx-auto py-5 px-10">
          <h1 className="font-normal text-4xl text-center">{state}</h1>
          <p className="font-light text-sm text-center">
            Welcome back! please sign in to continue
          </p>

          <div className="flex rounded-full px-2 py-2 gap-2 my-8 items-center border mt-4">
            {/* <img src={assets.} */}
            <img src={assets.email_icon} />
            <input
              type="email"
              placeholder="Email Id"
              onChange={e=>setEmail(e.target.value)} value={email}
              className="outline-none"
            />
          </div>

          {state !== 'Login' && <div className="flex rounded-full px-2 py-2 gap-2 my-8 items-center border mt-2">
            {/* <img src={assets.} */}
            <input
              type="text"
              onChange={e=>setName(e.target.value)} value={name}
              placeholder="Full Name"
              className="outline-none"
            />
          </div>}
          <div className="flex rounded-full px-2 py-2 gap-2  items-center border mt-2">
            <img src={assets.lock_icon} />
            <input
              type="password"
              placeholder="Password"
              onChange={e=>setPassword(e.target.value)} value={password}
              className="outline-none"
            />
          </div> 
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forget Password?
          </p>
          <button className="bg-blue-600 rounded-full w-full text-white py-2">
           {state == 'Login'?"Login":"Sign Up"}
          </button>

          {state === 'Login' ?<p className="py-2">Dont't have an account?<span className="text-blue-600" onClick={()=>setState('SignUp')}>Sign Up</span></p>:
          <p>Aready have an account?<span className="text-blue-600" onClick={()=>setState('Login')}>Login</span></p>}
        </motion.form>
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} className="absolute top-53 right-153.5 cursor-pointer" />
      </div>
    </>
  );
};

export default Login;
