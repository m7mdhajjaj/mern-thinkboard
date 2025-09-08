// ...existing code...
import ratelimitInstance from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimitInstance.limit(req.ip || "global");
    if (!success) {
      return res.status(429).json({ message: "Too Many Requests" });
    }
    return next();
  } catch (error) {
    console.error("Rate Limiter Error:", error);
    return res.status(429).json({ message: "Too Many Requests" });
  }
};
export default ratelimiter;
// ...existing code...
