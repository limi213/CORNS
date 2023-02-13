package com.w6w.corns.domain.notification;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Notification {

    @Id
    private int userId;

    private int status;

    public void setStatus(int status) {
        this.status = status;
    }

    @Builder
    public Notification(int userId, int status) {
        this.userId = userId;
        this.status = status;
    }
}