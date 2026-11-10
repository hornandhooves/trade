export type RRInput = {
  entry: number;
  stop: number;
  target: number;
  size: number;
};

export type RRResult =
  | { ok: false; error: string }
  | {
      ok: true;
      side: 'long' | 'short';
      risk: number;
      reward: number;
      /** Reward divided by risk, e.g. 2 means 2R. */
      ratio: number;
      /** Win rate needed to break even, as a percentage (ignores fees). */
      breakevenWinRate: number;
    };

export function calcRiskReward({ entry, stop, target, size }: RRInput): RRResult {
  if ([entry, stop, target, size].some((n) => !Number.isFinite(n))) {
    return { ok: false, error: 'Fill in all fields with valid numbers.' };
  }
  if (entry <= 0 || stop <= 0 || target <= 0 || size <= 0) {
    return { ok: false, error: 'All values must be above 0.' };
  }
  if (entry === stop) return { ok: false, error: 'Stop loss must differ from entry.' };

  const side = stop < entry ? 'long' : 'short';
  const stopOk = side === 'long' ? stop < entry : stop > entry;
  const targetOk = side === 'long' ? target > entry : target < entry;
  if (!stopOk || !targetOk) {
    return { ok: false, error: `For a ${side}, the target must be on the opposite side of entry from the stop.` };
  }

  const risk = Math.abs(entry - stop) * size;
  const reward = Math.abs(target - entry) * size;
  const ratio = reward / risk;
  return { ok: true, side, risk, reward, ratio, breakevenWinRate: (1 / (1 + ratio)) * 100 };
}
