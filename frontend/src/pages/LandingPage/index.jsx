import React from 'react';

import {
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
} from '@ant-design/icons';
import { Header, Content } from '@/components';
import { LandingPageStyledBox } from './style';

export default function LandingPage() {
	return (
		<LandingPageStyledBox>
			<Header />

			<Content>
				<div className="">Landing Page</div>
			</Content>
		</LandingPageStyledBox>
	);
}
