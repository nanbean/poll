import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, Breadcrumb, Icon, Header, Dropdown } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

class Regional extends React.Component {
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
		const url = '/api/age';

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
				const newData = [];
				let piece = {};
				piece.rate = [];

				for (let i = 0; i < data.length; i += 1) {
					if (!piece.company) {
						piece.company = data[i].tags[3];
						piece.date = data[i].updatedAt.substr(0, 10);
						piece.rate.push([data[i].title, data[i].문재인, data[i].안철수, data[i].홍준표, data[i].유승민, data[i].심상정, data[i].기타, '']);
					} else if (piece.company !== data[i].tags[3]) {
						piece.rate.unshift(['Age', '문재인', '안철수', '홍준표', '유승민', '심상정', '기타', { role: 'annotation' }]);
						newData.push(piece);
						piece = {};
						piece.rate = [];
						piece.company = data[i].tags[3];
						piece.date = data[i].updatedAt.substr(0, 10);
						piece.rate.push([data[i].title, data[i].문재인, data[i].안철수, data[i].홍준표, data[i].유승민, data[i].심상정, data[i].기타, '']);
					} else {
						piece.company = data[i].tags[3];
						piece.date = data[i].updatedAt.substr(0, 10);
						piece.rate.push([data[i].title, data[i].문재인, data[i].안철수, data[i].홍준표, data[i].유승민, data[i].심상정, data[i].기타, '']);
					}
				}

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
			this.title = `${data.date} ${data.company}`;
			this.options = {
				title: this.title,
				series: {
					0: { color: '#085c98' },
					1: { color: '#00964c' },
					2: { color: '#ea2e2d' },
					3: { color: '#1babe8' },
					4: { color: '#ffd026' },
					5: { color: '#a1a8b3' }
				},
				isStacked: true
			};

			return (
				<Chart
					key={this.title}
					chartType='ColumnChart'
					data={data.rate}
					options={this.options}
					graph_id={`ColumnChart+${this.title}`}
					width='100%'
					height='400px'
				/>
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
					<Breadcrumb.Section active>연령별</Breadcrumb.Section>
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
				{
					this.state.data.length === 0 && <Loader active />
				}
				{
					this.state.data.length >= 1 && this.state.data.map(this.renderPieChart, this)
				}
			</div>
		);
	}
}
export default Regional;
