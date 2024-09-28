import { useState } from "react";
import "../App.css";

const observer = () => {
    // const [sended, setSended] = useState("");
    const [inp1Value, setInp1Value] = useState("");
    const [inp2Value, setInp2Value] = useState("");
    const [message, setMessage] = useState("");

    interface Subject {
        // Присоединяет наблюдателя к издателю.
        attach(observer: Observer): void;

        // Отсоединяет наблюдателя от издателя.
        detach(observer: Observer): void;

        // Уведомляет всех наблюдателей о событии.
        notify(): void;
    }

    class NewsSubject implements Subject {
        public state!: number;
        private static observers: Observer[] = [];
        public attach(observer: Observer): void {
            const isExist = NewsSubject.observers.includes(observer);
            if (isExist) {
                return console.log("Пользователь уже подписан на новостную рассылку.");
            }

            console.log("Новый пользователь был только то подписан на новостную рассылку!");
            NewsSubject.observers.push(observer);
        }

        public detach(observer: Observer): void {
            const observerIndex = NewsSubject.observers.indexOf(observer);
            if (observerIndex === -1) {
                return console.log("Данный пользователь не подписан или его не существует.");
            }

            NewsSubject.observers.splice(observerIndex, 1);
            console.log("Пользователь был успешно отписан.");
        }

        public notify(): void {
            console.log("Подписчикам была отравлена новая рассылка новостей");
            setMessage(``);
            for (const observer of NewsSubject.observers) {
                observer.update(this);
                console.log(`${observer.name} получил рассылку `);
                setMessage((message) => `${message} + ${observer.name} получил корпоративное сообщение \n`);
            }
        }
        public someBusinessLogic(): void {
            console.log(`Логика отработала успешно (1)`);
            this.notify();
        }
    }

    class MessagesForEmployeesSubject implements Subject {
        public state!: number;
        private static observers: Observer[] = [];

        /**
         * Методы управления подпиской.
         */
        public attach(observer: Observer): void {
            const isExist = MessagesForEmployeesSubject.observers.includes(observer);
            if (isExist) {
                return console.log("Этот сотрудник уже подписан на рассылку");
            }

            console.log("Сотрудник был подписан на рассылку.");
            MessagesForEmployeesSubject.observers.push(observer);
        }

        public detach(observer: Observer): void {
            const observerIndex = MessagesForEmployeesSubject.observers.indexOf(observer);
            if (observerIndex === -1) {
                return console.log("Такой сотрудник не подписан на рассылку.");
            }

            MessagesForEmployeesSubject.observers.splice(observerIndex, 1);
            console.log("Сотрудник был удален из рассылки");
        }

        public notify(): void {
            console.log("Сотрудники получили новую рассылку с информацией");
            setMessage(``);
            for (const observer of MessagesForEmployeesSubject.observers) {
                console.log(observer, MessagesForEmployeesSubject.observers);
                observer.update(this);
                setMessage((message) => message + "  " + observer.name + " получил корпоративное сообщение!   ");
                console.log(`${observer.name} получил корпоративное сообщение `);
            }
        }

        public someBusinessLogic(): void {
            console.log(`Логика сработала (2)`);

            this.notify();
        }
    }

    interface Observer {
        name: string;
        update(subject: Subject): void;
    }

    class NewsObserver implements Observer {
        constructor(subname: string) {
            this.name = subname;
        }
        public name: string;
        public update(subject: Subject): void {
            if (subject instanceof NewsSubject) {
                console.log("ConcreteObserverA: Reacted to the event.");
            }
        }
    }

    class EmployeeMessagesObserver implements Observer {
        constructor(subname: string) {
            this.name = subname;
        }
        public name: string;
        public update(subject: Subject): void {
            if (subject instanceof MessagesForEmployeesSubject) {
                console.log("ConcreteObserverB: Reacted to the event.");
            }
        }
    }

    /**
     * Клиентский код.
     */

    const news = new NewsSubject();
    const employeeMessages = new MessagesForEmployeesSubject();

    const client1 = new NewsObserver("client1");
    const client2 = new NewsObserver("client2");
    news.attach(client1);
    news.attach(client2);

    const employee1 = new EmployeeMessagesObserver("employee1");
    employeeMessages.attach(employee1);

    const handleInput1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInp1Value(event.target.value);
    };
    const handleInput2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInp2Value(event.target.value);
    };

    const newSubscriberNews = (): void => {
        let newSub = new NewsObserver(inp1Value);
        news.attach(newSub);
    };
    const newSubscriberCorp = (): void => {
        let newSub = new EmployeeMessagesObserver(inp2Value);
        employeeMessages.attach(newSub);
    };

    const handleSubNews = (e: any) => {
        e.preventDefault();
        news.someBusinessLogic();
    };
    const handleEmpNews = (e: any) => {
        e.preventDefault();
        employeeMessages.someBusinessLogic();
    };

    return (
        <>
            <form>
                <p className='decorText'>
                    Подписка на новости:
                    <br /> Ваше имя: <input value={inp1Value} onChange={handleInput1Change}></input>
                    <br></br>
                    <button type='button' onClick={newSubscriberNews}>
                        {" "}
                        Подписаться на новости{" "}
                    </button>
                </p>
                <p className='decorText'>
                    Подписка на корпоротивную рассылку: <br></br>Ваше имя:
                    <input value={inp2Value} onChange={handleInput2Change}></input>
                    <br></br>
                    <button type='button' onClick={newSubscriberCorp}>
                        {" "}
                        Подписаться корпоративную рассылку{" "}
                    </button>
                </p>
                <p>{message}</p>
            </form>
            <br />
            <form>
                <p className='decorText'>
                    {" "}
                    <button type='button' onClick={handleSubNews}>
                        {" "}
                        Отправить новости подписчикам
                    </button>
                    <br />
                    <br />
                    <button type='button' onClick={handleEmpNews}>
                        {" "}
                        Отправить рассылку сотрудникам{" "}
                    </button>
                </p>
            </form>
        </>
    );
};

export default observer;
