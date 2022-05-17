import React, { memo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom, defaultUserState } from '@/store';

import { localStorage } from '@/utils';
import { useBoolean, useSafeState, useClickAway } from 'ahooks';

import { Menu, Button, Space, message as antdMessage, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { HeaderStyledBox } from './style';

import { logo } from '@/assets/img';

export default memo(function Header() {
	const history = useHistory();
	const [user, setUser] = useRecoilState(userAtom);

	const [activeHeaderMenuKey, setActiveHeaderMenuKey] = useSafeState(
		history.location.pathname,
	);

	useEffect(() => {
		let unlisten = history.listen(({ pathname }) => {
			setActiveHeaderMenuKey(pathname);
		});

		return unlisten;
	}, [history]);

	const handleHeaderMenuSelect = ({ key }) => {
		history.push(key);
	};

	return (
		<HeaderStyledBox>
			<div className="logo">
				<img src={logo} alt="Logo" />
			</div>

			<Menu
				className="header-menu"
				mode="horizontal"
				onSelect={handleHeaderMenuSelect}
				selectedKeys={[activeHeaderMenuKey]}>
				<Menu.Item key="/">Home</Menu.Item>
				<Menu.Item key="/about">About</Menu.Item>
			</Menu>

			<Space className="actions">
				{user.token ? (
					<>
						<Button
							type="primary"
							onClick={() => {
								history.push('/user');
							}}>
							Profile
						</Button>
						<Button
							type="danger"
							onClick={() => {
								antdMessage.info('Bye~');

								localStorage.set('user', defaultUserState);
								setUser(defaultUserState);
								history.push('/login');
							}}>
							Logout
						</Button>
					</>
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
});

const MobileHeader = memo(function MobileHeader() {
	const history = useHistory();
	const [user, setUser] = useRecoilState(userAtom);

	const [
		mobileHeaderVisible,
		{ toggle: toggleMobileHeaderVisible, setFalse: closeMobileHeaderVisible },
	] = useBoolean(false);

	const [activeHeaderMenuKey, setActiveHeaderMenuKey] = useSafeState(
		history.location.pathname,
	);

	useEffect(() => {
		let unlisten = history.listen(({ pathname }) => {
			setActiveHeaderMenuKey(pathname);
		});

		return unlisten;
	}, [history]);

	const handleHeaderMenuSelect = ({ key }) => {
		toggleMobileHeaderVisible();
		history.push(key);
	};

	const mobileHeaderRef = useRef();
	useClickAway(closeMobileHeaderVisible, mobileHeaderRef);

	return (
		<>
			<Button
				className="mobile-header-trigger"
				onClick={e => {
					e.stopPropagation();
					toggleMobileHeaderVisible();
				}}>
				<MenuOutlined />
			</Button>
			<div
				ref={mobileHeaderRef}
				className={`mobile-header ${
					mobileHeaderVisible ? 'mobile-header--collapse' : ''
				}`}>
				<Menu
					className="mobile-header-menu"
					mode="vertical"
					onSelect={handleHeaderMenuSelect}
					selectedKeys={[activeHeaderMenuKey]}>
					<Menu.Item key="/">Home</Menu.Item>
					<Menu.Item key="/about">About</Menu.Item>
					<Menu.Item key="divider">
						<Divider />
					</Menu.Item>
					{user.token ? (
						<>
							<Space>
								<Button
									type="primary"
									onClick={() => {
										history.push('/user');
									}}>
									Profile
								</Button>
								<Button
									type="danger"
									onClick={() => {
										antdMessage.info('Bye~');

										setUser(defaultUserState);
										history.push('/login');
									}}>
									Logout
								</Button>
							</Space>
						</>
					) : (
						<>
							<Menu.Item key="/login">Login</Menu.Item>
							<Menu.Item key="/register">Register</Menu.Item>
						</>
					)}
				</Menu>
			</div>
		</>
	);
});
