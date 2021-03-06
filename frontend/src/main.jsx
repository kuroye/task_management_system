import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import 'antd/dist/antd.less';

render(
	<StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</StrictMode>,
	document.getElementById('root'),
);
