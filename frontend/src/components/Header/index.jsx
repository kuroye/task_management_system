import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom, defaultUserState } from '@/store';

import { useBoolean } from 'ahooks';

import { Menu, Button, Space, message as antdMessage } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { HeaderStyledBox } from './style';

import { logo } from '@/assets/img';

export default function Header() {
	const history = useHistory();
	const [user, setUser] = useRecoilState(userAtom);

	return (
		<HeaderStyledBox>
			<div className="logo">
				<img src={logo} alt="Logo" />
			</div>

			<Menu
				className="header-menu"
				mode="horizontal"
				defaultSelectedKeys={['/home']}>
				<Menu.Item key="/home">Home</Menu.Item>
				<Menu.Item key="/about">About</Menu.Item>
			</Menu>

			<Space className="actions">
				{user.token ? (
					<Button
						type="danger"
						onClick={() => {
							antdMessage.info('Bye~');

							setUser(defaultUserState);
							history.push('/login');
						}}>
						Logout
					</Button>
				) : (
					<>
						<Button onClick={() => history.push('/login')}>Log in</Button>
						<Button onClick={() => history.push('/register')}>Sign up</Button>
					</>
				)}
			</Space>

			<MobileHeader />
		</HeaderStyledBox>
	);
}

function MobileHeader() {
	const [mobileHeaderVisible, { toggle: toggleMobileHeaderVisible }] =
		useBoolean(false);

	return (
		<>
			<Button
				className="mobile-header-trigger"
				onClick={toggleMobileHeaderVisible}>
				<MenuOutlined />
			</Button>
			<div
				className={`mobile-header ${
					mobileHeaderVisible ? 'mobile-header--collapse' : ''
				}`}>
				<Menu
					className="header-menu"
					mode="vertical"
					defaultSelectedKeys={['/home']}>
					<Menu.Item key="/home">Home</Menu.Item>
					<Menu.Item key="/about">About</Menu.Item>
				</Menu>

				<Space className="actions">
					<Button>Log in</Button>
					<Button>Sign up</Button>
				</Space>
			</div>
		</>
	);
}
