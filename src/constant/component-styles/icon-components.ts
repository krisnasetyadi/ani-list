import styled from '@emotion/styled'
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { COLORS, FONTS, SIZES } from '../theme';

export const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  height: 2rem;
  width: 1.8rem;
  stroke-width: 2px;
  pointer-events: auto;
  &:hover {
    stroke-width: 1.2px;
    stroke: ${COLORS.light};
  }
`;