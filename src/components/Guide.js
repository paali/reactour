import styled from 'styled-components';
import * as hx from '../helpers';

/**
 * Only use styled component on transformations.
 * Handle rest of the styles as normal classes.
 */
const Guide = styled.div`
  transform: ${(props) => {
        const {
            targetTop,
            targetRight,
            targetBottom,
            targetLeft,
            targetWidth,
            targetHeight,
            windowWidth,
            windowHeight,
            helperWidth,
            helperHeight,
            helperPosition,
            padding,
        } = props;

        const available = {
            left: targetLeft,
            right: windowWidth - targetRight,
            top: targetTop,
            bottom: windowHeight - targetBottom,
        };

        const couldPositionAt = (position) => {
            return (
                available[position] >
        (hx.isHoriz(position)
            ? helperWidth + padding * 2
            : helperHeight + padding * 2)
            );
        };

        const autoPosition = (coords) => {
            const positionsOrder = hx.bestPositionOf(available);
            for (let j = 0; j < positionsOrder.length; j++) {
                if (couldPositionAt(positionsOrder[j])) {
                    return coords[positionsOrder[j]];
                }
            }
            return coords.center;
        };

        const pos = (helperPosition) => {
            const outsideY = targetTop + helperHeight > windowHeight;
            const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
                ? hx.isOutsideX(targetRight + padding, windowWidth)
                    ? targetRight - helperWidth
                    : targetRight - helperWidth + padding
                : targetLeft - padding;
            const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
                ? hx.isOutsideY(targetBottom + padding, windowHeight)
                    ? targetBottom - helperHeight
                    : targetBottom - helperHeight + padding
                : targetTop - padding;
            const coords = {
                top: [hX, targetTop - helperHeight - padding * 2],
                right: [targetRight + padding * 2, hY],
                bottom: [hX, targetBottom + padding * 2],
                left: [targetLeft - helperWidth - padding * 2, hY],
                center: [
                    windowWidth / 2 - helperWidth / 2,
                    windowHeight / 2 - helperHeight / 2,
                ],
            };
            if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
                return coords[helperPosition];
            }
            return autoPosition(coords);
        };

        const p = pos(helperPosition);

        return `translate(${p[0]}px, ${p[1]}px)`;
    }};
`;

export default Guide;
