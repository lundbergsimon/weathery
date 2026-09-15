export interface RateLimiter {
  checkLimit(id: string): Promise<boolean>;
}
