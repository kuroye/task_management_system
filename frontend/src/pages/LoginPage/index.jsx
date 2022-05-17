import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useRequest } from 'ahooks';
import { reqLogin } from '@/services/api/auth-api';
import { localStorage } from '@/utils';

import { Form, Input, Button, Card, message as antdMessage } from 'antd';
import { LoginPageStyledBox } from './style';

export default function LoginPage() {
	const setUser = useSetRecoilState(userAtom);
	const history = useHistory();

	const { runAsync: runReqLogin, loading: loadingReqLogin } = useRequest(
		data => reqLogin(data),
		{
			manual: true,
		},
	);

	const onFinish = values => {
		runReqLogin(values)
			.then(
				({
					message,
					token,
					user: {
						id,
						email,
						username,
						fullname,
						avatar,
						level,
						xp,
						created_at: createTime,
						updated_at: updateTime,
					},
				}) => {
					antdMessage.success(message);

					let userData = {
						id,
						email,
						username,
						fullname,
						avatar,

						level,
						xp,

						createTime,
						updateTime,

						token,
					};

					localStorage.set('user', userData);
					setUser(userData);
					history.push('/user');
				},
			)
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
					history.push('/login');
				}
			});
	};

	return (
		<LoginPageStyledBox>
			<Card
				className="form-wrap"
				title="Login Form"
				actions={[<Link to="/register">To Register</Link>]}>
				<Form
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					autoComplete="off">
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: 'Please input your username',
							},
							{ max: 24, message: 'Exceeds the maximum length limit of 24' },
						]}>
						<Input maxLength={24} />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
							{ max: 80, message: 'Exceeds the maximum length limit of 80' },
						]}>
						<Input.Password maxLength={80} />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Button type="primary" htmlType="submit" loading={loadingReqLogin}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</LoginPageStyledBox>
	);
}
