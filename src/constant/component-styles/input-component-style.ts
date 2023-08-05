import styled from '@emotion/styled'
import { COLORS, FONTS, SIZES } from '../theme';

export const InputLabel = styled.label`
    color: ${({error}: {error: any}) => error ? COLORS.danger : COLORS.label };
    ${FONTS.font};
    text-transform: uppercase;
    transition: transform 150ms;
    transform: translateY(-0.75rem);
    top: 1.25rem;
    z-index: 10;
    transform-origin: 0;
    font-weight: 600;
`
export const Input = styled.input<{addOnRight?: boolean; addOnLeft?: boolean; errors: any; name: string  }>`
  width: 100%;
  font-weight: 300;
  background-color: white;
  border: 2px solid;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.2s;
  cursor: pointer;
  &.disabled {
    opacity: 0.7;
    cursor: not-allowed;
  };
  padding-right: ${({ addOnRight }: { addOnRight?: boolean }) => (addOnRight ? '2.25rem' : '1rem')};
  padding-left: ${({ addOnLeft }: { addOnLeft?: boolean }) => (addOnLeft ? '2.25rem' : '1rem')};
  border-color: ${({ errors, name }: { errors: any, name: string }) =>
  errors[name] ? '#F43F5E' : '#E2E8F0'};
  &:focus {
    border-color: ${({ errors, name }: { errors: any, name: string }) =>
    errors[name] ? '#F43F5E' : '#000000'};
  }
`