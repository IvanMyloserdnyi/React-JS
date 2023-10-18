import React from "react";
import preloader from "../../../assets/photos/loader.svg";

let Preloader = (props) => {
    return <div>
        <img src={preloader} alt={'Loading'}/>
    </div>
}
export default Preloader