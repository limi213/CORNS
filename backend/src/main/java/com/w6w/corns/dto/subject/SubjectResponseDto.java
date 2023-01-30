package com.w6w.corns.dto.subject;

import com.w6w.corns.domain.subject.Subject;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@ApiModel(value="UserRequestDto : 대화 주제 정보")
public class SubjectResponseDto {

    int subjectNo;

    String imgUrl;

    String value;

    @Builder
    public SubjectResponseDto(int subjectNo, String imgUrl, String value) {
        this.subjectNo = subjectNo;
        this.imgUrl = imgUrl;
        this.value = value;
    }

}
