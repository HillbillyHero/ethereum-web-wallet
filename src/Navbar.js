import React from 'react';

export default function Navbar({ accountAddress }) {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <span className='navbar-brand'>ETH Wallet</span>
      <span className='navbar-text float-right'>
        {accountAddress}
      </span>
    </nav>
  );
}
