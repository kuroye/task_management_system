import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store';

// import { useAuth } from '@/hooks';

import { message as antdMessage, Button } from 'antd';
import { Header, Content } from '@/components';

export default function UserProfilePage() {
	const [user, setUser] = useRecoilState(userAtom);
	const history = useHistory();

	// Has Error ↓
	// useAuth(user.token);

	return (
		<div>
			<Header />
			<Content>user profile</Content>
		</div>
	);
}
