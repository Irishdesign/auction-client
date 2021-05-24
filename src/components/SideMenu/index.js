import React from "react";
import "./style.scss";
import { Menu, message } from "antd";
import { MailOutlined, RiseOutlined, FallOutlined } from "@ant-design/icons";
import * as utils from "../../utils";
import queryString from "query-string";
import { AUC_TYPE } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout, setCurrentAuction } from "../../store/action";
import { CloseCircleOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

const SideMenu = (props) => {
    const [data, setData] = React.useState();
    const [openKey, setOpenKey] = React.useState(AUC_TYPE.ENGLISH);
    const currentAuction = useSelector((state) => state.currentAuction);
    const dispatch = useDispatch();
    React.useEffect(() => {
        init();
    }, []);
    React.useEffect(() => {
        setOpenKey(currentAuction.auc_type);
        console.log(774411, currentAuction);
    }, [currentAuction]);
    const init = async () => {
        const d = await utils.getMenu();
        if (d.status >= 400) {
            message.warning(d.message);
            dispatch(logout());
            return;
        }
        console.log(8888, d, AUC_TYPE.ENGLISH);

        const m = {
            [AUC_TYPE.ENGLISH]: filter(AUC_TYPE.ENGLISH, d),
            [AUC_TYPE.DUTCH]: filter(AUC_TYPE.DUTCH, d),
            [AUC_TYPE.SEALED1]: filter(AUC_TYPE.SEALED1, d),
            [AUC_TYPE.SEALED2]: filter(AUC_TYPE.SEALED2, d),
        };
        setData(m);

        //   dispatch(setCurrentAuction(m[AUC_TYPE.ENGLISH][0]));
        console.log(2222, m);
    };
    const filter = (type, d) => {
        let res = [];
        if (Array.isArray(d) && d) {
            res = d?.filter((ele) => ele.auc_type === type);
        }
        return res;
    };
    const handleOpenKey = (ty) => {
        //   if (ty === openKey) {
        //       console.log(88997766);
        //       setOpenKey([]);
        //   }
        setOpenKey(ty);
    };
    return (
        <div className="sideMenu">
            <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={[AUC_TYPE.ENGLISH]}
                openKeys={[openKey]}
                mode="inline"
                theme="light"
                inlineCollapsed={false}
            >
                <SubMenu
                    key={AUC_TYPE.ENGLISH}
                    icon={<RiseOutlined />}
                    title="English"
                    onTitleClick={() => {
                        handleOpenKey(AUC_TYPE.ENGLISH);
                    }}
                >
                    {data &&
                        data[AUC_TYPE.ENGLISH]?.map((ele) => (
                            <Menu.Item
                                key={ele.no}
                                //   onClick={(e) => {
                                //       handleAuction(e.key);
                                //   }}
                            >
                                <Link to={`/?no=${ele.no}`}>
                                    {ele.close_time !== null ? <CloseCircleOutlined /> : null}
                                    {ele.title}
                                </Link>
                            </Menu.Item>
                        ))}
                </SubMenu>
                <SubMenu
                    key={AUC_TYPE.DUTCH}
                    icon={<FallOutlined />}
                    title="Dutch"
                    onTitleClick={() => {
                        handleOpenKey(AUC_TYPE.DUTCH);
                    }}
                >
                    {data &&
                        data[AUC_TYPE.DUTCH]?.map((ele) => (
                            <Menu.Item key={ele.no}>
                                <Link to={`/?no=${ele.no}`}>
                                    {ele.close_time !== null ? <CloseCircleOutlined /> : null}
                                    {ele.title}
                                </Link>
                            </Menu.Item>
                        ))}
                </SubMenu>
                <SubMenu
                    key={AUC_TYPE.SEALED1}
                    icon={<MailOutlined />}
                    title="Sealed"
                    onTitleClick={() => {
                        handleOpenKey(AUC_TYPE.SEALED1);
                    }}
                >
                    {data &&
                        data[AUC_TYPE.SEALED1]?.map((ele) => (
                            <Menu.Item key={ele.no}>
                                <Link to={`/?no=${ele.no}`}>
                                    {ele.close_time !== null ? <CloseCircleOutlined /> : null}
                                    {ele.title}
                                </Link>
                            </Menu.Item>
                        ))}
                </SubMenu>
                <SubMenu
                    key={AUC_TYPE.SEALED2}
                    icon={<MailOutlined />}
                    title="Sealed second"
                    onTitleClick={() => {
                        handleOpenKey(AUC_TYPE.SEALED2);
                    }}
                >
                    {data &&
                        data[AUC_TYPE.SEALED2]?.map((ele) => (
                            <Menu.Item key={ele.no}>
                                <Link to={`/?no=${ele.no}`}>
                                    {ele.close_time !== null ? <CloseCircleOutlined /> : null}
                                    {ele.title}
                                </Link>
                            </Menu.Item>
                        ))}
                </SubMenu>
            </Menu>
        </div>
    );
};

export default SideMenu;
