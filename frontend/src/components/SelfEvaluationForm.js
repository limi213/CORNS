import React from 'react';
import StarRating from './StarRating';


// 등록된 경우인지 없는 경우인지 구분해서 작동해야함
function SelfEvaluationForm() {
    const onClick = (e) => {
        e.preventDefault();
        // 등록하기 fetch
    }
    
    return (
        <div>
            <h5>자기평가</h5>
            <form action="#">
                <StarRating />
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <input type="submit" onClick={onClick}/>
            </form>

        </div>
    )
}

export default SelfEvaluationForm;