import { apiServerInstance } from '../ajax';

// Get xp
export const reqGetXp = () => apiServerInstance.get('/user2');

// Edit Profile
export const reqEditProfile = data =>
	apiServerInstance.put('/user_update/', data);

// Upload Avatar
export const reqUploadAvatar = avatar =>
	apiServerInstance.post('/upload_avatar', avatar, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

// Get Teams
export const reqGetTeams = () => apiServerInstance.get('/enrolled_groups/');

// Create Team
export const reqCreateTeam = data => apiServerInstance.post('/groups/', data);

// Get Latest Task
export const reqGetLatestTask = () =>
	apiServerInstance.get('/all_task_user/?limit=4');

// Get Team Task (跟自己有关的)
export const reqGetTeamTask = teamId =>
	apiServerInstance.get(`/group_task_user/?group_id=${teamId}`);

// Get Team members
export const reqGetTeamMembers = teamId =>
	apiServerInstance.get(`/exist_users/?group_id=${teamId}`);

// Get All users
export const reqGetAllUsers = () => apiServerInstance.get('/all_users/');

// Add Team Member
export const reqAddTeamMember = data =>
	apiServerInstance.post('/add_member/', data);

// Add Task
export const reqAddTask = data => apiServerInstance.post('/add_task/', data);

// Add TaskSubmission
export const reqAddTaskSubmission = data =>
	apiServerInstance.post('/upload_file/', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

// Get All Submission
export const reqGetAllSubmission = taskId =>
	apiServerInstance.get(`/get_submissions/?task_id=${taskId}`);

// Mark done submission
export const reqMarkDoneSubmission = data =>
	apiServerInstance.post('/mark_done/', data);
