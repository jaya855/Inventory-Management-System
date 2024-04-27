import dbconnect from "@/lib/dbconnect";
import User from "@/lib/Models/User";
export default  signup= async (req,res) => {
    console.log("hii jaya from signup backend")
        dbconnect()
        try {
            const {name, email,password } = req.body;
            console.log(req.body);
            let check=false;
            let existingdata=await User.findOne({ email })
            if (existingdata) {
                check=true;
                console.log("inside bro")
                return res.status(409).json({
                    success: false,
                    message: "user already registered"
    
                });
    
            }
           
            if(check==false) 
            console.log("1");
            let data=req.body
            let newuser =await  User.create({name, email,password });
           res.status(201).json({
                success: true,
                message: "user registration done successful"
            });
            console.log("4");
        }
        catch (error) {
            res.status(500).json({
                
                success: false,
                message: "user registration failed due to some interal server issues"
            });
        }
}

