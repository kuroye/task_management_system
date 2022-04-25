import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useRequest } from 'ahooks';
import { reqRegister } from '@/services/api/auth-api';

import { Form, Input, Button, Card, message as antdMessage } from 'antd';
import { RegisterPageStyledBox } from './style';

export default function RegisterPage() {
	const setUser = useSetRecoilState(userAtom);
	const history = useHistory();

	const { runAsync: runReqRegister, loading: loadingReqRegister } = useRequest(
		data => reqRegister(data),
		{
			manual: true,
		},
	);

	const onFinish = values => {
		runReqRegister(values)
			.then(
				({
					token,
					user: {
						id,
						email,
						username,
						fullname,
						level,
						xp,
						created_at: createTime,
						updated_at: updateTime,
					},
				}) => {
					antdMessage.success('resgister successful');

					setUser({
						id,
						email,
						username,
						fullname,

						level,
						xp,

						createTime,
						updateTime,

						token,
					});
					history.push('/user');
				},
			)
			.catch(({ message }) => {
				antdMessage.error(message);
			});
	};

	return (
		<RegisterPageStyledBox>
			<Card
				className="form-wrap"
				title="Register Form"
				actions={[<Link to="/login">To Login</Link>]}>
				<Form
					labelCol={{
						span: 10,
					}}
					wrapperCol={{
						span: 14,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					autoComplete="off">
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email',
							},
							{ max: 60, message: 'Exceeds the maximum length limit of 60' },
							{
								type: 'email',
								message: 'Incorrect email format',
							},
						]}>
						<Input type="email" maxLength={60} />
					</Form.Item>

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
							{ min: 6, message: 'Exceeds the minimum length limit of 6' },
						]}>
						<Input.Password maxLength={80} />
					</Form.Item>
					<Form.Item
						label="Confirm Password"
						name="password_confirmation"
						rules={[
							{
								required: true,
								message: 'Please input your password again!',
							},
							{ max: 80, message: 'Exceeds the maximum length limit of 80' },
							{ min: 6, message: 'Exceeds the minimum length limit of 6' },

							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}

									return Promise.reject(
										new Error(
											'The two passwords that you entered do not match!',
										),
									);
								},
							}),
						]}
						dependencies={['password']}>
						<Input.Password maxLength={80} />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Button
							type="primary"
							htmlType="submit"
							loading={loadingReqRegister}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</RegisterPageStyledBox>
	);
}
