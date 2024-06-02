import { useState } from 'react';

export function useBoolean(defaultState = false) {
  const [bool, setBool] = useState(defaultState);

  return {
    value: bool,
    on: () => setBool(true),
    off: () => setBool(false),
    set: (value: boolean) => setBool(value),
    toggle: () => setBool(!bool),
  };
}
