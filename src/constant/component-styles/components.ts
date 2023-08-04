import styled from '@emotion/styled'
import { COLORS, FONTS, SIZES } from '../theme';

export const ButtonSm = styled.button`
  display: block;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 4px;
  padding-bottom: 4px;
  background-color: ${COLORS.mediumGray}
  borderRadius: ${SIZES.radius_sm};
  ${FONTS.fontSm}
  &:disabled {
    color: #A0AEC0;
    &:hover {
      background-color: ${COLORS.white}
    }
  }
  &:hover{
    background-color: #F7FAFC;
    color: #4A5568; 
  }
`;

// ${swapBold && 'font-weight: 600;'} /* If swapBold is true, apply font-weight: 600; */
// ${!swapBold && 'color: #666;'} /* If swapBold is false, apply color: #666; */