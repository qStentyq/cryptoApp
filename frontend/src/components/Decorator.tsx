import React from "react";
import { useState, useEffect } from "react";

const Notifier = () => {
    const [newsTypess, setNewsType] = useState<string[]>(['default'])
    const [isClicked, setIsClicked] = useState(false);
    const [clientResult, setClientResult] = useState('');

    const [defCheck, setDefCheck] = useState(true)
    const [bitcoinCheck, setBitcoinCheck] = useState(false)
    const [TONCheck, setTONCheck] = useState(false)
    const [SolanaCheck, setSolanaCheck] = useState(false)

    interface Notifier {
        sendNews(): string
    }

    class NewsNotifier implements Notifier
    {
        public sendNews(): string {
            return 'Sended general crypto news'
        }
    }

    class Decorator implements Notifier
    {
        protected component: Notifier;

        constructor(component: Notifier)
        {
            this.component = component
        }

        public sendNews(): string {
            return this.component.sendNews()
        }

    }

    class BitcoinNews extends Decorator {

        public sendNews(): string {
            return `Sended Bitcoin news and ${super.sendNews()}`;
        }
    }

    class TONNews extends Decorator {
        public sendNews(): string {
            return `Sended TON News and ${super.sendNews()}`
        }
    }

    class SolanaNews extends Decorator {
        public sendNews(): string {
            return `Sended Solana News and ${super.sendNews()}`
        }
    }

    function clientCode(component: Notifier)
    {
        setClientResult(component.sendNews())
        console.log(`RESULT: ${component.sendNews()}`);
    }

   

   

    const sendNewsBtn = (event : React.MouseEvent<HTMLButtonElement>) => {
        let simple = new NewsNotifier()
        console.log('Client: I\ve got a simple news email:')
        console.log('Selected news types:', newsTypess);
        setIsClicked(true)
        if(newsTypess.includes('bitcoin'))
        {
            simple = new BitcoinNews(simple)
        }
        if(newsTypess.includes('ton'))
        {
            simple = new TONNews(simple)
        }
        if(newsTypess.includes('solana'))
        {
            simple = new SolanaNews(simple)
        }

        clientCode(simple)
        setBitcoinCheck(false)
        setTONCheck(false)
        setSolanaCheck(false)

    }
    const changeNewsTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === 'default')
        {
            setDefCheck(event.target.checked)
        }
        if(event.target.name === 'bitcoin')
        {
            setBitcoinCheck(event.target.checked)
        }
        if(event.target.name === 'ton')
        {
            console.log(TONCheck)
            console.log(event.target.checked)
            setTONCheck(event.target.checked)
            console.log(TONCheck)
        }
        if(event.target.name === 'solana')
        {
            setSolanaCheck(event.target.checked)
        }
        if(event.target.checked && event.target.name)
        {
            setNewsType(prevTypes => [...prevTypes, event.target.name])
        }
        if(!event.target.checked)
        {
            setNewsType(prevTypes => prevTypes.filter(type => type !== event.target.name));
        }
        console.log(event, event.target.value,newsTypess)
    }
    return(
        <form>
        <p className="decorText">
        Выберите тип новостей, которые хотите получить: <br/><br></br>
        <label>
        Default news: <input type="checkbox" name="default" defaultChecked = {defCheck} readOnly={true} />
        </label> <br/>
        <label>
        Bitcoin news: <input type="checkbox" name="bitcoin" onChange={
                                                            changeNewsTypes}
                                                            defaultChecked = {bitcoinCheck}/>
        </label><br/>
        <label>
        TON news: <input type="checkbox" name="ton" onChange={changeNewsTypes} defaultChecked = {TONCheck}/>
        </label><br/>
        <label>
        Solana news: <input type="checkbox" name="solana" onChange={changeNewsTypes} defaultChecked = {SolanaCheck}/>
        </label><br/>
        <button type="button" onClick={sendNewsBtn}> Отправить рассылку новостей </button>
        <br/><br/><br/>
        {isClicked && clientResult}
        </p>
        
        </form>
        
    )
}

export default Notifier