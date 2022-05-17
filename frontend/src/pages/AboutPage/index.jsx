import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// import { useAuth } from '@/hooks';

import { message as antdMessage, Button, Carousel, Typography } from 'antd';
import { AboutPageStyled } from './style';

const { Title, Paragraph } = Typography;
const contentStyle = {
	height: '340px',
	color: '#fff',
	lineHeight: '340px',
	textAlign: 'center',
	background: '#364d79',
};

export default function AboutPage() {
	const history = useHistory();

	return (
		<AboutPageStyled>
			<Title level={2}>Task management</Title>

			<Paragraph>
				Task management is the process of managing a task through its life
				cycle. It involves planning, testing, tracking, and reporting. Task
				management can help either individual achieve goals, or groups of
				individuals collaborate and share knowledge for the accomplishment of
				collective goals.[1] Tasks are also differentiated by complexity, from
				low to high.[1]{' '}
			</Paragraph>
			<Paragraph>
				Effective task management requires managing all aspects of a task,
				including its status, priority, time, human and financial resources
				assignments, recurrence, dependency, notifications and so on. These can
				be lumped together broadly into the basic activities of task management.
			</Paragraph>
			<Paragraph>
				Managing multiple individuals or team tasks may be assisted by
				specialized software, for example workflow or project management
				software.
			</Paragraph>
			<Paragraph>
				Task management may form part of project management and process
				management and can serve as the foundation for efficient workflow in an
				organization. Project managers adhering to task-oriented management have
				a detailed and up-to-date project schedule, and are usually good at
				directing team members and moving the project forward.[2]
			</Paragraph>

			<Carousel autoplay>
				<div>
					<h3 style={contentStyle}>Task management</h3>
				</div>
				<div>
					<h3 style={contentStyle}>Effective task</h3>
				</div>
				<div>
					<h3 style={contentStyle}>Managing multiple individuals</h3>
				</div>
				<div>
					<h3 style={contentStyle}>Efficient workflow</h3>
				</div>
			</Carousel>

			<Title level={2}>Activities supported by tasks</Title>

			<Paragraph>
				As a discipline, task management embraces several key activities.
				Various conceptual breakdowns exist, and these, at a high-level, always
				include creative, functional, project, performance and service
				activities.
			</Paragraph>

			<Paragraph>
				<ul>
					<li>
						Creative activities pertain to task creation. In context, these
						should allow for task planning, brainstorming, creation,
						elaboration, clarification, organization, reduction, targeting and
						preliminary prioritization.
					</li>
					<li>
						Functional activities pertain to personnel, sales, quality or other
						management areas, for the ultimate purpose of ensuring production of
						final goods and services for delivery to customers. In context these
						should allow for planning, reporting, tracking, prioritizing,
						configuring, delegating, and managing of tasks.
					</li>
					<li>
						Project activities pertain to planning and time and costs reporting.
						These can encompass multiple functional activities but are always
						greater and more purposeful than the sum of its parts. In context,
						project activities should allow for project task breakdown also
						known as work breakdown structure, task allocation, inventory across
						projects, and concurrent access to task databases.
					</li>
					<li>
						Service activities pertain to client and internal company services
						provision, including customer relationship management and knowledge
						management. In context, these should allow for file attachment and
						links to tasks, document management, access rights management,
						inventory of client & employee records, orders & calls management,
						and annotating tasks.
					</li>
					<li>
						Performance activities pertain to tracking performance and
						fulfillment of assigned tasks. In context these should allow for
						tracking by time, cost control, stakeholders, and priority; charts,
						exportable reports, status updates, deadline adjustments, and
						activity logging.
					</li>
					<li>
						Report activities pertain to the presentation of information
						regarding the other five activities listed, including the graphical
						display.
					</li>
				</ul>
			</Paragraph>

			<Paragraph>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam
				modi dolorum magnam officia dolor. Similique ut id, quas dolorem
				veritatis rerum impedit nobis omnis quisquam nesciunt recusandae a
				consectetur! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Eligendi mollitia pariatur alias facere voluptatem error, vero illo
				placeat est porro quam asperiores, beatae ratione magnam? Consequatur
				beatae velit qui? Dolores?
			</Paragraph>
			<Paragraph>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam
				modi dolorum magnam officia dolor. Similique ut id, quas dolorem
				veritatis rerum impedit nobis omnis quisquam nesciunt recusandae a
				consectetur! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Eligendi mollitia pariatur alias facere voluptatem error, vero illo
				placeat est porro quam asperiores, beatae ratione magnam? Consequatur
				beatae velit qui? Dolores?
			</Paragraph>
		</AboutPageStyled>
	);
}
