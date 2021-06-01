import * as React from "react";
import "./app.scss";
const ListItem = (props) => (
    <li className="ListItem">
        <div className="label">{props.label}</div>
        <div className="text">{props.children || props.text}</div>
    </li>
);

export default ListItem;
