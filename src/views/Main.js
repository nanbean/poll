import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

class Main extends React.Component {
	render () {
		return (
			<div className='main'>
				<div className='main-item'>
					<Link to='/전체'>
						<Header as='h2'>
							<Icon name='line graph' />
							<Header.Content>
								전체 추이
								<Header.Subheader>
									19대 대선 전체 여론조사 추이
								</Header.Subheader>
							</Header.Content>
						</Header>
					</Link>
				</div>
				<div className='main-item'>
					<Link to='/지역별'>
						<Header as='h2'>
							<Icon name='pie graph' />
							<Header.Content>
								지역별
								<Header.Subheader>
									19대 대선 지역별 여론조사
								</Header.Subheader>
							</Header.Content>
						</Header>
					</Link>
				</div>
				<div className='main-item'>
					<Link to='/성별'>
						<Header as='h2'>
							<Icon name='pie graph' />
							<Header.Content>
								성별
								<Header.Subheader>
									19대 대선 성별 여론조사
								</Header.Subheader>
							</Header.Content>
						</Header>
					</Link>
				</div>
				<div className='main-item'>
					<Link to='/연령별'>
						<Header as='h2'>
							<Icon name='bar graph' />
							<Header.Content>
								연령별
								<Header.Subheader>
									19대 대선 연령별 여론조사
								</Header.Subheader>
							</Header.Content>
						</Header>
					</Link>
				</div>
			</div>
		);
	}
}
export default Main;
