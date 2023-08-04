import styled from '@emotion/styled'
import { COLORS } from '../theme';
export const Label = styled.label`
  display: block;
  margin-bottom: 8px; 
  font-size: 14px;
  font-weight: 600; 
  font-family:  sans-serif;
`;

export const Span = styled.span`
  display: block;
  margin-top: 8px;
  margin-bottom: 12px;
  margin-left: 5px;
  font-size: 14px;
  font-family: sans-serif;
  color: ${COLORS.mediumGray};
`;
