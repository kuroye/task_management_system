import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { reqGetTeamTask, reqGetTeamMembers } from '@/services/api/user-api';
import { useSetState, useRequest, useCreation } from 'ahooks';
import { useAuth } from '@/hooks';

import {
	message as antdMessage,
	Button,
	Avatar,
	Typography,
	Space,
	Empty,
	Row,
	Col,
	Skeleton,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddTeamMemberModal, AddTaskModal } from '@/components';
import { TeamPageStyled, DifficultyDisplay } from './style';

const { Title, Text } = Typography;

export default function TeamPage() {
	const [user, setUser] = useRecoilState(userAtom);
	const history = useHistory();

	// 授权校验
	useAuth(user.token);

	const [state, setState] = useSetState({
		team: history.location.state.team,

		members: [],
		tasks: [],

		addTeamMemberModalVisibile: false,
		addTaskModalVisibile: false,
	});

	// 当前用户是否是群主 (Team creator)
	let thisMyTeam = useCreation(
		() => user.id === state.team.creator,
		[user.id, state.team],
	);

	// 获取 Tasks
	const { loading: loadingTasks } = useRequest(
		() => reqGetTeamTask(state.team.id),
		{
			onSuccess({ task_arr, creator }) {
				setState({ tasks: task_arr.map(task => ({ ...task, creator })) });
			},
		},
	);

	// 获取 Members
	const { loading: loadingMembers } = useRequest(
		() => reqGetTeamMembers(state.team.id),
		{
			onSuccess(members) {
				setState({ members });
			},
		},
	);

	return (
		<TeamPageStyled>
			<Title level={2} className="team-name">
				{state.team.name}
			</Title>

			<section className="members">
				<div className="header">
					<Text className="title">Team members</Text>

					{thisMyTeam && (
						<>
							<Button
								onClick={() => setState({ addTeamMemberModalVisibile: true })}>
								<PlusOutlined />
							</Button>

							<AddTeamMemberModal
								visible={state.addTeamMemberModalVisibile}
								onCancel={() => setState({ addTeamMemberModalVisibile: false })}
								afterAddTeamMember={newMember =>
									setState(prevState => ({
										members: [...prevState.members, newMember],
									}))
								}
								team={state.team}
							/>
						</>
					)}
				</div>
				<Row gutter={[24, 24]}>
					<Skeleton active loading={loadingMembers}>
						{state.members.map(member => (
							<Col md={8} sm={12} xs={24} key={member.id}>
								<div className="team-member">
									<Avatar className="avatar" src={member.avatar} />
									<Text className="name">{member.username}</Text>
								</div>
							</Col>
						))}
						<Col span={24}>{state.members.length === 0 && <Empty />}</Col>
					</Skeleton>
				</Row>
			</section>

			<section className="tasks">
				<div className="header">
					<Text className="title">Tasks</Text>

					{thisMyTeam && (
						<>
							<Button onClick={() => setState({ addTaskModalVisibile: true })}>
								<PlusOutlined />
							</Button>

							<AddTaskModal
								visible={state.addTaskModalVisibile}
								onCancel={() => setState({ addTaskModalVisibile: false })}
								afterAddTask={newTask =>
									setState(prevState => ({
										tasks: [...prevState.tasks, newTask],
									}))
								}
								team={state.team}
							/>
						</>
					)}
				</div>
				<Row gutter={[24, 24]}>
					<Skeleton active loading={loadingTasks}>
						{state.tasks
							.filter(task => !task.submitted)
							.map(task => (
								<Col md={8} sm={12} xs={24} key={task.id}>
									<Text
										className="task"
										onClick={() => {
											history.push('/task', { task });
										}}>
										<Text className="title">{task.title}</Text>
										<DifficultyDisplay
											className="xp"
											difficulty={task.difficulty}>
											{task.xp}xp
										</DifficultyDisplay>
									</Text>
								</Col>
							))}
						<Col span={24}>
							{state.tasks.filter(task => !task.submitted).length === 0 && (
								<Empty />
							)}
						</Col>
					</Skeleton>
				</Row>
			</section>
		</TeamPageStyled>
	);
}
