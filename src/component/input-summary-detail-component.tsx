import React from 'react';
import { Label, Span } from '../constant/component-styles/summary-component-style';
import { Tag } from '../constant/component-styles/components';

interface InputSummaryDetailComponentProps {
    label: String;
    value?: String;
    swapBold?:boolean;
}

const InputSummaryDetailComponent = (props: InputSummaryDetailComponentProps) => {
  const { label, value, swapBold } = props;

  return (
    <div style={{ width: '100%', marginTop: '3px'}}>
      <Label>
        {label}
      </Label>
      <Span>
        {value}
      </Span>
    </div>
  );
};

export default InputSummaryDetailComponent;
