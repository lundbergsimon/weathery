import { RateLimiter } from "./types";

export class InMemoryRateLimiter implements RateLimiter {
  private readonly requests = new Map<
    string,
    { count: number; resetTime: number }
  >();
  private readonly windowMs = 60 * 1000; // 1 minute window
  private readonly maxRequests = 10; // Max 10 requests per minute per ID

  constructor() {
    // Periodically clean up expired records to prevent memory leaks
    setInterval(() => this.cleanup(), 60 * 60 * 1000); // Every 60 minutes
  }

  private cleanup() {
    const now = Date.now();
    for (const [id, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(id);
      }
    }
  }

  async checkLimit(id: string): Promise<boolean> {
    const now = Date.now();
    const record = this.requests.get(id);

    if (!record || now > record.resetTime) {
      this.requests.set(id, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }
}
