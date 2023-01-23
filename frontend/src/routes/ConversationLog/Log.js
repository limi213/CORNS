import React from 'react';
import LogFilter from '../../components/ConversationLog/LogFilter'
import LogHeader from '../../components/ConversationLog/LogHeader';
import LogList from '../../components/ConversationLog/LogList';

function Log() {
    // dummy data
    const logData = [
        {}
    ]
    
    return (
        <>
        <h5>쫑알로그</h5>
        <LogFilter />
        <hr />
        <LogHeader/>
        <LogList />
        
        </>
    )
}

export default Log;