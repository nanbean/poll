import { Chart } from 'react-google-charts';
import React from 'react';

class Total extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				title: '19대 대선 전체 여론조사 추이',
				curveType: 'function',
				legend: { position: 'top' },
				series: {
					0: { color: '#085c98' },
					1: { color: '#00964c' },
					2: { color: '#ea2e2d' },
					3: { color: '#1babe8' },
					4: { color: '#ffd026' },
				}
			},
			data: [
				['Date', '문재인', '안철수', '홍준표', '유승민', '심상정']
			]
		};
	}
	componentDidMount() {
		let that = this;
		let url = '/api/total'

		fetch(url)
		.then(function(response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			let newData = data.map( item => {
				return [
					item.updatedAt.substr(0, 10),
					item.문재인,
					item.안철수,
					item.홍준표,
					item.유승민,
					item.심상정,
				];
			});

			newData.unshift(['Date', '문재인', '안철수', '홍준표', '유승민', '심상정'])
			that.setState({ data: newData });
		});
	}
	render() {
		return (
			<Chart
				chartType="LineChart"
				data={this.state.data}
				options={this.state.options}
				graph_id="LineChart"
				width="100%"
				height="400px"
			/>
		);
	}
}
export default Total;
