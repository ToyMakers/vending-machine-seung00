import { darken, lighten } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';
import { DrinkType } from '../../constants/drinkData';
import { respondTo } from '../../styles/mixin';
import putComma from '../../util/putComma';

const CanWrapper = styled.div`
  flex-basis: 25%;
  display: flex;
  justify-content: center;
`;

interface CanBlockProps {
  outerColor: any;
  innerColor: any;
  isFat: any;
  isInventory: any;
}

const CanBlock = styled.div<CanBlockProps>`
  display: flex;
  justify-content: center;
  width: 3.5rem;
  ${(props: any) =>
    props.isFat &&
    css`
      width: 4.3rem;
    `}
  height: 6.5rem;
  position: relative;
  border-radius: 0.4rem;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  font-size: 1.3rem;
  /* 아래 -> 위, 첫 번째 색으로 입구 부분 표현 */
  /* 왼쪽 -> 오른쪽, 20%까지 첫 번째 색, 나머지는 서서히 바뀜 */
  ${(props: any) =>
    css`
      background-image: linear-gradient(
          180deg,
          ${props.outerColor} 0.3em,
          ${props.outerColor} 0.3em,
          transparent 0.4em,
          transparent
        ),
        linear-gradient(
          90deg,
          ${props.outerColor} 20%,
          ${props.innerColor},
          rgba(255, 255, 255, 0.5),
          ${props.outerColor}
        );
    `}

  border-top: 3px solid gray;

  &::before,
  &::after {
    content: '';
    width: 0.1em;
    height: 0.3em;
    position: absolute;
    top: 0;
    background-color: ${(props) => props.theme.shelfBackground};
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }

  // if the can is in inventory
  ${(props: any): any => {
    const isInventory = props.isInventory;
    const inventoryBackground = props.theme.inventoryBackground;
    return (
      isInventory &&
      css`
        margin: 0rem 2rem 5rem 2rem;
        font-size: 1.6rem;
        width: 5.2rem;
        height: 8.3rem;
        &::before,
        &::after {
          width: 0.15em;
          height: 0.28em;
          background-color: ${inventoryBackground};
        }
      `
    );
  }}
`;

const CanText = styled.span`
  position: absolute;
  color: rgba(255, 255, 255, 0.9);
  font-size: inherit;
  transform-origin: 0 0; // 회전 중심
  transform: translateY(-50%) translateX(-25%) translateZ(10px) rotateX(10deg)
    rotateZ(25deg) rotateY(-10deg);
  font-family: 'Lobster', cursive;
  top: 40%;
  left: 53%;
`;

interface CanTagProps {
  toggleLight?: any;
  isInventory?: any;
}

const CanTag = styled.button<CanTagProps>`
  cursor: default;
  position: absolute;
  background-color: #0e0d0d;
  box-shadow: inset 0 0 2px 1.5px rgba(255, 255, 255, 0.2),
    -1px 1px 3px 1px rgba(24, 24, 24, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #949494;
  ${(props): any => {
    const point = props.theme.point;
    return (
      props.toggleLight &&
      css`
        cursor: pointer;
        color: ${darken(0.2, point)};
        text-shadow: 0 0 1px ${lighten(0.2, point)};
      `
    );
  }}
  height: 1.6rem;
  width: 150%;
  bottom: -2rem;
  p {
    // price or sold out
    font-weight: 700;
    font-size: 0rem;
    flex: 1;
    text-align: center;
    ${respondTo.desktop`
      font-size: 1.2rem;
  `}
    span {
      font-size: 0.5rem;
    }
  }
`;

const InventoryCanTag = styled(CanTag)`
  height: 2rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  width: 130%;
  bottom: -3rem;
  box-shadow: none;
  background-color: #272424;
`;

interface CanProps {
  canObj: DrinkType;
  toggleLight: boolean;
  isSoldOut: boolean;
  isMachine: boolean;
  isInventory: boolean;
  canNumber: number;
  onClick?: () => void;
}

function Can({
  canObj,
  toggleLight,
  isMachine,
  isSoldOut,
  isInventory,
  canNumber,
  onClick,
}: CanProps) {
  const priceWithComma = putComma(canObj.price);
  return (
    <CanWrapper>
      <CanBlock
        outerColor={canObj.outerColor}
        innerColor={canObj.innerColor}
        isFat={canObj.isFat}
        isInventory={isInventory}
      >
        <CanText>{canObj.drinkName}</CanText>
        {isInventory && <InventoryCanTag>{canNumber}</InventoryCanTag>}
        {isMachine && (
          <CanTag toggleLight={toggleLight} onClick={onClick}>
            <p>
              {isSoldOut ? (
                'Sold Out'
              ) : (
                <>
                  <span>₩ </span>
                  {priceWithComma}
                </>
              )}
            </p>
          </CanTag>
        )}
      </CanBlock>
    </CanWrapper>
  );
}

Can.defaultProps = {
  toggleLight: false,
  isSoldOut: false,
  isMachine: false,
  isInventory: false,
  canNumber: 0,
};

export default Can;
