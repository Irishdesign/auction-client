import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { setUser } from "../../store/action";
import { useSelector, useDispatch } from "react-redux";
import * as util from "../../utils";
import * as constants from "../../constants";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const LoginModal = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        //   console.log(values);
        //   setUser(values);

        util.login(values).then((r) => {
            console.log(1111, r.data.accessToken);
            // ssaveToken(r.data.accessToken);
            dispatch(setUser(r.data));
            close();
        });
        //    {
        //       "username":"abc",
        //       "email":"abc@gmail.com",
        //       "password":"12345",
        //       "roles":["user"]
        //   }
    };
    const TOKEN = localStorage.getItem(constants.SESSION_KEY);
    React.useEffect(() => {
        if (TOKEN) {
            util.getUserInfo();
        }
    }, []);
    //  const AfterLogin = () => {
    //      setUser();
    //      close();
    //  };
    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            username: "abc",
            password: "12345",
        });
    };
    //  const TOKEN = constants.SESSION_KEY;
    //  function ssaveToken(userToken) {
    //      sessionStorage.setItem(TOKEN, JSON.stringify(userToken));
    //  }
    //  const saveToken = (userToken) => {
    //      localStorage.setItem(TOKEN, JSON.stringify(userToken));
    //      setToken(userToken.token);
    //  };
    //  function getToken() {
    //      const tokenString = sessionStorage.getItem(TOKEN);
    //      const userToken = JSON.parse(tokenString);
    //      return userToken?.token;
    //  }
    const { visible, close } = props;
    return (
        <>
            <Modal
                visible={visible}
                title="Log in"
                onCancel={() => {
                    close();
                }}
                footer={null}
            >
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        {/* <Button htmlType="button" onClick={onReset}> */}
                        <Button htmlType="button" onClick={onFill}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default LoginModal;
