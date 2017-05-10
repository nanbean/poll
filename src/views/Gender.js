import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, Breadcrumb, Grid } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

class Gender extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			options: {},
			data: []
		};
	}

	componentDidMount () {
		const that = this;
		const url = '/api/gender';

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
				const newData = data.map(
					item => (
						{
							title: item.title,
							company: item.tags[3],
							date: item.updatedAt.substr(0, 10),
							rate: [
								['Total', '지지율'],
								['문재인', item.문재인],
								['안철수', item.안철수],
								['홍준표', item.홍준표],
								['유승민', item.유승민],
								['심상정', item.심상정],
								['기타', item.기타]
							]
						}
					)
				);
				that.setState({ data: newData });
			}
		);
	}

	renderPieChart (data) {
		this.title = `${data.date} ${data.company} ${data.title}`;
		this.options = {
			title: this.title,
			is3D: true,
			slices: {
				0: { color: '#085c98' },
				1: { color: '#00964c' },
				2: { color: '#ea2e2d' },
				3: { color: '#1babe8' },
				4: { color: '#ffd026' },
				5: { color: '#a1a8b3' }
			}
		};

		return (
			<Grid.Column>
				<Chart
					key={this.title}
					chartType='PieChart'
					data={data.rate}
					options={this.options}
					graph_id={`PieChart${this.title}`}
					width='100%'
					height='400px'
				/>
			</Grid.Column>
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
					<Breadcrumb.Section active>성별</Breadcrumb.Section>
				</Breadcrumb>
				<p />
				<div>
					{
						this.state.data.length === 0 && <Loader active />
					}
					<Grid>
						<Grid.Row columns={2}>
							{
								this.state.data.length >= 1 && this.state.data.map(this.renderPieChart, this)
							}
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

export default Gender;
