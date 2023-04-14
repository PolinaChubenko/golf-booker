import React from 'react';
import "react-tooltip/dist/react-tooltip.css";
import {styled} from '@mui/material/styles';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

// source: https://mui.com/material-ui/react-tooltip/
const Balloon = ({eventElement}) => {
    const balloon_inner = <p>Это баллун</p>
    return (
        <HtmlTooltip title={balloon_inner}>
            {eventElement.title}
        </HtmlTooltip>
    );
}

export default Balloon;