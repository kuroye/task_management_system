import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useRequest } from 'ahooks';
import { reqAddTask } from '@/services/api/user-api';

import {
	Modal,
	Form,
	Input,
	Radio,
	Space,
	message as antdMessage,
	Button,
} from 'antd';

export default function AddTaskModal({
	visible,
	onCancel,
	afterAddTask,
	team,
}) {
	const history = useHistory();
	const [user, setUser] = useRecoilState(userAtom);

	// 添加Task 的请求
	const { runAsync, loading: loadingAddTask } = useRequest(
		data => reqAddTask(data),
		{
			manual: true,
		},
	);

	// 处理表单
	const handleSubmit = values => {
		values.group_id = team.id;

		runAsync(values)
			.then(({ task }) => {
				antdMessage.success('Added successfully');
				onCancel();
				afterAddTask(task);
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
		<Modal visible={visible} onCancel={onCancel} title="Add task" footer={null}>
			<Form
				onFinish={handleSubmit}
				autoComplete="off"
				layout="vertical"
				initialValues={{ difficulty: 2 }}>
				<Form.Item
					label="Task title"
					name="title"
					rules={[
						{ required: true, message: 'Please input task title!' },
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
						placeholder="Description for task..."
					/>
				</Form.Item>

				<Form.Item
					label="Difficulty"
					name="difficulty"
					rules={[{ required: true, message: 'Please pick a difficulty' }]}>
					<Radio.Group>
						<Space>
							<Radio.Button value={1}>Easy</Radio.Button>
							<Radio.Button value={2}>Medium</Radio.Button>
							<Radio.Button value={3}>Hard</Radio.Button>
						</Space>
					</Radio.Group>
				</Form.Item>

				<Button
					type="primary"
					htmlType="submit"
					block
					loading={loadingAddTask}
					style={{ marginTop: 24 }}>
					Add
				</Button>
			</Form>
		</Modal>
	);
}
