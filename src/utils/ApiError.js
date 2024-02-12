class ApiError extends Error {   // Node Error class ko ham overWrite ker raha hai 
    constructor(
        statusCode,
        message= "Something went wrong",  // default error 
        errors=[],
        stack="",
    ){
        // overriding Error class method 
        super(message)     
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}  

export {ApiError}