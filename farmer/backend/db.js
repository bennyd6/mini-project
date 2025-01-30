const mongoose=require('mongoose');

const MONGO_URI="mongodb+srv://cadheshbenny:0lwp7arPNvycCyV7@cluster0.zxy0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectToMongo = () => {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("MongoDB Connected...."))
        .catch((e) => {
            console.error("MongoDB connection error:", e);
        });
};


module.exports=connectToMongo