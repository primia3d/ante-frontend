/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type StepItem = {
  component: React.ComponentType<any>;
  props?: any;
};

type StepperContentProps = {
  currentStep: number;
  items: StepItem[];
};

export function StepperContent({ currentStep, items }: StepperContentProps) {
  const Step = items[currentStep - 1].component;
  const stepProps = items[currentStep - 1].props;

  return <Step {...stepProps} />;
}
