import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContextProvider";
import { useContext, useState } from "react";

const Navbar = () => {
  const { user, setUser ,setShowLogin , logout , credit } = useContext(AppContext);
  
  const navigate = useNavigate();
  return (
    <>
      <div className="flex item-center justify-between py-4">
        <Link to="/">
          <img src={assets.logo} className="w-28 sm:w-32 lg:w-40" />
        </Link>
        {user ? (
          <div className="flex item-center gap-2 sm:gap-3">
            <button className="flex item-center gap-2 bg-blue-100 px-3 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700">
              <img src={assets.credit_star} className="w-5" />
              <p>Credit Left : {credit}</p>
            </button>
            <p className="list-none rounded-md text-lg max-sm:hidden font-sm text-grey-600 pt-2">Hi, {user.name} </p>
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10 drop-shadow" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul>
                  <li onClick={logout} className="border px-5 py-2 rounded-medium text-md border-black">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex item-center gap-2 sm:gap-5">
            <p
              onClick={() => navigate("/buycredits")}
              className="cursor-pointe text-lg flex item-center"
            >
              Pricing
            </p>
            <button onClick={()=>setShowLogin(true)} className="bg-zinc-800  text-white px-7 py-2 sm:px-10 text-lg rounded-full ">
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
