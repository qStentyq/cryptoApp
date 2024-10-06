import { FC, MouseEvent } from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import "../App.css";

const BuilderEx2 = () => {
    const card1: BuilderInterface = {
        title: "Notcoin",
        description:
            "Notcoin — простая в использовании игра в Telegram, которая дает пользователям возможность «добывать» криптовалюту под названием Notcoin с помощью простого механизма: им нужно несколько раз нажать на анимированную монету в чате. Любой желающий может начать играть в Notcoin бесплатно, все что нужно, это аккаунт в Telegram, а простая механика игры делает ее доступной даже для пользователей, не имеющих опыта взаимодействия с криптовалютой. ",
        image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65d1f0e218e647057add260e_65d1f10818e647057add6b1d/scale_1200",
        url: "https://notco.in/",
    };
    const card2: BuilderInterface = {
        title: "HOT project",
        description:
            "NEAR — продукт блокчейн-платформы NEAR Protocol, которая была запущена в октябре 2020 года с целью облегчить создание и использование децентрализованных приложений (dApps) в глобальном масштабе. Этот проект стремится решить проблему масштабируемости и производительности в блокчейне, чтобы ускорить принятие криптовалют. HOT — это центральный элемент экосистемы NEAR внутри Telegram. Благодаря мета-транзакциям использование HOT позволяет совершать реальные транзакции на блокчейне, играть в игры и оплачивать переводы.",
        image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65d474cce3fa4d709bdf2acf_65d4750015e35e7dc70bb816/scale_1200",
        url: "https://vc.ru/crypto/1015214-hot-ot-near-kak-nachat-maynit-podrobnaya-instrukciya",
    };
    const card3: BuilderInterface = {
        title: "Starknet",
        description:
            "Starknet — это не требующий разрешений Validity-Rollup (также известный как «ZK-Rollup»), который поддерживает общие вычисления и в настоящее время работает как сеть L2 через Ethereum. Возможная безопасность L1 Starknet обеспечивается за счет использования самой безопасной и масштабируемой системы криптографической защиты — STARK. Контракты Starknet (по большей части) написаны на языке Cairo — полном языке программирования Тьюринга, разработанном для доказательств STARK. Токен Starknet будет использоваться для оплаты транзакционных сборов, участия в протоколе Starknet и участия в управлении.",
        image: "https://miro.medium.com/v2/resize:fit:1358/1*Hr2JqtoQfU-CA-GL01haxA.jpeg",
        url: "https://www.starknet.io/en",
    };
    const card4: BuilderInterface = {
        title: "Arbuz Token",
        description:
            "Токен $ARBUZ - это новый мемкоин, криптовалюта, основанная на блокчейн-сети TON (Telegram Open Network). На данный момент курс $ARBUZ/USDT составляет приблизительно 3 доллара, и график показывает положительную динамику с момента запуска.",
        image: "https://kartinkof.club/uploads/posts/2022-05/1653678625_26-kartinkof-club-p-veselii-arbuz-kartinki-26.jpg",
        url: "https://tonarbuz.fun/",
    };

    const card1view = Builder(card1);
    const card2view = Builder(card2);
    const card3view = Builder(card3);
    const card4view = Builder(card4);

    const noHandler = (event: MouseEvent<HTMLElement>) => {
        console.log(event);
    };

    //   const card5 = Builder('Open Campus (EDU)','Open Campus – децентрализованное решение, направленное на совершенствование образовательного процесса. Планируется, что его будут использовать студенты, родители, преподаватели, а также авторы и издатели контента. Преподаватели смогут получать более справедливую плату за свою работу, а родители – эффективнее контролировать, какой образовательный контент потребляют их дети. EDU – нативный токен проекта, который будет использоваться для создания стимулов пользователям и для гарантии долгосрочного развития протокола. Редакция Profinvestment.com подготовила обзор особенностей и планов развития проекта Open Campus.',
    //   'https://profinvestment.com/wp-content/uploads/2023/04/open-campus-ecosystem.png','https://profinvestment.com/open-campus-edu/')
    //   const card5view = card5.build1()
    //   const card6 = Builder('Open Campus (EDU)','Open Campus – децентрализованное решение, направленное на совершенствование образовательного процесса. Планируется, что его будут использовать студенты, родители, преподаватели, а также авторы и издатели контента. Преподаватели смогут получать более справедливую плату за свою работу, а родители – эффективнее контролировать, какой образовательный контент потребляют их дети. EDU – нативный токен проекта, который будет использоваться для создания стимулов пользователям и для гарантии долгосрочного развития протокола. Редакция Profinvestment.com подготовила обзор особенностей и планов развития проекта Open Campus.',
    //   'https://profinvestment.com/wp-content/uploads/2023/04/open-campus-ecosystem.png','https://profinvestment.com/open-campus-edu/')
    //   const card6view = card5.build2()
    return (
        <div>
            <button onClick={noHandler}>Console log event body</button>
            {card1view}
            {card2view}
            {card3view}
            {card4view}
        </div>
    );
};
export interface BuilderInterface {
    title: string;
    description: string;
    image: string;
    url: string;
}

interface BuilderComponent {
    build1: () => JSX.Element;
}

// Функция-строитель для создания Card
const Builder: FC<BuilderInterface> = ({ title, description, image, url }) => {
    const builderComponent: BuilderComponent = {
        build1: () => {
            return (
                <>
                    <Row justify='center'>
                        <Col>
                            <Link key={title} to={url}>
                                <Card title={title} hoverable className='projects-card'>
                                    <p>
                                        <img className='projects-image' src={image} alt={title} />
                                    </p>
                                    <p className='projects-text'>{description}</p>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                    <Row>ㅤ</Row>
                </>
            );
        },
    };
    return <>{builderComponent.build1()}</>;
};

export default BuilderEx2;
