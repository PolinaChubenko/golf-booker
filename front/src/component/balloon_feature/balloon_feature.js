import React from 'react';

import "react-tooltip/dist/react-tooltip.css";

import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

// source: https://mui.com/material-ui/react-tooltip/
const Balloon = (props) => {
    return (
        <>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="red">Tooltip with HTML</Typography>
                        <em>{ props.title_pl1 }</em><br />
                        <b>Имя: { props.name_pl1 }</b><br />
                        <u>Гандикап { props.handicap_pl1 }</u><br />
                        {"Участник клуба: "}{ props.club_mem_pl1 }
                    </React.Fragment>
                }
            >
                <button id="app-title">
                    Bottom
                </button>
            </HtmlTooltip>
        </>
    );
}

export default Balloon;