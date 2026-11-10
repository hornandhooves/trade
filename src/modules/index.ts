import type { AppModule } from '../core/modules';
import positionSize from './position-size';
import riskReward from './risk-reward';

/** Add new modules here. They appear in the tab bar in this order. */
export const modules: AppModule[] = [positionSize, riskReward];
