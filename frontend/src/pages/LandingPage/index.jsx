import React from 'react';

import { Typography, Space } from 'antd';
import { LandingPageStyledBox } from './style';

const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
	return (
		<LandingPageStyledBox>
			<Space direction="vertical" size="large">
				<Title className="title">
					Welcome to EDA assignment management system!
				</Title>

				<Typography>
					<Title level={2}>Introduction</Title>
					<Paragraph>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
						nulla maiores laboriosam veniam, voluptate est ab praesentium
						tenetur consequatur consectetur nisi dolor suscipit quisquam
						voluptatem eligendi corporis. Nobis, corporis cupiditate.
					</Paragraph>
					<Paragraph>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
						temporibus, adipisci neque at, natus tempore, sequi fugiat est
						laboriosam quasi incidunt animi. Sint minus eos sapiente enim
						recusandae a delectus.{' '}
						<Text strong>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
							commodi ipsa! Assumenda nobis quia accusantium dicta, consequatur
							est esse enim nulla accusamus dolorum! Odit at, eligendi dolor
							deleniti suscipit laudantium?
						</Text>
					</Paragraph>

					<Title level={2}>Guidelines and Description</Title>
					<Paragraph>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
						possimus odit animi repellat cupiditate (
						<Text code>Laravel.php</Text> and <Text code>React.js</Text>)
						praesentium recusandae magni facere repudiandae eaque culpa laborum
						delectus, similique ducimus. Ea explicabo suscipit ab natus.
					</Paragraph>

					<Paragraph>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
						eaque, sequi, assumenda, adipisci repudiandae cupiditate atque
						inventore dignissimos nam ea unde veritatis dicta eum accusamus!
						Dolores tenetur vitae sequi mollitia.
					</Paragraph>
				</Typography>
			</Space>
		</LandingPageStyledBox>
	);
}
