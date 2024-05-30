const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch(next).
        catch((err)=>next(err))
    }

}

export default asyncHandler