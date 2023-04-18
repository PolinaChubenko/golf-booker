import React, {useEffect, useState} from "react";
import InputSection from "./InputSection";
import PlayerSection from "./PlayerSection";


const SectionController = ({playerList, handleInputChange, handleOpenEdit, handleRemove}) => {
    return (
        playerList.map((player, index) => {
            if (player.is_new) {
                return (
                    <InputSection
                        key={index}
                        handleInputChange={handleInputChange}
                        handleRemove={handleRemove}
                        player={player}
                        index={index}
                    />
                )
            } else {
                return (
                    <PlayerSection
                        key={index}
                        handleOpenEdit={handleOpenEdit}
                        handleRemove={handleRemove}
                        player={player}
                        index={index}
                    />
                )
            }
        })
    )
}

export default SectionController;