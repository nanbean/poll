import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, Breadcrumb } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

class Total extends React.Component {
	constructor (props) {
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
					4: { color: '#ffd026' }
				}
			},
			data: [
				['Date', '문재인', '안철수', '홍준표', '유승민', '심상정']
			]
		};
	}

	componentDidMount () {
		const that = this;
		const url = '/api/total';
		const resultUrl = '/api/final';

		fetch(url)
		.then(
			(response) => {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			}
		)
		.then(
			(data) => {
				fetch(resultUrl)
				.then(
					(response) => {
						if (response.status >= 400) {
							throw new Error('Bad response from server');
						}
						return response.json();
					}
				)
				.then(
					(resultData) => {
						const newData = data.map(
							item => (
								[
									item.updatedAt.substr(0, 10),
									item.문재인,
									item.안철수,
									item.홍준표,
									item.유승민,
									item.심상정
								]
							)
						);

						newData.unshift([
							'2017-05-09',
							resultData[0].r1,
							resultData[0].r2,
							resultData[0].r3,
							resultData[0].r4,
							resultData[0].r5
						]);
						newData.unshift(['Date', '문재인', '안철수', '홍준표', '유승민', '심상정']);
						that.setState({ data: newData });
					}
				);
			}
		);
	}
	render () {
		return (
			<div className='main'>
				<Breadcrumb size='large'>
					<Link to='/'>
						<Breadcrumb.Section link>홈</Breadcrumb.Section>
					</Link>
					<Breadcrumb.Divider icon='right chevron' />
					<Breadcrumb.Section active>전체 추이</Breadcrumb.Section>
				</Breadcrumb>
				{
					this.state.data.length === 1 && <Loader active />
				}
				{
					this.state.data.length > 1 &&
					<Chart
						chartType='LineChart'
						data={this.state.data}
						options={this.state.options}
						graph_id='LineChart'
						width='100%'
						height='400px'
					/>
				}
			</div>
		);
	}
}
export default Total;
