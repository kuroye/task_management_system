import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store';

import { useEventListener, useCreation, useMount } from 'ahooks';
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
			{ path: '/', component: lazy(() => import('@/pages/LandingPage')) },
			{ path: '/login', component: lazy(() => import('@/pages/LoginPage')) },
			{
				path: '/register',
				component: lazy(() => import('@/pages/RegisterPage')),
			},
			{
				path: '/user',
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
						{routes.map(({ path, component }) => (
							<Route key={path} exact path={path} component={component} />
						))}
					</Suspense>
				</Switch>
			</BrowserRouter>
		</AntdConfigProvider>
	);
}
