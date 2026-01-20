import { assets } from "../assets/assets";
import {motion}from "framer-motion"
const Discription = () => {
  return (
    <>
      <motion.div
         initial={{opacity:0.2 ,y:100}}
         transition={{duration:1}}
         whileInView={{opacity:1, y:0}}
         viewport={{once:true}}
      className="mt-20 overflow-hidden">
        <div className="flex flex-col justify-center items-center ">
          <h1 className=" text-4xl sm:text-4xl font-semibold">
            Create AI Images
          </h1>
          <p className="text-grey-500 mb-8">
            Turn your imagination into visuals
          </p>
        </div>

        <div className="flex justify-center align-center mt-10 hidden sm:block">
          <img src={assets.sample_img_1} className="w-90 sm:w-50" />
          <div className="ml-10">
            <h1 className="text-3xl font-sans">
              Introducing to AI-Powered Text to Image Generator
            </h1>
            <br />
            <p className="font-medium">
              The Text-to-Image Generator allows users to transform written
              descriptions into unique and detailed images. By simply inputting
              a brief text prompt, the system uses advanced AI models to create
              a visual representation that matches the words provided. Whether
              it's a serene landscape, a futuristic city, or an abstract
              concept, the generator can bring ideas to life with high-quality,
              original visuals.
            </p>
            <br/>
            <p className="font-medium">
              Users can refine their inputs to get more precise results,
              adjusting elements such as style, color, mood, or perspective.
              This feature is perfect for designers, artists, marketers, and
              anyone looking for creative visual content. With its easy-to-use
              interface and fast rendering, the generator makes it simple to
              experiment and create stunning imagery from scratch.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Discription;
