import React from "react";
import preloader from "../../../assets/photos/loader.svg";

let Preloader: React.FC = () => {
    return <div>
        <img src={preloader} alt={'Loading'}/>
    </div>
}
export default Preloader

