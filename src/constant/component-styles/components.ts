import styled from '@emotion/styled'
import { COLORS, FONTS, SIZES } from '../theme';

export const ButtonSm = styled.button`
  display: block;
  width: 5%;
  height: 2%;
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

export const Button = styled.button`
  width: 5%;
  height: 2%;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: #1f5dfb;
  border-color: #eef5ff;
  border-radius: ${SIZES.radius_sm}px;
  ${FONTS.fontSm}
  &:disabled {
    color: #A0AEC0;
    &:hover {
      background-color: ${COLORS.white};
    }
  }
  &:hover{
    background-color: #F7FAFC;
    color: #4A5568; 
  }
`;

export const H1Bold = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  font-family: Roboto;
  letter-spacing: 0.5px;
  @media (max-width: 640px) {
    font-size: 0.75rem; 
    margin-right: 2px;
  }
`
export const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%
`
export const DivwithGrid = styled.div`
  display: grid;
  width: 95%;
  margin-top: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 12px;
  grid-items: start;
  justify-items: center;
  background-color: white;
  padding: 8px;
  border: 1px solid ${COLORS.light};
  border-radius: 30px;
  padding: 20px;
  box-shadow: 1px 4px 4px rgba(0,0,0,0.25);
`
export const Title = styled.span`
  display: block;
  margin-left: 30px;
  font-weight: 700;
  ${FONTS.fontLg};
`
export const Tag = styled.div`
  background-color:${(props) => props.color || COLORS.white};
  border-radius: 20px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: ${COLORS.white};
  ${FONTS.fontXs}
`