import React from 'react';
import Layout from '../common/Layout';
import Feed from '../common/Feed';

function Home() {
    return(
        <>
        < Layout head = "We Love Food!"
        subhead = "Cumpliendo antojos desde el 2019" />
        <Feed/>
        </>
    );
}

export default Home;