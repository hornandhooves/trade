import React, { useState } from 'react';
import { View } from 'react-native';
import { money, num } from '../../core/format';
import { Card, Field, Lesson, Notice, P, Result, Title } from '../../ui/components';
import { spacing } from '../../ui/theme';
import { calcRiskReward } from './calc';

export default function RiskRewardScreen() {
  const [entry, setEntry] = useState('');
  const [stop, setStop] = useState('');
  const [target, setTarget] = useState('');
  const [size, setSize] = useState('');

  const r = calcRiskReward({ entry: num(entry), stop: num(stop), target: num(target), size: num(size) });
  const touched = entry !== '' || stop !== '' || target !== '' || size !== '';

  return (
    <View style={{ gap: spacing.lg }}>
      <Title>Risk / reward</Title>
      <Card>
        <Field label="Entry price" value={entry} onChangeText={setEntry} />
        <Field label="Stop-loss price" value={stop} onChangeText={setStop} />
        <Field label="Take-profit price" value={target} onChangeText={setTarget} />
        <Field label="Position size (units)" value={size} onChangeText={setSize} />
      </Card>

      <Card>
        {r.ok ? (
          <>
            <Result label="Direction" value={r.side.toUpperCase()} />
            <Result label="Potential loss" value={`-$${money(r.risk)}`} tone="bad" />
            <Result label="Potential profit" value={`+$${money(r.reward)}`} tone="good" />
            <Result
              label="Risk : reward"
              value={`1 : ${r.ratio.toFixed(2)}`}
              tone={r.ratio >= 2 ? 'good' : r.ratio < 1 ? 'bad' : 'warn'}
            />
            <Result label="Break-even win rate" value={`${r.breakevenWinRate.toFixed(1)}%`} />
          </>
        ) : (
          <Notice>{touched ? r.error : 'Enter your numbers to see the result.'}</Notice>
        )}
      </Card>

      <Lesson title="Reading risk : reward">
        <P>
          Risk : reward compares what you stand to lose (entry to stop) with what you hope to gain (entry to target).
          A 1 : 2 trade risks $1 to make $2.
        </P>
        <P>
          The break-even win rate is the share of trades you must win just to not lose money: 1 ÷ (1 + ratio). At 1 : 1
          you need to win 50% of the time. At 1 : 2 you need only about 33%. At 1 : 0.5 you need 67%.
        </P>
        <P>
          A good ratio doesn't make a trade good by itself. The target also has to be realistic, so check it against
          support/resistance or recent price range. These numbers also ignore fees and slippage, which matter on small
          moves.
        </P>
      </Lesson>
    </View>
  );
}
