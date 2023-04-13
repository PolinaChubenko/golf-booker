import React, {useEffect} from 'react';

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Balloon = () => {

    return (
        <>
            <div style={{ position: "absolute", left: 40, top: 40 }}>
                <button id="app-title">
                    Bottom
                </button>
            </div>

            <ReactTooltip
                anchorId="app-title"
                place="bottom"
                html={
                    "<div> Текст всплывающей подсказки, содержащий ссылки: </div><br><a href='https://www.google.ru'>Google</a><br><a href='https://yandex.ru'>Яндекс</a>"
                }
            />
        </>
    );
}

export default Balloon;
