import React, { useState } from 'react';
import { View } from 'react-native';
import { money, num, qty } from '../../core/format';
import { Card, Field, Lesson, Notice, P, Result, Title } from '../../ui/components';
import { spacing } from '../../ui/theme';
import { calcPositionSize } from './calc';

export default function PositionSizeScreen() {
  const [balance, setBalance] = useState('');
  const [risk, setRisk] = useState('1');
  const [entry, setEntry] = useState('');
  const [stop, setStop] = useState('');

  const r = calcPositionSize({
    balance: num(balance),
    riskPercent: num(risk),
    entry: num(entry),
    stop: num(stop),
  });
  const touched = balance !== '' || entry !== '' || stop !== '';

  return (
    <View style={{ gap: spacing.lg }}>
      <Title>Position size</Title>
      <Card>
        <Field label="Account balance" value={balance} onChangeText={setBalance} suffix="$" />
        <Field label="Risk per trade" value={risk} onChangeText={setRisk} suffix="%" />
        <Field label="Entry price" value={entry} onChangeText={setEntry} />
        <Field label="Stop-loss price" value={stop} onChangeText={setStop} />
      </Card>

      <Card>
        {r.ok ? (
          <>
            <Result label="Direction" value={r.side.toUpperCase()} />
            <Result label="Amount at risk" value={`$${money(r.riskAmount)}`} tone="bad" />
            <Result label="Position size (units)" value={qty(r.size)} tone="good" />
            <Result label="Position value" value={`$${money(r.positionValue)}`} />
            <Result
              label="Effective leverage"
              value={`${r.leverage.toFixed(2)}x`}
              tone={r.leverage > 1 ? 'warn' : 'default'}
            />
          </>
        ) : (
          <Notice>{touched ? r.error : 'Enter your numbers to see the result.'}</Notice>
        )}
      </Card>

      <Lesson title="Why size positions by risk?">
        <P>
          Beginners often pick a position size by gut feeling. Professionals start from a different question: how much
          am I willing to lose if I'm wrong?
        </P>
        <P>
          Formula: size = (balance × risk%) ÷ |entry − stop|. The stop-loss distance decides how many units you can
          buy, so a wider stop means a smaller position, and the dollar loss stays the same.
        </P>
        <P>
          Most traders risk 0.5–2% per trade. At 1%, ten losses in a row cost about 10% of the account. At 10% per
          trade, the same streak would nearly wipe you out.
        </P>
        <P>
          If leverage shows above 1x, the position is bigger than your balance. Check that your broker or exchange
          allows it and that you're comfortable with the liquidation risk.
        </P>
      </Lesson>
    </View>
  );
}
