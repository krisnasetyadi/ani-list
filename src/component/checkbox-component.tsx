import React, { useRef, useEffect, forwardRef, RefObject, LegacyRef } from 'react';

interface CheckboxComponentProps {
  disable?: boolean; 
  indeterminate?: boolean | undefined;
}
const Checkbox = forwardRef<HTMLInputElement, CheckboxComponentProps>(({ disable = false, indeterminate, ...rest }, ref) => {

  const defaultRef = React.useRef<HTMLInputElement | null>(null);
  const resolvedRef: LegacyRef<HTMLInputElement> | RefObject<HTMLInputElement> = ref || defaultRef;

  useEffect(() => {
    if ('current' in resolvedRef) {
      resolvedRef.current!.indeterminate = !!indeterminate;
    }
  }, [resolvedRef, indeterminate]);
  return <input type="checkbox" className="mr-2" ref={resolvedRef} {...rest} disabled={disable}  style={{ width: '15px', height: '15px' }}/>;
});
export default Checkbox;
