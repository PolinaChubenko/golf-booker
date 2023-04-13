// import React, {useEffect} from 'react';

import "react-tooltip/dist/react-tooltip.css";
//import "./styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Balloon2 = () => {

    return (
        <>
            <div style={{ position: "absolute", left: 40, top: 100 }}>
                <button id="app-title-2">
                    Bottom 2
                </button>
            </div>

            <ReactTooltip
                anchorId="app-title-2"
                place="bottom"
                content="Текст всплывающей подсказки, содержащий ссылки:<br><a href='https://yandex.ru'>Яндекс</a><br><a href='https://www.google.ru'>Google</a>"
            />
        </>
    );
}

export default Balloon2;
