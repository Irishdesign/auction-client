import * as React from "react";
import { BankOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { Link } from "react-router-dom";
import SignupModal from "../SignupModal";
import * as util from "../../utils";
import LoginModal from "../LoginModal";
import CreateModal from "../CreateModal";
import * as action from "../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../store/action";
const NavBar = (props) => {
    const [showLogin, setShowLogin] = React.useState(false);
    const [showSignup, setShowSignup] = React.useState(false);

    const isLogin = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();
    const showMenu = useSelector((state) => state.showMenu);
    const showCreatePanel = useSelector((state) => state.showCreatePanel);
    //  const showCreatePanel = useSelector((state) => state.showCreatePanel);

    const handleLogout = () => {
        dispatch(logout());
    };
    const showingForum = () => {
        dispatch(action.setShowMenu(!showMenu));
    };
    const showingCreate = (v) => {
        dispatch(action.setShowCreatePanel(v));
    };
    React.useEffect(() => {
        checkUser();
    }, []);
    const checkUser = async () => {
        const info = await util.getUserInfo();
        console.log(info);
        if (!info) return;
        if (info.status >= 400) {
            message.warning(info.message);
            return;
        }
        if (info) {
            dispatch(action.setUser(info));
        }
    };
    return (
        <div className="navBar">
            <div className="groupLogo">
                <div className="logoIcon burger" onClick={() => showingForum(true)}>
                    <MenuOutlined />
                </div>
                <div className="logoTxt">Auction Game</div>
                <div className="logoIcon">
                    <FontAwesomeIcon icon={faGavel}></FontAwesomeIcon>
                </div>
            </div>

            <div className="groupBtn">
                {!isLogin ? (
                    <>
                        <div className="navBtn">
                            <Button onClick={() => setShowSignup(true)}>Sign up</Button>
                        </div>

                        <div className="navBtn">
                            <Button onClick={() => setShowLogin(true)}>Login</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="navBtn">
                            <Button onClick={() => showingCreate(true)}>New Auction</Button>
                        </div>

                        <div className="navBtn">
                            <Button onClick={() => handleLogout()}>Log out</Button>
                        </div>
                    </>
                )}
                {showSignup ? <SignupModal visible={showSignup} close={() => setShowSignup(false)} /> : null}

                {showLogin ? <LoginModal visible={showLogin} close={() => setShowLogin(false)} /> : null}
                {showCreatePanel ? <CreateModal visible={showCreatePanel} close={() => showingCreate(false)} /> : null}
            </div>
        </div>
    );
};
// const mapDispatchToProps = {

// }
// NavBar = connect(null, mapDispatchToProps)(NavBar);

export default NavBar;
