module.exports = errorcatcher => (req,res,next)=>{

    Promise.resolve(errorcatcher(req,res,next)).catch(next)
}