package com.w6w.corns.domain.loginlog;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
@AllArgsConstructor
@Entity
public class LoginLog extends BaseTime {

    @Id
    private int loginLogSq;

    private int userId;
}
