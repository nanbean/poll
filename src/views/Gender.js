import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader, Breadcrumb, Grid, Icon, Header, Dropdown } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

class Gender extends React.Component {
	constructor (props) {
		super(props);

		this.onDropDonwChange = this.onDropDonwChange.bind(this);

		this.state = {
			options: {},
			data: [],
			date: 'Total'
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

				const keys = data.map(
					item => (
						item.updatedAt.substr(0, 10)
					)
				);

				const newOptions = [...new Set(keys)].map(
					item => (
						{
							key: item,
							text: item,
							value: item,
							content: item
						}
					)
				);

				newOptions.unshift(
					{
						key: 'Total',
						text: 'Total',
						value: 'Total',
						content: 'Total'
					}
				);

				that.setState({
					data: newData,
					options: newOptions
				});
			}
		);
	}

	onDropDonwChange (ev, data) {
		this.setState({
			date: data.value
		});
	}

	renderPieChart (data) {
		if (data && (this.state.date === 'Total' || this.state.date === data.date)) {
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
		return null;
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
				{
					this.state.data.length >= 1 &&
					<Header as='h4'>
						<Icon name='trophy' />
						<Header.Content>
							Trending repos
							{' '}
							<Dropdown
								inline header='Adjust time span'
								options={this.state.options}
								defaultValue={this.state.options[0].value}
								onChange={this.onDropDonwChange}
							/>
						</Header.Content>
					</Header>
				}
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

export default withRouter(connect()(Gender));
