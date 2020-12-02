import './App.css';

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Web3 from 'web3';

import {
  GANACHE,
  SEED_NUMBER_OF_ACCOUNTS,
} from './constants';

import Navbar from './Navbar';
import ImportAccountModal from './ImportAccountModal';

class App extends Component {
  constructor(props) {
    super(props);
    
    // TODO: Maybe this should go in a Web3 class?
    let web3;
    web3 = new Web3(new Web3.providers.HttpProvider(this.ETH_NODE));
    if (!window.ethereum)
      window.ethereum = web3;

    let wallet = web3.eth.accounts.wallet;
    wallet.load('!Password'); // TODO: Get password from user input
    if (wallet.length === 0) {
      wallet
        .create(SEED_NUMBER_OF_ACCOUNTS, '')
        .save('!Password')
    }

    this.state = {
      isImportingAccount: false,
      ...this.setWalletState(wallet),
    }
    this.ETH_NODE = GANACHE;
  }

  setWalletState = (wallet) => {
    const accounts = [];
    if (wallet.length > 1) {
      let i = 0;
      while(i < wallet.length) {
        accounts.push(wallet[i])
        i++;
      }
    } else {
      accounts.push(wallet[0]);
    }
    return {
      wallet: wallet,
      accounts: accounts,
    }
  }
  
  onImportAccount = (privateKey) => {
    const { wallet } = this.state;
    wallet.add(privateKey)
    wallet.save('!Password')
    this.setState({
      isImportingAccount: false,
      ...this.setWalletState(wallet),
    }, () => {
      console.log(this.state);
    })
  }

  onShowImportAccountModal = () => {
    this.setState({ isImportingAccount: true });
  }

  renderImportAccount = () => {
    const actionText = 'Import Account';
    return (
      <Button
        variant='primary'
        onClick={this.onShowImportAccountModal}
      >
        {actionText}
      </Button>
    )
  }

  render() {
    const { accounts, isImportingAccount } = this.state;
    return (
      <>
        <Navbar
          accountAddress={accounts[0].address}
        />
        <div className='container-fluid'>
          <br />
          {this.renderImportAccount()}
        </div>
        <ImportAccountModal
          show={isImportingAccount}
          onClose={() => this.setState({ isImportingAccount: false })}
          onConfirm={this.onImportAccount}
        />
      </>
    )
  }
}

export default App;
