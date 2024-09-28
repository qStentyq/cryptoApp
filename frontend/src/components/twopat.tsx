import React, { useState } from "react";
import "../App.css";

const Povedenn = () => {
    const [inpValue, setInpValue] = useState("");
    const [message, setMessage] = useState("");
    // Интерфейс стратегии уведомлений
    interface NotificationStrategy {
        sendNotification(message: string): void;
    }

    // Конкретная стратегия уведомлений по электронной почте
    class EmailNotificationStrategy implements NotificationStrategy {
        sendNotification(message: string): void {
            console.log(`Sending email notification: ${message}`);
            setMessage((oldM) => oldM + `   Sending email notification: ${message}`);
        }
    }

    // Конкретная стратегия уведомлений по SMS
    class SMSNotificationStrategy implements NotificationStrategy {
        sendNotification(message: string): void {
            console.log(`Sending SMS notification: ${message}`);
            setMessage((oldM) => oldM + `   Sending SMS notification: ${message}`);
        }
    }

    class ViberNotificationStrategy implements NotificationStrategy {
        sendNotification(message: string): void {
            console.log(`Sending Viber message: ${message}`);
        }
    }

    class WhatsupNotificationStrategy implements NotificationStrategy {
        sendNotification(message: string): void {
            console.log(`Sending Whastsup message: ${message}`);
        }
    }

    // Интерфейс наблюдателя
    interface Observer {
        update(message: string): void;
    }

    // Конкретный наблюдатель (пользователь), который хочет получать уведомления
    class User implements Observer {
        constructor(private notificationStrategy: NotificationStrategy) {}

        update(message: string): void {
            this.notificationStrategy.sendNotification(message);
        }
    }

    // Издатель уведомлений
    class NotificationPublisher {
        private observers: Observer[] = [];

        // Добавление наблюдателя
        addObserver(observer: Observer): void {
            this.observers.push(observer);
        }

        // Уведомление всех наблюдателей
        notify(message: string): void {
            this.observers.forEach((observer) => observer.update(message));
        }
    }

    // Создание экземпляра стратегии уведомлений (в данном случае, по электронной почте)
    const emailStrategy = new EmailNotificationStrategy();
    const smsStrategy = new SMSNotificationStrategy();
    const viberStrategy = new ViberNotificationStrategy();
    const whatsup = new WhatsupNotificationStrategy();

    // Создание пользователей с разными стратегиями уведомлений
    const user1 = new User(emailStrategy);
    const user2 = new User(smsStrategy);
    const user3 = new User(viberStrategy);
    const user4 = new User(viberStrategy);
    const user5 = new User(emailStrategy);
    const user6 = new User(whatsup);

    // Создание издателя уведомлений
    const notificationPublisher = new NotificationPublisher();

    // Добавление пользователей в список наблюдателей издателя
    notificationPublisher.addObserver(user1);
    notificationPublisher.addObserver(user5);
    notificationPublisher.addObserver(user2);
    notificationPublisher.addObserver(user3);
    notificationPublisher.addObserver(user4);
    notificationPublisher.addObserver(user6);
    // Отправка уведомления всем пользователям
    // notificationPublisher.notify("Today we will have a meeting at 6PM! Link - https://google.com");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInpValue(event.target.value);
        event.preventDefault();
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        notificationPublisher.notify(inpValue);
    };

    return (
        <>
            <form className='decorText'>
                <label>Enter new message for all subscribers:</label> <input type='text' onChange={handleInputChange} />
                <br></br>
                <button onClick={handleSubmit}>Send message</button>
            </form>
            {message}
        </>
    );
};

export default Povedenn;
