const mongoose=require("mongoose")
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("MongoDB Conexion correcta.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });