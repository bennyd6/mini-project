const mongoose=require('mongoose');

const MONGO_URI="mongodb+srv://benny:benny123@user.6ewyu.mongodb.net/User?retryWrites=true&w=majority&appName=User"


const connectToMongo = () => {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("MongoDB Connected...."))
        .catch((e) => {
            console.error("MongoDB connection error:", e);
        });
};


module.exports=connectToMongo