import React, {useEffect, useState} from "react";
import InputSection from "./InputSection";
import PlayerSection from "./PlayerSection";


const SectionController = ({playerList, handleInputChange, handleOpenEdit, handleRemove}) => {
    return (
        playerList.map((player, index) => {
            if (player.is_new) {
                return (
                    <InputSection
                        handleInputChange={handleInputChange}
                        handleRemove={handleRemove}
                        player={player}
                        index={index}
                    />
                )
            } else {
                return (
                    <PlayerSection
                        handleOpenEdit={handleOpenEdit}
                        player={player}
                        index={index}
                    />
                )
            }
        })
    )
}

export default SectionController;