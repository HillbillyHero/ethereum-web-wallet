import './App.css';

import React, { Component } from 'react';
import Web3 from 'web3';

import {
  GANACHE,
  SEED_NUMBER_OF_ACCOUNTS,
} from './constants';

import Navbar from './Navbar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: {},
      account: {},
    }

    this.ETH_NODE = GANACHE;
  }

  componentDidMount() {
    let web3;
    if (!window.ethereum) {
      web3 = new Web3(new Web3.providers.HttpProvider(this.ETH_NODE));
    }
    let wallet = web3.eth.accounts.wallet;
    wallet.load('!Password'); // TODO: Get password from user input
    if (wallet.length === 0) {
      wallet
        .create(SEED_NUMBER_OF_ACCOUNTS, '')
        .save('!Password')
    }
    const initialState = this.setInitialState(wallet, wallet[0])
    this.setState(initialState, () => {
      console.log(this.state);
    })
  }

  setInitialState = (wallet, account) => {
    return {
      wallet: wallet,
      account: account
    }
  }

  setWalletState = (wallet) => {
    return { wallet: wallet };
  }

  onImportAccount = () => {
    // TODO: import account
  }

  renderImportAccount = () => {
    const actionText = 'Import Account';
    return (
      <button
        onClick={this.onImportAccount}
        className='btn btn-primary'
      >
        {actionText}
      </button>
    )
  }

  render() {
    const { account } = this.state;
    return (
      <>
        <Navbar
          accountAddress={account.address}
        />
        <div className='container-fluid'>
          <br />
          {this.renderImportAccount()}
        </div>
      </>
    )
  }
}

export default App;
