import React from 'react';
import { Link } from 'react-router-dom'

class Main extends React.Component {
	render() {
		return (
			<div>
				<Link to="/전체">
					<h1>
						19대 대선 전체 여론조사 추이
					</h1>
				</Link>
				<Link to="/지역별">
					<h1>
						19대 대선 지역별 여론조사
					</h1>
				</Link>
			</div>
		);
	}
}
export default Main;
