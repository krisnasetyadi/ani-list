import React, { FC, useState } from 'react';

import { cardNumberFormat, rewriteString } from '../utils/helper'
import { InputLabel, Input } from '../constant/component-styles/input-component-style';

interface InputComponentProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  addOnLeft?: boolean;
  addOnRight?: boolean;
  labelInside?: boolean;
  thousandSeparator?: boolean;
  isRewrite?: boolean;
  placeholder?: string;
  formatLength?: number;
  separatorPositions?: number[];
  separatorLengths?: number[];
  value?: any;
  icon?: any;
  errors: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add the onChange prop
}
const InputComponent: FC<InputComponentProps> = ({
  name,
  label,
  type = "text",
  disabled = false,
  addOnLeft,
  addOnRight,
  labelInside = false,
  formatLength,
  isRewrite,
  value,
  icon: Icon,
  errors,
}) => {
  const [values, setValues] = useState<any>('')

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value)
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <InputLabel
        error={errors[name]}
      >
        {label}
      </InputLabel>
      <Input
        disabled={disabled}
        name={name}
        placeholder=" "
        addOnRight={Icon && <Icon size="24" className="text-neutral-700 absolute top-5 right-2" />}
        addOnLeft={addOnRight}
        errors={{errors: errors, name: name}}
        type={type}
        onChange={handleChange}
        value={value || isRewrite ? rewriteString(values) 
          : formatLength ? cardNumberFormat(values ,formatLength) 
          : values}
      />  

      {labelInside && (<label
        className={`
        absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
         ${addOnLeft ? 'left-9' : 'left-4'}
         ${addOnRight ? 'right-9' : 'right-4'}
         ${errors[name] ? 'text-rose-500' : 'text-zinc-400'}
         peer-placeholder-shown:scale-100
         peer-placeholder-shown:translate-y-0
         peer-focus:scale-75
         peer-focus:-translate-y-4`}
      >
        {label}
      </label> )}
      <span className='text-rose-500 text-sm'>{errors[name]}</span>
    </div>
  );
};

export default InputComponent;