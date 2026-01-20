import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import {AppContext} from "../context/AppContextProvider"
import {motion} from "framer-motion"
const BuyCredit = () => {
    const {user , setUser} = useContext(AppContext)
    return (
        <>
       <motion.div 
         initial={{opacity:0.2 ,y:100}}
         transition={{duration:1}}
         whileInView={{opacity:1, y:0}}
         viewport={{once:true}}
       className="min-h-[80vh] text-center pt-14 mb-10 overflow-hidden">
        <button className="border border-grey-400 px-10 py-2 rounded-full mb-6">Our plans</button>
        <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10 ">Choose the plan</h1>

        <div className="flex gap-3 justify-center items-center overflow-x-auto whitespace-nowrap ">
        {plans.map((item,idx)=>(
        <div key={idx} className="items-start px-10 py-12 drop-shadow-sm rounded-lg hover:scale-105 transition-all duration-300 bg-white text-left">
            <img src={assets.logo_icon} className=""/>
            <p className="font-medium text-2xl pt-2">{item.id}</p>
            <p className="font-light text-sm mb-3">{item.desc}</p>
            <h1 className="font-light py-5"><span className=" text-4xl">${item.price}</span>/{item.credits}</h1>
            <button className="border bg-black text-white px-10 py-2 rounded-2xl">{user?"purchase":'Get Started'}</button>
        </div>
       ))}
        </div>
       </motion.div>
        </>
    )
}

export default BuyCredit;