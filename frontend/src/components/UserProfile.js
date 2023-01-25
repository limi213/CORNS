import React from 'react';
import UserProfileInfo from './UserProfileInfo';
import UserProfileRankingCard from './UserProfileRankingCard';

function UserProfile({user}) {
    const {basicInfo, rankingList} = user
    
    return (
        <>
            <UserProfileInfo basicInfo={basicInfo} />
            {rankingList.map((item, index) => {
                return <UserProfileRankingCard ranking={item} key={index}/>
            })}
        </>
    )
}

export default UserProfile;