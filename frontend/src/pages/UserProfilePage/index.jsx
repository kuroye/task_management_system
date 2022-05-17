import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store';

import {
	reqGetTeams,
	reqGetLatestTask,
	reqGetXp,
} from '@/services/api/user-api';
import { useSetState, useRequest } from 'ahooks';
import { useAuth } from '@/hooks';

import {
	message as antdMessage,
	Button,
	Avatar,
	Typography,
	Progress,
	Space,
	Empty,
	Skeleton,
} from 'antd';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import { CreateTeamModal } from '@/components';
import {
	UserProfileStyled,
	TeamsStyled,
	TeamItemStyled,
	TasksStyled,
	TaskItemStyled,
} from './style';

const { Title, Text } = Typography;

export default function UserProfilePage() {
	const [user, setUser] = useRecoilState(userAtom);
	const history = useHistory();

	// 授权校验
	useAuth(user.token);

	const [state, setState] = useSetState({
		teams: [],
		tasks: [],

		createTeamModalVisible: false,
	});

	// 获取 Xp
	useRequest(reqGetXp, {
		onSuccess({ level, xp }) {
			setUser(prevState => ({
				...prevState,
				level: prevState.level,
				xp: prevState.xp,
			}));
		},
	});

	// 获取 Teams
	const { loading: loadingGetTeams } = useRequest(reqGetTeams, {
		onSuccess(teams) {
			setState({ teams });
		},
	});

	// 获取 Tasks
	const { loading: loadingGetTasks } = useRequest(reqGetLatestTask, {
		onSuccess(tasks) {
			setState({ tasks });
		},
	});

	// 创建Team 的回调
	const afterCreateTeam = team => {
		antdMessage.success('Create team successfully');

		setState(prevState => ({
			teams: [...prevState.teams, team],
			createTeamModalVisible: false,
		}));
	};

	// 处理 添加Task
	const handleAddTask = () => {
		// 没有 team
		let meTeam = state.teams.find(team => team.creator === user.id);

		if (meTeam) {
			history.push('/team', { team: meTeam });
			return;
		}

		antdMessage.warning("You don't have a team");
	};

	return (
		<UserProfileStyled>
			<section className="user-info">
				<Avatar src={user.avatar} className="avatar" />

				<Space direction="vertical" className="info">
					<Title level={3}>{user.username ?? 'Username'}</Title>
					<Text>
						Level: {user.level}
						<Progress
							percent={user.xp % (user.level ** 2 * 100)}
							status="active"
							format={percent => `${percent} / ${user.level ** 2 * 100}`}
						/>
					</Text>

					<Text>{user.fullname ?? 'Fullname'}</Text>
					<Text underline>{user.email ?? 'Email'}</Text>
				</Space>

				<Button
					className="edit-profile"
					onClick={() => history.push('/user-edit')}>
					Edit Profile
				</Button>
			</section>

			<section className="team">
				<div className="header">
					<Title level={2} className="title">
						Team
					</Title>
					<Button onClick={() => setState({ createTeamModalVisible: true })}>
						<PlusOutlined />
					</Button>
				</div>

				<Skeleton active loading={loadingGetTeams}>
					<TeamsStyled>
						{state.teams.map(team => (
							<TeamItemStyled
								key={team.id}
								onClick={() => history.push('/team', { team })}>
								<TeamOutlined className="team-icon" />
								<Text className="team-name">{team.name}</Text>
							</TeamItemStyled>
						))}
					</TeamsStyled>
					{state.teams.length === 0 && <Empty />}
				</Skeleton>

				{/* 创建 Team 模态框 */}
				<CreateTeamModal
					visible={state.createTeamModalVisible}
					onCancel={() => setState({ createTeamModalVisible: false })}
					afterCreateTeam={afterCreateTeam}
				/>
			</section>

			<section className="task">
				<div className="header">
					<Title level={2} className="title">
						Tasks
					</Title>
					<Button onClick={handleAddTask}>
						<PlusOutlined />
					</Button>
				</div>
				<Skeleton active loading={loadingGetTasks}>
					<TasksStyled>
						{state.tasks
							.filter(task => task.creator.id !== user.id && !task.submitted)
							.map(task => (
								<TaskItemStyled
									key={task.id}
									onClick={() => history.push('/task', { task: task })}>
									<Title level={3} className="task-name">
										{task.title}
									</Title>
								</TaskItemStyled>
							))}
					</TasksStyled>
					{state.tasks.filter(
						task => task.creator.id !== user.id && !task.submitted,
					).length === 0 && <Empty />}
				</Skeleton>
			</section>
		</UserProfileStyled>
	);
}
