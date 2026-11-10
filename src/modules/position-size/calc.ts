export type PositionInput = {
  balance: number;
  riskPercent: number;
  entry: number;
  stop: number;
};

export type PositionResult =
  | { ok: false; error: string }
  | {
      ok: true;
      side: 'long' | 'short';
      riskAmount: number;
      riskPerUnit: number;
      size: number;
      positionValue: number;
      /** Position value as a multiple of account balance (1 = no leverage). */
      leverage: number;
    };

export function calcPositionSize({ balance, riskPercent, entry, stop }: PositionInput): PositionResult {
  if ([balance, riskPercent, entry, stop].some((n) => !Number.isFinite(n))) {
    return { ok: false, error: 'Fill in all fields with valid numbers.' };
  }
  if (balance <= 0 || entry <= 0 || stop <= 0) {
    return { ok: false, error: 'Balance, entry and stop must be above 0.' };
  }
  if (riskPercent <= 0 || riskPercent > 100) {
    return { ok: false, error: 'Risk % must be between 0 and 100.' };
  }
  if (entry === stop) {
    return { ok: false, error: 'Stop loss must differ from entry.' };
  }
  const riskAmount = (balance * riskPercent) / 100;
  const riskPerUnit = Math.abs(entry - stop);
  const size = riskAmount / riskPerUnit;
  const positionValue = size * entry;
  return {
    ok: true,
    side: stop < entry ? 'long' : 'short',
    riskAmount,
    riskPerUnit,
    size,
    positionValue,
    leverage: positionValue / balance,
  };
}
