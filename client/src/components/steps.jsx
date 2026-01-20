import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <>
      <motion.div
      initial={{opacity:0.2 ,y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      className="flex flex-col justify-center items-center overflow-hidden">
        <h1 className="text-4xl mt-15">How it work</h1>
        <p className="font-extralight mt-3">
          Transform Word into Stunning Images
        </p>
        <div className="space-y-4 w-full max-w-3xl text-sm justify-center items-center">
          {stepsData.map((item, idx) => (
            <div
              key={idx}
              className="flex px-8 p-5 bg-white/15 shadow-md hover:scale-[1.02] transition-all duration-300 gap-4 border border-black rounded-lg mt-2"
            >
              <img src={item.icon} alt="img" />
              <div className="ml-3">
                <h1 className="text-xl"> {item.title}</h1>
                <p className="font-thin "> "{item.description}"</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Steps;
