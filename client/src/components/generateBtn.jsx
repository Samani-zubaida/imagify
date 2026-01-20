import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate("result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col justify-center items-center overflow-hidden"
      >
        <h1 className="text-2xl md:text-3xl lg:text-5xl mt-10 font-semibold">
          See the magic.Try now
        </h1>

        <div className="pt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              default: { duration: 0.5 },
              opacity: { delay: 0.8, duration: 1 },
            }}
            onClick={onClickHandler}
            className="sm:text-lg bg-black rounded-full px-6 py-1 text-white flex items-center "
          >
            <p>Generate Images</p>
            <img src={assets.star_group} className="w-8 pl-2" />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default GenerateBtn;
