import styled from '@emotion/styled'
import { COLORS, FONTS, SIZES } from '../theme';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export const TableContainer = styled.div`
  overflow-x: hidden;
  position: relative;
  padding-left: 24px; 
  padding-bottom: 44px;
  background-color: #e2e9f1; 
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); 
  border-bottom-left-radius: 48px;
`

export const Table = styled.table`
  width: 100%;
  font-size: 14px;
  text-align: left;
  border: 1px solid #d1d5db; 
  color: #6b7280;
  border-top-width: 1px;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  font-size: 12px;
  height: 30px;
  color: ${COLORS.text};
  text-transform: uppercase;
  background-color: ${COLORS.light};
`

export const Tr = styled.tr`    
  background-color: ${({isEven}:{isEven: boolean}) => (isEven ? COLORS.white : '#dae4f1')};
  border: 1px solid #E5E7EB; 
  &:hover {
    background-color: #F3F4F6;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
` 
export const Td = styled.td`
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: center;
  padding-right: ${(({isSelection}: {isSelection?: boolean}) =>(isSelection ? '3px' : '1.5px') )};
  padding-left: ${(({isSelection}: {isSelection?: boolean}) =>(isSelection ? '3px' : '1.5px') )};
`
export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.white};
  padding-left: 1rem;
`

export const SpanText = styled.td`
  background-color: 'green'
  width: '500px'
  font-size: 0.875rem;
  font-family: Roboto;
  font-weight: 400;
  color: ${COLORS.mediumGray};
`

export const SpanBold = styled.span`
  font-weight: 600;
  font-family: Roboto;
  color: ${COLORS.mediumGray};
`
export const Ul = styled.ul`
  display: inline-flex;
  align-items: center;
  ${FONTS.fontSm}
  margin-right: -2px; 
  padding-top: 2px;
  padding-bottom: 2px;
  list-style-type: none;
`
export const HiddenSpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
`
export const ButtonNavTable= styled.button`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  line-height: 1.25;
  color: ${COLORS.black};
  border-radius: 0.375rem; 
  background-color: #f3f3f3; 
  order-radius: 6px;
  margin-right: 4px; 
  &:hover {
    background-color: #374151;
    color: ${COLORS.white};
  }
`
export const ButtonNavTable2 = styled.button`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  margin-left: 2px;
  line-height: 1.5;
  color: #000000;
  background-color: ${({isDisabled}:{isDisabled: boolean}) => isDisabled ? COLORS.primaryLight : '#f3f3f3'};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${COLORS.primaryLight};
    color: ${COLORS.white};
  }

  &:disabled {
    background-color: ${COLORS.primaryDisabled};
    color: ${COLORS.white};
    cursor: not-allowed;
 }

  &[disabled]:hover {
    background-color: ${COLORS.primaryDisabled};
    color:  ${COLORS.white};
  }

`
export const ButtonPage = styled.button`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  margin-right: 4px;
  margin-left: 2px;
  line-height: 1.5;
  color: ${COLORS.black};
  border-radius: 10px;
  background-color: #f3f3f3;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
   background-color: ${COLORS.primaryLight};
   color: ${COLORS.white}; 
  }
`

export const ButtonIcon = styled.button`
  display: block;
  padding: 8px 12px;
  color: #718096;
  background-color: ${COLORS.white};
  &.disabled {
    color: #a0aec0;
    &:hover {
      background-color: ${COLORS.white};
    }
  }
  &:hover {
    background-color: #edf2f7;
    color: #4a5568;
  }
`
export const SpanTag = styled.span`
  margin-top: 10px;
  background-color: #3480ea;
  border-radius: 10px;
  margin-right: 10px;
  color: ${COLORS.white};
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  text-transform: lowercase;
`
export const TdLink = styled(Link)`
  color: ${COLORS.title};
  font-family: 'Roboto';
  font-weight: 600;
  text-decoration: none;
  &:hover {
    color: ${COLORS.mediumGray};
  }
`

export const ChevronNavRight = styled(ChevronRightIcon)`
  widht: 30px;
  margin-left: 5px;
  margin-right: 5px;
  height: 30px;
  border: 1px solid ${COLORS.title};
  border-radius: 10px;
  color: ${COLORS.title};
  background-color:${({isLastPage}: {isLastPage: boolean}) => (isLastPage ? `${COLORS.primaryDisabled}` : COLORS.white)};

  &:hover {
    cursor: pointer;
    background-color: ${COLORS.primaryLight};
  }
`

export const ChevronNavLeft = styled(ChevronLeftIcon)`
  widht: 30px;
  margin-left: 5px;
  margin-right: 5px;
  height: 30px;
  border: 1px solid ${COLORS.title};
  border-radius: 10px;
  color: ${COLORS.title};
  background-color:${({isLastPage}: {isLastPage: boolean}) => (isLastPage ? `${COLORS.primaryDisabled}` : COLORS.white)};

  &:hover {
    cursor: pointer;
    background-color: ${COLORS.primaryLight};
  }
`