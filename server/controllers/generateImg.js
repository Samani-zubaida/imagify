import axios from "axios";
import FormData from "form-data"
import userModel from "../models/userModel.js";

export const generateImage = async (req,res) => {
    try {
        const {userId , prompt} = req.body;
        const user = await userModel.findById(userId);
        if(!user|| !prompt) {
            res.json({success:false , message : "Missing Details"});
        }
        if(user.creditsBalance === 0 ||  userModel.creditsBalance < 0 ){
            return res.json({success:false , message : 'No Credit Balance' , creditsBalance:user.creditsBalance});
        }

        const formData = new FormData()
        formData.append('prompt',prompt)
        
        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData , {
            headers: {
                'x-api-key':process.env.CLIPDROP_API,
              },
              responseType : "arraybuffer"
        })

        const base64Image = Buffer.from(data,'Binary').toString("base64")
        const resultImage = `data:image/png;base64,${base64Image}`
        console.log("this is image",resultImage);
        await userModel.findByIdAndUpdate(user._id,{creditsBalance:user.creditsBalance-1})
        res.json({success:true , message:"Image Generated" , creditsBalance:user.creditsBalance-1 , resultImage});
    } catch (error) {
     console.log(error);
     res.json({success:false, message:error.message});   
    }
};