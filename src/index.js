// MODELS
require("./models/User");
require("./models/Track");

// NPM PACKAGES
const   dotenv      = require("dotenv"), 
        express     = require("express"),
        mongoose    = require("mongoose");

// FILES AND FOLDERS
const   authRoutes  = require("./routes/authRoutes"),
        requireAuth = require("./middlewares/requireAuth"),
        trackRoutes = require("./routes/trackRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

// DATABASE
mongoose.connect(process.env.MONGO_DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB.");
});
mongoose.connection.on("error", (err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
});

// ROUTES
app.get("/", requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

// SERVER
app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}.`);
});