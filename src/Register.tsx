import {login, registerCaptcha} from "./interfaces";
import {Button, Form, Input, message, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import './register.css'

export interface RegisterUser {
    username: string;
    nickName: string;
    password: string;
    confirmPassword: string;
    email: string;
    captcha: string;
}

const layout1 = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
}

const layout2 = {
    labelCol: {span: 0},
    wrapperCol: {span: 24}
}

export function Register() {
    const [form] = useForm();
    const navigate = useNavigate();
    const onFinish = async (values: RegisterUser) => {
        const res = await login(values.username, values.password);
        const {code, message: msg, data} = res.data;

        if (res.status === 200 || res.status === 201) {
            message.success("登录成功");
            console.log(res.data);
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            localStorage.setItem('user_info', JSON.stringify(data.userInfo));

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            message.error(data || '系统繁忙，请稍后再试');
        }
    }

    async function sendCaptcha() {
        const address = form.getFieldValue('email');

        const res = await registerCaptcha(address);
        console.log(res);
    }

    return <div id="register-container">
        <h1>会议室预定系统</h1>
        <Form form={form} {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
            <Form.Item label="用户名" name="username" rules={[{required: true, message: '请输入用户名 !'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="昵称" name="nickName" rules={[{required: true, message: '请输入昵称!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{required: true, message: '请输入密码!'}]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item label="确认密码" name="confirmPassword" rules={[{required: true, message: '请确认密码!'}]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[{required: true, message: '请输入邮箱!'}, {
                type: "email",
                message: '请输入合法邮箱地址!'
            }]}>
                <Input/>
            </Form.Item>
            <div className="captcha-wrapper">
                <Space direction="horizontal" align="baseline">
                    <Form.Item label="验证码" name="captcha" rules={[{required: true, message: '请输入验证码!'}]}>
                        <Input/>
                    </Form.Item>
                    <Button type="primary" onClick={sendCaptcha}>发送验证码</Button>
                </Space>
            </div>
            <Form.Item {...layout2}>
                <div className="links">
                    已有账号?去<a href="">登录</a>
                </div>
            </Form.Item>

            <Form.Item {...layout1} label=" ">
                <Button className="btn" type="primary" htmlType="submit">注册</Button>
            </Form.Item>
        </Form>
    </div>
}