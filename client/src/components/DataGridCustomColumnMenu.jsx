import React from 'react';
import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
} from "@mui/x-data-grid"

const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn, open } = props;  // these props comes default with mui

    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            open={open}
        >
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
            <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    )
}

export default CustomColumnMenu