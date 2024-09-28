
import { Row, Col, Card} from 'antd';
import { Link } from 'react-router-dom';
import '../App.css'


const BuilderEx = () => {

type StringObject = {
    title: string,
    image: string,
    link: string,
    description: string
}
class Product 
{
    private _StringObj : StringObject = {
        title: '',
        image: '',
        link: '',
        description: ''
    }

    public Add(key: string, value: string):void 
    {
        if(key === 'title' || key === 'image' || key === 'link' || key === 'description')
        {
            this._StringObj[key] = value
        }
        
    }

    public Show():JSX.Element
    {
        return( <>
            <Row justify='center'>
              <Col>
                <Link key = {this._StringObj['title']} to = {this._StringObj['link']}>
                  <Card
                  title = {this._StringObj['title']}
                  hoverable
                  className='projects-card'
                  >
                    <p>
                    <img className='projects-image' src = {this._StringObj['image']} alt = {this._StringObj['title']}/>
                    </p>
                    <p className='projects-text'>
                      {this._StringObj['description']}
                    </p>
                  </Card>
                </Link>
              </Col>
            </Row>
            <Row>ㅤ</Row>
            </>)
        
    }
}

abstract class Builder 
{
    public abstract BuildPartTitle(title: string):void;
    public abstract BuildPartImage(imageLink: string): void;
    public abstract BuildPartDescription(description: string): void;
    public abstract BuildPartLink(link: string) : void;
    public abstract getResult(): Product

}
class ConcreteBuilder1 extends Builder 
{
    public BuildPartLink(value: string): void {
        this._product.Add('link', value)
    }

    public override BuildPartTitle(value: string): void {
        this._product.Add('title',value)
    }
    public override BuildPartImage(value: string) {
        this._product.Add('image', value)
    }
    public override BuildPartDescription(value: string) {
        this._product.Add('description', value)
    }
    private _product: Product = new Product()


    public getResult(): Product {
        return this._product
    }
    
}

class ConcreteBuilde2 extends Builder 
{
    public BuildPartLink(value: string): void {
        this._product.Add('link', value)
    }

    public override BuildPartTitle(value: string): void {
        this._product.Add('title',value)
    }
    public override BuildPartImage(value: string) {
        this._product.Add('image', value)
    }
    public override BuildPartDescription() {
        this._product.Add('description', '')
    }
    private _product: Product = new Product()

    public getResult(): Product {
        return this._product
    }
    
}


class Director 
{

    constructor() {

    }
    public Construct(builder : Builder, title: string, image:string, description: string, link: string):void
    {
        builder.BuildPartTitle(title)
        builder.BuildPartImage(image)
        if(builder.BuildPartDescription)
        {
            builder.BuildPartDescription(description)
        }
        builder.BuildPartLink(link)
    }
}


 let director:Director = new Director()

 let b1:Builder = new ConcreteBuilder1()
 let b2:Builder = new ConcreteBuilde2()
 let b3:Builder = new ConcreteBuilder1()

 director.Construct(b1, 'Notcoin', 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65d1f0e218e647057add260e_65d1f10818e647057add6b1d/scale_1200', 'Notcoin — простая в использовании игра в Telegram, которая дает пользователям возможность «добывать» криптовалюту под названием Notcoin с помощью простого механизма: им нужно несколько раз нажать на анимированную монету в чате. Любой желающий может начать играть в Notcoin бесплатно, все что нужно, это аккаунт в Telegram, а простая механика игры делает ее доступной даже для пользователей, не имеющих опыта взаимодействия с криптовалютой.' ,'https://notco.in/')
 let p1:Product = b1.getResult()
 director.Construct(b2, 'HOT project', 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65d474cce3fa4d709bdf2acf_65d4750015e35e7dc70bb816/scale_1200', 'NEAR — продукт блокчейн-платформы NEAR Protocol, которая была запущена в октябре 2020 года с целью облегчить создание и использование децентрализованных приложений (dApps) в глобальном масштабе. Этот проект стремится решить проблему масштабируемости и производительности в блокчейне, чтобы ускорить принятие криптовалют. HOT — это центральный элемент экосистемы NEAR внутри Telegram. Благодаря мета-транзакциям использование HOT позволяет совершать реальные транзакции на блокчейне, играть в игры и оплачивать переводы.', 'https://vc.ru/crypto/1015214-hot-ot-near-kak-nachat-maynit-podrobnaya-instrukciya');
 let p2: Product = b2.getResult();
 director.Construct(b3, 'Starknet','https://miro.medium.com/v2/resize:fit:1358/1*Hr2JqtoQfU-CA-GL01haxA.jpeg','Starknet — это не требующий разрешений Validity-Rollup (также известный как «ZK-Rollup»), который поддерживает общие вычисления и в настоящее время работает как сеть L2 через Ethereum. Возможная безопасность L1 Starknet обеспечивается за счет использования самой безопасной и масштабируемой системы криптографической защиты — STARK. Контракты Starknet (по большей части) написаны на языке Cairo — полном языке программирования Тьюринга, разработанном для доказательств STARK. Токен Starknet будет использоваться для оплаты транзакционных сборов, участия в протоколе Starknet и участия в управлении','https://www.starknet.io/en')
 let p3: Product = b3.getResult()

console.log(p1, p2)
 return(
  <>
  {p1.Show()}
  {p2.Show()}
  {p3.Show()}
  </>
 )
}

export default BuilderEx

