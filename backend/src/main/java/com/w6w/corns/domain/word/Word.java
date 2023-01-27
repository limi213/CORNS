package com.w6w.corns.domain.word;

import com.w6w.corns.util.BaseTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Word extends BaseTime {

    @Id
    private int wordSq;

    private int userId;

    private String wordEng;

    private String wordKor;

    private int wordCd;

}
