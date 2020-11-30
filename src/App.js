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
    const wallet = web3.eth.accounts.wallet.create(
      SEED_NUMBER_OF_ACCOUNTS, ''
    );
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
    // import account
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
    return (
      <>
        <Navbar />
        <div className='container-fluid'>
          <br />
          {this.renderImportAccount()}
        </div>
      </>
    )
  }
}

export default App;
