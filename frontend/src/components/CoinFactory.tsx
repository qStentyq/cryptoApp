import React, {useState} from "react"
import icon from '../images/uwon.png'
import icon2 from '../images/eth.png'
import iconBLANK from '../images/blank.png'


const CoinFactory = () => {


const [inputNameValue, setInputNameValue] = useState('');
const [inputBgValue, setInputBgValue] = useState('');
const [selectFactoryValue, setSelectFactoryValue] = useState('');
const [selectBuilderValue, setSelectBuilderValue] = useState('');
const [memeCoin, setMemeCoin] = useState<any>(null)
const [normalCoin, setNormalCoin] = useState<any>(null)
const [formError, setFormError] = useState<boolean>(false)



interface CoinFactory { //Abstract Factory
    createAdvancedCoin(name: string, bg: string): Coin;
    createBasicCoin(name: string) : Coin;
}

class NormalCoinFactory implements CoinFactory { //Concrete Factory
    createBasicCoin(name: string): Coin {
        const builder = new BasicCoinBuilder();
        //Director + Product
        return builder.setName(name)
        .setImage(icon2)
        .build();
    }
    public createAdvancedCoin(name: string, bg: string): Coin {
        const builder = new AdvancedCoinBuilder();
        //Director
        return builder.setName(name)
        .setImage(icon2)
        .setBackground(bg)
        .build();
    }
}

class MemeCoinFactory implements CoinFactory { //Concrete Factory

    createBasicCoin(name: string): Coin {
        const builder = new BasicCoinBuilder();
        //Director
        return builder.setName(name)
        .setImage(icon)
        .build();
    }

    public createAdvancedCoin(name: string, bg: string): Coin {
        const builder = new AdvancedCoinBuilder();
        //Director
        return builder.setName(name)
                      .setImage(icon)
                      .setBackground(bg)
                      .build();
    }
}

class BasicCoinBuilder { //Concrete Builder
    private coin: Coin;

    constructor() {
        this.coin = new Coin();
    }

    setName(name: string): BasicCoinBuilder {
        this.coin.setName(name);
        return this;
    }

    setImage(size: string): BasicCoinBuilder {
        this.coin.setImage(size);
        return this;
    }


    build(): Coin {
        return this.coin;
    }
}

class AdvancedCoinBuilder { //Concrete Builder
    private coin: Coin;

    constructor() {
        this.coin = new Coin();
    }

    setName(name: string): AdvancedCoinBuilder {
        this.coin.setName(name);
        return this;
    }

    setImage(size: string): AdvancedCoinBuilder {
        this.coin.setImage(size);
        return this;
    }

    setBackground(background: string): AdvancedCoinBuilder {
        this.coin.setBackground(background);
        return this;
    }

    build(): Coin {
        return this.coin;
    }
}

class Coin {  //Builder
    private name: string | undefined;
    private image: string;
    private background: string | undefined;

    constructor() {
        this.image = iconBLANK
        this.name = ''
        this.background = ''
    }

    setName(name: string): void {
        this.name = name;
    }

    setImage(image: string): void {
        this.image = image;
    }

    setBackground(background: string): void {
        this.background = background;
    }

    describe(): void {
        console.log("Coin name: " + this.name);
        console.log("Image URL: " + this.image);
        console.log("Background Type: " + this.background);
    }
}

//Client
const memeCoinFactory = new MemeCoinFactory();
const normalCoinFactory = new NormalCoinFactory();



const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value);
};
const handleBgInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputBgValue(event.target.value);
};

const handleSelectFactoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFactoryValue(event.target.value);
};
const handleSelectBuilderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectBuilderValue(event.target.value);
};
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    
    if (inputNameValue && selectFactoryValue && selectBuilderValue) {
        setMemeCoin('')
        setNormalCoin('')
        setFormError(false)
        if (selectFactoryValue === 'Meme Coin')  {
            if(selectBuilderValue == 'Advanced Coin')
            {
                if(!inputBgValue) {setFormError(true);}
                setMemeCoin(memeCoinFactory.createAdvancedCoin(inputNameValue, inputBgValue))
            }
            else {
                setMemeCoin(memeCoinFactory.createBasicCoin(inputNameValue))
            }
        } else if (selectFactoryValue === 'Normal Coin') {
            if(selectBuilderValue == 'Advanced Coin')
            {
                if(!inputBgValue) {setFormError(true);}
                setNormalCoin(normalCoinFactory.createAdvancedCoin(inputNameValue, inputBgValue));
            }
            else {
                setNormalCoin(normalCoinFactory.createBasicCoin(inputNameValue))
            }    
           
        }
    }
}


    return(
        <>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="inputField">Введите имя коина:</label>
                <input 
                    type="text" 
                    id="nameInput" 
                    value={inputNameValue} 
                    onChange={handleNameInputChange} 
                />
            </div>
            <div>
                <label htmlFor="inputField">Введите ссылку на background-картинку:</label>
                <input 
                    type="text" 
                    id="bgInput" 
                    value={inputBgValue} 
                    onChange={handleBgInputChange} 
                />
            </div>
            {formError && <div style={{color: 'red'}}>Введите ссылку на background</div>}
            <div>
                <label htmlFor="selectBox">Select:</label>
                <select 
                    id="selectBox" 
                    value={selectFactoryValue} 
                    onChange={handleSelectFactoryChange}
                >
                    <option value="">Выберите лого коина</option>
                    <option value="Meme Coin">Meme Coin</option>
                    <option value="Normal Coin">Normal Coin</option>
                </select>
            </div>
            <div>
                <label htmlFor="selectBox">Select:</label>
                <select 
                    id="selectBox" 
                    value={selectBuilderValue} 
                    onChange={handleSelectBuilderChange}
                >
                    <option value="">Выберите builder</option>
                    <option value="Basic Coin">Basic Coin</option>
                    <option value="Advanced Coin">Advanced Coin</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
        {memeCoin && (<CoinRepresentation name = {memeCoin.name} image={memeCoin.image} background={memeCoin.background}/>)}
        {normalCoin && (<CoinRepresentation name = {normalCoin.name} image={normalCoin.image} background={normalCoin.background}/>)}
        </>
    )
}

interface CoinProps {
    name: string;
    image: string;
    background?: string;
}

const CoinRepresentation: React.FC<CoinProps> = ({name, image, background}) => {
    

    let rtrnVAL: JSX.Element = <>
    <p className="coinnname">{name}</p>
    <div className="image-stack">
        <div className="image-stack__item image-stack__item--top">
            <img src={image} className="img-logo"/>
        </div>
        <div className="image-stack__item image-stack__item--bottom">
        <img src={background} className="img-bg"/>
        </div>
    </div>
    </>
    if(!background)
    {
        rtrnVAL = <>
        <p className="coinnname">{name}</p>
        <div className="image-stack">
            <div className="image-stack__item image-stack__item--top">
                <img src={image} className="img-logo"/>
            </div>
        </div>
        </>
    }
    return(
        <>
        {rtrnVAL}
        </>
       
    )
}

export default CoinFactory