import { useContext} from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"
import {AppContext}  from "../context/AppContextProvider"
import {useNavigate} from "react-router-dom"
const Header = () => {

  const {user,setShowLogin} = useContext(AppContext);
    const navigate = useNavigate();
  const onClickHandler = () => {
    if(user){
      navigate("result");
    }else{
      setShowLogin(true);
    }
  }
  return (
    <>
      <motion.div
        className="flex flex-col justify-center items-center my-20 mt-2 text-center overflow-hidden"
        initial={{ opacity:0.2, y:100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div className="w-75 text-stone-500 inline-flex gap-2 text-center bg-white px-6 py-1 rounded-full border boeder-neutral-500"
        initial={{opacity:0, y:20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.2 , duration:0.8}}

        >
          <p>Best text to image Generator</p>
          <img src={assets.star_icon} />
        </motion.div>
        <motion.h1
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4,duration:2}}
        className="text-4xl max-w-[300px] sm:max-w-[590px] sm:text-7xl px-auto pt-3 text-center">
          Turn text to <span className="text-blue-600">image</span>, in seconds.
        </motion.h1>
        <motion.p 
        initial={{opacity:0,y:20}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.6,duration:0.8}}

        className="text-md font-normal w-150 pt-5 font-md">
          unsplash your creativity with AI. Turn your imagination into visual
          art in seconds- just type and watch the magic happen
        </motion.p>
        <div className="pt-10">
          <motion.button
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{default:{duration:0.5}, opacity:{delay:0.8 , duration:1}}}
          onClick={onClickHandler}
          className="sm:text-lg bg-black rounded-full px-6 py-1 text-white flex items-center ">
            <p>Generate Images</p>
            <img src={assets.star_group} className="w-8 pl-2" />
          </motion.button>
        </div>
        <motion.div 
        initial={{opaxity:0}}
        animate={{opacity:1}}
        transition={{delay:1,duration:1}}
        className="flex flex-wrap gap-3 pt-16 justify-center ">
          {Array(6)
            .fill("")
            .map((item, idx) => (
              <motion.img
              whileHover={{scale:1.05 , duration:1}}
                className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                src={idx % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2}
                key={idx}
                width={70}
              />
            ))}
        </motion.div>
        <motion.p
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1.2, duration:0.8}}
        className="font-extralight mt-3">Generated images from imagify</motion.p>
      </motion.div>
    </>
  );
};
export default Header;
