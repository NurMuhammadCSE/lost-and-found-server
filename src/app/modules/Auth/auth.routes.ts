import express from "express"


const router = express.Router();

router.post('/login', AuthController.loginUser)

export const authRoutes = router;