import './Container.scss'
import React from "react";

function Container(props) {
   return <div className={`container ${props}`}>{props.children}</div>;
}

export default Container;
