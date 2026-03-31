import mongoose from "mongoose";

export const ConnectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGOOSE_URL || 'mongodb://localhost/bank_fintech')
        if(connect){
            console.log('Connected to the database successfully',connect.connection.host);
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}