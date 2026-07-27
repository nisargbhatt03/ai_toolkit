export interface IAnalyticsService {
  trackToolOpened(slug: string): void;
  getToolUsageCounts(): Record<string, number>;
}

const ANALYTICS_KEY = "ai_toolkit_analytics_v1";

export class LocalAnalyticsService implements IAnalyticsService {
  public trackToolOpened(slug: string): void {
    if (typeof window === "undefined") return;

    try {
      const counts = this.getToolUsageCounts();
      counts[slug] = (counts[slug] || 0) + 1;
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(counts));
    } catch (err) {
      console.error("Failed to update analytics", err);
    }
  }

  public getToolUsageCounts(): Record<string, number> {
    if (typeof window === "undefined") return {};

    try {
      const stored = localStorage.getItem(ANALYTICS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }
}

export const analyticsService = new LocalAnalyticsService();
