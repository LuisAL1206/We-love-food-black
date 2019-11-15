import React from 'react';
import Navbar from './Navbar';
import Head from './Head';

function Layout({ head, subhead, children, cover }){
    return (
    <>
      <Navbar title="We Love Food"/>
      <Head title={head} subheading={subhead} cover={cover} />
        {children}
      {}
    </>
  );
}

export default Layout;