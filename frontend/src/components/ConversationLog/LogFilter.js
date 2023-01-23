import React from 'react';


function LogFilter() {
    return (
        <>           
            <div>
                <span>주제</span>
                <span>
                    <button>일상</button>
                    <button>비즈니스</button>
                    <button>오픽</button>
                    <button>토스</button>
                    <button>자유</button>
                </span>
            </div>
            
            <div>
                <span>시간</span>
                <label htmlFor="min-time">최소시간(분)</label>
                <input type="text" id="min-time" placeholder="5"/>
                <label htmlFor="max-time">최대시간(분)</label>
                <input type="text" id="max-time" placeholder="30"/>
            </div>
            
            <div>
                <span>날짜</span>
                <input type="date" /> ~ <input type="date" />
            </div>
            
            <div>
                <span>자기평가</span>
                <span>
                    <input type="checkbox" id="score1"/>
                    <label htmlFor="score1">1</label>
                    <input type="checkbox" id="score2"/>
                    <label htmlFor="score2">2</label>
                    <input type="checkbox" id="score3"/>
                    <label htmlFor="score3">3</label>
                    <input type="checkbox" id="score4"/>
                    <label htmlFor="score4">4</label>
                    <input type="checkbox" id="score5"/>
                    <label htmlFor="score5">5</label>
                </span>
            </div>
            
            <div>
                <span>따봉뱃지</span>
                <span>
                    <input type="checkbox" id="thums-yes"/>
                    <label htmlFor="thums-yes">있음</label>
                    <input type="checkbox" id="thums-no"/>
                    <label htmlFor="thums-no">없음</label>
                </span>
            </div>

            <button>전체해제</button>
        </>
    )
}


export default LogFilter;