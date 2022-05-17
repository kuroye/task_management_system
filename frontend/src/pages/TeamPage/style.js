import styled from 'styled-components';
import { Card, Typography } from 'antd';

const { Text } = Typography;

export const TeamPageStyled = styled(Card)`
	.team-name {
		text-align: center;
		width: 100%;
		display: block;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.members,
	.tasks {
		margin: 36px 0;

		.header {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 15px;

			margin-bottom: 15px;

			.title {
				margin-bottom: 0;
			}

			button {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.members {
		.title {
			margin-bottom: 10px;
		}

		.team-member {
			display: flex;
			align-items: center;
			gap: 12px;

			.avatar {
				flex-shrink: 0;
				width: 55px;
				height: 55px;

				cursor: pointer;
			}

			.name {
				padding: 6px 15px;
				border: 1px solid #000;

				cursor: pointer;
			}
		}
	}

	.tasks {
		.title {
			margin-bottom: 10px;
		}

		.task {
			display: flex;
			justify-content: space-between;
			align-items: center;

			padding: 6px 15px;
			border: 1px solid #000;

			cursor: pointer;

			* {
				margin: 0;
			}
		}
	}
`;

export const DifficultyDisplay = styled(Text)`
	margin: 0;

	color: ${({ difficulty }) => {
		switch (difficulty) {
			case 1:
				return 'green';
			case 2:
				return '#ff7a00';
			case 3:
			default:
				return 'red';
		}
	}};
	font-weight: bold;
`;
