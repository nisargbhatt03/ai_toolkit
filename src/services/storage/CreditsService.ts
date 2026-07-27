import { CreditsState } from "@/types/credits";

export interface ICreditsService {
  getCreditsState(): CreditsState;
  useCredit(): CreditsState;
  hasAvailableCredits(): boolean;
}

const STORAGE_KEY = "ai_toolkit_credits_v1";
const DEFAULT_MAX_CREDITS = 3;

export class LocalStorageCreditsService implements ICreditsService {
  private getTodayString(): string {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  public getCreditsState(): CreditsState {
    if (typeof window === "undefined") {
      return {
        remainingCredits: DEFAULT_MAX_CREDITS,
        maxDailyCredits: DEFAULT_MAX_CREDITS,
        lastResetDate: this.getTodayString(),
      };
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const todayStr = this.getTodayString();

      if (!stored) {
        const initialState: CreditsState = {
          remainingCredits: DEFAULT_MAX_CREDITS,
          maxDailyCredits: DEFAULT_MAX_CREDITS,
          lastResetDate: todayStr,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
        return initialState;
      }

      const parsed: CreditsState = JSON.parse(stored);

      // Check if a new day has arrived to reset daily credits
      if (parsed.lastResetDate !== todayStr) {
        const resetState: CreditsState = {
          remainingCredits: DEFAULT_MAX_CREDITS,
          maxDailyCredits: DEFAULT_MAX_CREDITS,
          lastResetDate: todayStr,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
        return resetState;
      }

      return parsed;
    } catch {
      return {
        remainingCredits: DEFAULT_MAX_CREDITS,
        maxDailyCredits: DEFAULT_MAX_CREDITS,
        lastResetDate: this.getTodayString(),
      };
    }
  }

  public useCredit(): CreditsState {
    const state = this.getCreditsState();

    if (state.remainingCredits <= 0) {
      return state;
    }

    const updatedState: CreditsState = {
      ...state,
      remainingCredits: state.remainingCredits - 1,
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      } catch (err) {
        console.error("Failed to update credits state in storage", err);
      }
    }

    return updatedState;
  }

  public hasAvailableCredits(): boolean {
    const state = this.getCreditsState();
    return state.remainingCredits > 0;
  }
}

export const creditsService = new LocalStorageCreditsService();
