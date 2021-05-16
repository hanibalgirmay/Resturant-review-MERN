import express from "express";
import cors from "cors";
import resturant from "./api/resturant.route.js";

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// route
app.use("/api/v1/resturant", resturant);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
// app.listen(port,() => console.log(`serveros running on ${port}`))
