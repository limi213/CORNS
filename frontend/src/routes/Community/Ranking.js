import React from 'react';
import Tabmenu from '../../components/GlobalComponents/Tabmenu';


function Ranking({location}) {
  const TabMenus = [
    { name: "성실", route: "/community/ranking/sincerity", color: '#FFD704'},
    { name: "따봉", route: "/community/ranking/thumbs", color: '#3C90F2' },
    { name: "수다", route: "/community/ranking/chat", color: '#67C73A'},
    { name: "인기", route: "/community/ranking/popularity", color: '#DDDDDD' },
  ];
  
  return (
    <>
      <Tabmenu Items={TabMenus} Location={location.pathname}/>
      
    </>
  );

}

export default Ranking;