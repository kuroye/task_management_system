import React from 'react';
import { useHistory } from 'react-router-dom';

import { useSetState, useRequest } from 'ahooks';
import { reqCreateTeam } from '@/services/api/user-api';

import { Modal, Form, Input, message as antdMessage, Button } from 'antd';

export default function CreateTeamModal({
	visible,
	onCancel,
	afterCreateTeam,
}) {
	const history = useHistory();
	// 添加Team 的请求
	const { runAsync, loading } = useRequest(data => reqCreateTeam(data), {
		manual: true,
	});

	// 处理表单
	const handleSubmit = values => {
		runAsync(values)
			.then(team => {
				afterCreateTeam(team);
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
					history.push('/login');
				}
			});
	};

	return (
		<Modal
			visible={visible}
			onCancel={onCancel}
			title="Create Team"
			footer={null}>
			<Form onFinish={handleSubmit} autoComplete="off" layout="vertical">
				<Form.Item
					label="Team name"
					name="name"
					rules={[
						{ required: true, message: 'Please input team name!' },
						{ min: 4, message: 'Exceeds the minimum length limit of 4' },
						{ max: 40, message: 'Exceeds the maximum length limit of 40' },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{ required: true, message: 'Please input team description' },
						{ max: 200, message: 'Exceeds the maximum length limit of 200' },
					]}>
					<Input.TextArea
						maxLength={200}
						showCount
						placeholder="Description for team..."
					/>
				</Form.Item>

				<Button
					type="primary"
					htmlType="submit"
					block
					loading={loading}
					style={{ marginTop: 24 }}>
					Create
				</Button>
			</Form>
		</Modal>
	);
}
