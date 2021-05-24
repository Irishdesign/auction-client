import * as React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
const InvitationHeader = (props) => {
    return (
        <div className="invitationNavBar">
            <div className="groupLogo">
                <div className="logoTxt">Auction Game</div>
                <div className="logoIcon">
                    <FontAwesomeIcon icon={faGavel}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    );
};

export default InvitationHeader;
