import React, { useState } from "react";
import "./App.scss";
import InvitationHeader from "../../components/InvitationHeader";
import queryString from "query-string";
const QRCode = require("qrcode.react");
const base_url = process.env.REACT_APP_BASE || "https://autcion.herokuapp.com/";
function App(props) {
    const [info, setInfo] = React.useState({});
    React.useEffect(() => {
        QueryParamsDemo();
    }, [props]);

    function QueryParamsDemo() {
        let query = queryString.parse(props.location.search);
        console.log(query);
        setInfo(query);
    }
    const url = `${base_url}/bid?no=${info.no}`;
    return (
        <div className="App">
            <InvitationHeader />
            <div className="container">
                <div className="invitation">
                    <h1>Welcome to join the auction! </h1>
                    <h3>Auction title: {info.title}</h3>
                    <h3>Auction no: {info.no}</h3>
                    <div className="qrCode">
                        <QRCode value={url} />
                    </div>
                    <div>
                        <a href={url}>{url}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
