import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store';

import { useEventListener, useCreation } from 'ahooks';
import { localStorage } from '@/utils';

import { ConfigProvider as AntdConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { CommonLoading } from '@/components';

export default function App() {
	const user = useRecoilValue(userAtom);

	// Refresh the page to save the data in Recoil to LocalStorage
	useEventListener('beforeunload', () => {
		localStorage.set('user', user);
	});

	const routes = useCreation(
		() => [
			{
				key: '/',
				path: '/',
				exact: true,
				component: lazy(() => import('@/pages/LandingPage')),
			},
			{
				key: '/login',
				path: '/login',
				exact: true,
				component: lazy(() => import('@/pages/LoginPage')),
			},
			{
				key: '/register',
				path: '/register',
				exact: true,
				component: lazy(() => import('@/pages/RegisterPage')),
			},
			{
				key: '/user',
				path: '/user',
				exact: true,
				component: lazy(() => import('@/pages/UserProfilePage')),
			},
		],
		[],
	);

	return (
		<AntdConfigProvider locale={enUS}>
			<BrowserRouter>
				<Switch>
					<Suspense fallback={<CommonLoading />}>
						{routes.map(routeConfig => (
							<Route {...routeConfig} />
						))}
					</Suspense>
				</Switch>
			</BrowserRouter>
		</AntdConfigProvider>
	);
}
