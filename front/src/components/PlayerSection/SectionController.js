import React, {useEffect, useState} from "react";
import InputSection from "./InputSection";
import PlayerSection from "./PlayerSection";


const SectionController = ({inputList, handleInputChange, handleOpenEdit, handleRemove}) => {
    return (
        inputList.map((user_info, index) => {
            if (user_info.is_new) {
                return (
                    <InputSection
                        handleInputChange={handleInputChange}
                        handleRemove={handleRemove}
                        user_info={user_info}
                        index={index}
                    />
                )
            } else {
                return (
                    <PlayerSection
                        handleOpenEdit={handleOpenEdit}
                        user_info={user_info}
                        index={index}
                    />
                )
            }
        })
    )
}

export default SectionController;