const ipRequestMap = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(ip: string, limit: number = 20, windowMs: number = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now > entry.expiresAt) {
    ipRequestMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}
