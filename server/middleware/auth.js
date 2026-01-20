import jwt from "jsonwebtoken";

export const userAuth = async (req,res,next)=>{
 const {token} = req.headers;
 if(!token){
   return res.json({success:false, message:"Not Autherized Login Again"});
 }

 try {
  const decodedToken = jwt.verify(token,process.env.JWT__SECRET);

  if(decodedToken.id){
    if (!req.body) req.body = {}; 
    req.body.userId = decodedToken.id;
  } else {
    return res.json({success:false, message:"Not Autherised Login  Again"});
  }

  next();
 } catch (error) {
    res.json({success:false, message:error.message});
 }
}

export const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    // let errMsg = error.details.map((el) => el.message).join(",");
    // console.log(errMsg);
    console.log(error);
    throw new ExpressError(400, error);
  
  } else {
    next();
  }};

//  export const isReviewAuthor = async (req,res,next) => {
//     let { id ,reviewId } = req.params;
//     let review = await Review.findById(reviewId);
//     if(!review.author._id.equals(res.locals.currUser._id)){
//       req.flash("error", "You are not the author of this review");
//       return res.redirect(`/listings/${id}`);
//     } 
//     next();
//   }
// export default userAuth 
