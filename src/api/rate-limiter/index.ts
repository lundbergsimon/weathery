import { InMemoryRateLimiter } from "./in-memory";
import { RateLimiter } from "./types";

export const rateLimiter: RateLimiter = new InMemoryRateLimiter();
