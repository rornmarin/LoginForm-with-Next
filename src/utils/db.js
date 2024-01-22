import mongoose, { mongo } from "mongoose";

const connect = async () => {
    if (mongoose.connection[0].readyStatr) 
        return
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Mongose Connection Successfully')

    }catch(error){

        throw new error ("Error Connection to Mongose")
    }
}
export default connect;