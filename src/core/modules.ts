import type { ComponentType } from 'react';

/**
 * A feature of the app: a calculator, a lesson, a journal, etc.
 * To add a new one, create a folder in src/modules/ and add it to
 * the list in src/modules/index.ts.
 */
export type AppModule = {
  id: string;
  title: string;
  /** Short emoji/text shown in the tab bar */
  icon: string;
  Screen: ComponentType;
};
