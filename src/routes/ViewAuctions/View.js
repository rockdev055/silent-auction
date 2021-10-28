import React from 'react';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';
import { Button, Segment, Container, Fab, Content, Card, CardItem, Text, Body, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { socket, socketApp } from '../../modules';

const auction = ({ name, current_price, timeLeft, seller, top_bidder }, i) => (
  <Card key={i}>
    <CardItem header>
      <Text>{name}</Text>
    </CardItem>
    <CardItem>
      <Text style={{ fontSize: 50 }}>${ current_price }</Text>
    </CardItem>
    <CardItem>
      <Text style={{ fontSize: 20 }}>{ timeLeft }</Text>
    </CardItem>
    <CardItem>
      <Text>Seller: { seller.username }</Text>
    </CardItem>
    <CardItem>
      <Text>Top Bidder: { top_bidder.username }</Text>
    </CardItem>
  </Card>
);

export default class ViewAuctions extends React.Component {

  componentWillMount() {
    const auctionsService = socketApp.service('auctions');
    auctionsService.on('created', a => this.props.auctionCreated(a));
    auctionsService.on('patched', a => this.props.auctionUpdated(a));
    auctionsService.on('removed', a => this.props.auctionDeleted(a));
    this.props.requestAuctions({
      query: {
        $limit: 20,
      },
    });
  }

  componentDidMount() {
    this.setInterval(
      () => this.props.updateTime(),
      1000,
    );
  }

  render() {
    const { auctions = [] } = this.props;
    return (
      <Container>
        <Segment>
          <Button
            onPress={() => this.props.changeActiveSegment('open')}
            active={this.props.segment === 'open'}
            first
          >
            <Text>Open</Text>
          </Button>
          <Button
            onPress={() => this.props.changeActiveSegment('both')}
            active={this.props.segment === 'both'}
          >
            <Text>Both</Text>
          </Button>
          <Button
            onPress={() => this.props.changeActiveSegment('complete')}
            active={this.props.segment === 'complete'}
            last
          >
            <Text>Complete</Text>
          </Button>
        </Segment>
        <Content>
          {
            this.props.segment === 'complete' && _.filter(auctions, ['timeLeft', 'complete']).map(auction)
          }
          {
            this.props.segment === 'open' && _.filter(auctions, a => a.timeLeft !== 'complete').map(auction)
          }
          {
            this.props.segment === 'both' && auctions.map(auction)
          }
        </Content>
        <Fab
          containerStyle={{ marginLeft: 10 }}
          style={{ backgroundColor: '#5067FF' }}
          onPress={() => Actions.auctionForm({})}
        >
          <Icon name="md-add" />
        </Fab>
      </Container>
    );
  }
}

reactMixin(ViewAuctions.prototype, TimerMixin);
