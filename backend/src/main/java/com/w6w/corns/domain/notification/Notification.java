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

    @Column(name = "notification_yn")
    private char notificationYN;

    public void setNotificationYN(char notificationYN) {
        this.notificationYN = notificationYN;
    }

    @Builder
    public Notification(int userId, char notificationYN) {
        this.userId = userId;
        this.notificationYN = notificationYN;
    }
}