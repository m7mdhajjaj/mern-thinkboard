import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

let ratelimitInstance;

try {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn(
      "UPSTASH env vars missing (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN). Falling back to no-op rate limiter."
    );
    // no-op limiter so app doesn't crash in development
    ratelimitInstance = {
      async limit(_key) {
        return { success: true, remaining: Infinity };
      },
    };
  } else {
    const redis =
      typeof Redis.fromEnv === "function"
        ? Redis.fromEnv()
        : new Redis({ url, token });

    ratelimitInstance = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "20 s"),
    });
  }
} catch (err) {
  console.error("Failed to initialize Upstash rate limiter:", err);
  // safe fallback
  ratelimitInstance = {
    async limit(_key) {
      return { success: true, remaining: Infinity };
    },
  };
}

export default ratelimitInstance;
