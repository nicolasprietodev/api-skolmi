import { generateAccessToken } from "../utils/authUtil";
import redisClient from "../config/redis";

export const login = async (req, res) => {
    const {userId, email} = req.body
}