import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        console.log("Attempting to connect to the database...");

        // Check if we're already connected
        if (mongoose.connection.readyState >= 1) {
            console.log("Already connected to the database.");
            return;
        }

        await mongoose.connect(
            'mongodb+srv://priyanshupathak1017:Pathak%40123@cluster0.rjs3q4s.mongodb.net/myDatabase?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("DB Connection Error: ", error.message);
        throw new Error(`Database connection failed: ${error.message}`);
    }
};

(async () => {
    try {
        await ConnectDB();
        console.log("Database connection test successful.");
    } catch (error) {
        console.error("Database connection test failed:", error.message);
    }
})();

export default ConnectDB;