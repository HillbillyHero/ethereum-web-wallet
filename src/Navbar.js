import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownToggle = React.forwardRef(({
  onClick,
  children
}, ref) => (
  <span
    ref={ref}
    style={{ cursor: 'pointer' }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </span>
));

function DropdownItem({
  account,
  selected,
  onSelectAccount,
}) {
  return (
    <Dropdown.Item
      style={{ color: selected ? 'grey' : 'black' }}
      onClick={() => onSelectAccount(account)}
      disabled={selected}
    >
      {account.niceName}
    </Dropdown.Item>
  );
}

function Accounts({
  account,
  accounts,
  onSelectAccount,
}) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={DropdownToggle} id='dropdown-basic'>
        {account.niceName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {accounts.map((_account, idx) => (
          <DropdownItem
            key={idx}
            account={_account}
            selected={account.address === _account.address}
            onSelectAccount={onSelectAccount}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default function Navbar({
  account,
  accounts,
  onSelectAccount,
}) {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <span className='navbar-brand'>ETH Wallet</span>
      <span className='navbar-text float-right'>
        <Accounts
          account={account}
          accounts={accounts}
          onSelectAccount={onSelectAccount}
        />
      </span>
    </nav>
  );
}
