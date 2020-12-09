import './App.css';

import Web3 from 'web3';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import {
  ETH_NODE,
  SEED_NUMBER_OF_ACCOUNTS,
} from './constants';

import Navbar from './Navbar';
import ImportAccountModal from './ImportAccountModal';
import Account from './Account';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      wallet: {},
      account: {},
      accounts: [],
      
      loading: true,
      isImportingAccount: false,
    }
  }

  componentDidMount() {
    // TODO: Maybe this should go in a Web3 class?
    let web3;
    web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE));
    if (!window.ethereum) {
      window.web3 = web3;
    }

    // Load or seed wallet with accounts
    let wallet = web3.eth.accounts.wallet;
    wallet.load('!Password'); // TODO: Get password from user input
    if (wallet.length === 0) {
      wallet
        .create(SEED_NUMBER_OF_ACCOUNTS, '')
        .save('!Password')
    }

    this.setState({ wallet: wallet });

    this.getBalances(wallet)
      .then(this.mergeBalancesWithAccouts)
      .then(this.setAccounts)
      .catch(e => console.log(e))
  }

  getBalances = (wallet) => {
    let i = 0;
    const promises = [];
    while(i < wallet.length) {
      promises.push(
        window.web3.eth.getBalance(wallet[i].address)
      );
      i++
    }
    return Promise.all(promises);
  }

  getAccounts = (wallet) => {
    const accounts = [];
    if (wallet.length > 1) {
      let i = 0;
      while(i < wallet.length) {
        accounts.push({
          niceName: `Account ${i+1}`,
          ...wallet[i],
        });
        i++;
      }
    } else {
      accounts.push({
        niceName: `Account 1`,
        ...wallet[0],
      });
    }
    return accounts;
  }

  mergeBalancesWithAccouts = (balances) => {
    let accounts = this.getAccounts(this.state.wallet);
    balances.forEach((balance, idx) => {
      accounts[idx].balance =
        !balance ? 0 : window.web3.utils.fromWei(balance, 'ether');
    });
    return accounts;
  }

  setAccounts = (accounts) => {
    this.setState({
      account: accounts[0],
      accounts: accounts
    }, () => console.log(this.state));
  }
  
  onImportAccount = (privateKey) => {
    const { wallet } = this.state;
    wallet.add(privateKey)
    wallet.save('!Password')

    this.getBalances(wallet)
      .then(this.mergeBalancesWithAccouts)
      .then((accounts) => {
        this.setState({
          wallet: wallet,
          // TODO: set default account when importing an account
          account: accounts[accounts.length-1],
          accounts: accounts,
          isImportingAccount: false,
        })
      });
  }

  onShowImportAccountModal = () => {
    this.setState({ isImportingAccount: true });
  }

  onSelectAccount = (account) => {
    this.setState({
      account: this.state.accounts[account.index]
    })
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
    const {
      account,
      accounts,
      isImportingAccount,
    } = this.state;
    return (
      <>
        <Navbar
          account={account}
          accounts={accounts}
          onSelectAccount={this.onSelectAccount}
        />
        <Account account={account}>
          {this.renderImportAccount()}
        </Account>
        <ImportAccountModal
          show={isImportingAccount}
          onClose={() => this.setState({ isImportingAccount: false })}
          onConfirm={this.onImportAccount}
        /> 
      </>
    )
  }
};

export default App;
