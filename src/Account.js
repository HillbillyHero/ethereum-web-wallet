import React from 'react';
import { Card, Container } from 'react-bootstrap';

function Account({ account, children }) {
  return (
    <Container fluid className='pt-3'>
      <Card>
        <Card.Body>
          <Card.Title>
            {account.niceName}
          </Card.Title>
          <Card.Subtitle className='mb-2' style={{ color: 'grey' }}>
            {account.address}
          </Card.Subtitle>
          <Card.Text>
            {account.balance} ETH
          </Card.Text>
          {children}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Account;
