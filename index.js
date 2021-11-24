const app = require("express")();
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
require("./utils/authUtils");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const checkUser = require("./middlewares/authMiddleware");
require("dotenv").config();

const URI = process.env.MONGODB_URI;
const COOKIE_KEYS = process.env.COOKIE_KEYS;

app.set("view engine", "ejs");

app.use(
	cookieSession({
		name: "passportjs-test",
		maxAge: 60 * 60 * 1000,
		keys: [COOKIE_KEYS],
	})
);

//initilize passport and create a session
app.use(passport.initialize());
app.use(passport.session());

(async () => {
	try {
		const connection = await mongoose.connect(URI);

		console.log("connected to db");
	} catch (e) {
		console.log(e);
	}
})();

app.listen(3000, () => {
	console.log("connected to port 3000");
});

app.use("/auth", authRoutes);
app.use("/profile", checkUser, profileRoutes);

app.get("/", (req, res) => {
	console.log(req.user);
	res.render("index", {user : req.user});
});
