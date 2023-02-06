package com.w6w.corns.domain.word;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Word extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wordSq;

    private int userId;

    private String wordEng;

    private String wordKor;

    private int wordCd;

    @Builder
    public Word(int userId, String wordEng, String wordKor) {
        this.userId = userId;
        this.wordEng = wordEng;
        this.wordKor = wordKor;
    }

    public void setWordEng(String wordEng) { this.wordEng = wordEng; }

    public void setWordKor(String wordKor) { this.wordKor = wordKor; }

    public void setWordCd(int wordCd) { this.wordCd = wordCd; }

}
