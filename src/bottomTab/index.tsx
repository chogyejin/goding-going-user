import React, { Component } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';

function BottomTab() {
  return (
    <Container>
      <Content />
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="home" />
          </Button>
          <Button>
            <Icon name="restaurant-outline" />
          </Button>
          <Button>
            <Icon name="reader-outline" />
          </Button>
          <Button>
            <Icon name="calendar-outline" />
          </Button>
          <Button>
            <Icon name="grid-outline" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
export default BottomTab;
