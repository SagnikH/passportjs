const passport = require("passport");

const router = require("express").Router();

// router.get("/google");
router.get("/login", (req, res) => {
	res.render("login");
});

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/auth/login",
	}),
	function (req, res) {
		// res.send(`Callback called ${req.user}`);
		res.redirect("/profile");
	}
);

module.exports = router;
