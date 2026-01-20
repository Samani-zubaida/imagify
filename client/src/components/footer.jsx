import { assets } from "../assets/assets"
const Footer = () => {
    return (
        <>
        <div
        className="flex justify-between py-5">
            <div className="flex justify-between items-center align-middle gap-40">
                <img src={assets.logo}/>
                <p className="font-extralight hidden sm:block ">| All right reserved copyright  @imagify</p>
            </div>
          <div className="flex gap-2 ">
           <img src={assets.facebook_icon}/>
           <img src={assets.instagram_icon}/>
           <img src={assets.twitter_icon}/>
          </div>
        </div>
        </>
    )
}

export default Footer 