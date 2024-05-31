const asyncHandler = (requestHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch(next).
        catch((err)=>next(err))
    }

}

export default asyncHandler

//no need to put every code in promises