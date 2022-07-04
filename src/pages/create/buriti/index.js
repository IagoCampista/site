import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { Link, useHistory } from 'react-router-dom'

import './style.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from '../../../images/buriti-kindle.png';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function Buriti() {

    const [dataColors, setDataColors] = useState([]);
    const [formatSize, setFormatSize] = useState({});
    const [formatId, setFormatId] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedColors, setSelectedColors] = useState([])
    const [isValidated, setIsValidated] = useState(false)
    const [checkedBoxes, setCheckedBoxes] = useState(0)
    const [selectedModel, setSelectedModel] = useState('')
    const [selectedElasticColor, setSelectedElasticColor] = useState('')
    const [clientNote, setClientNote] = useState('');
    const [displayModal, setDisplayModal] = useState('none');
    const [maxSlides, setMaxSlides] = useState(5);
    const [displayDimensionForms, setDisplayDimensionForms] = useState('none');

    const [userDimensions, setUserDimensions] = useState({

        width: '',
        length: '',
        height: '',

    })

    const settings = {

        className: "start",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: maxSlides,
        swipeToSlide: true,

    }

    const values = {

        name: "Buriti",
        formats: [{

            name: "10ª Geração",
            id: 4,
            size: {
                // width: 12.5,
                width: 13,
                length: 17,
                // height: 1.5,
                height: 2,
                weight: 0.5
            },
            types: [

                {
                    name: "10ª Geração",
                    value: 25
                }

            ]

        },
        {

            name: "Paperwhite",
            id: 5,
            size: {
                // width: 13.5,
                width: 14,
                // length: 18.5,
                length: 19,
                // height: 1.5,
                height: 2,
                weight: 0.5
            },
            types: [

                {
                    name: "Paperwhite",
                    value: 25
                },

            ]

        },
        {

            name: "iPad/Tablet",
            id: 30,
            size: {
                // width: 13.5,
                width: 14,
                // length: 18.5,
                length: 19,
                // height: 1.5,
                height: 2,
                weight: 0.5
            },
            types: [

                {
                    name: "iPad/Tablet",
                    value: 42
                },

            ]

        }
        ]
    }

    useEffect(() => {

        if (window.innerWidth < 820) {

            setMaxSlides(3)

        } else {

            setMaxSlides(5)

        }

    }, [])

    function handleSelectedModel(event) {

        let position = event.target.value
        setSelectedModel(values.formats[position].types[0])
        setFormatId(values.formats[position].id)

        if (values.formats[position].types[0].name === 'iPad/Tablet') {

            setDisplayDimensionForms('flex');

        } else {

            setFormatSize(values.formats[position].size)
            setDisplayDimensionForms('none');

        }

    }

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });

    }

    useEffect(() => {

        window.scrollTo(0, 0);

        if (!firebase.apps.length)
            firebase.initializeApp(FirebaseConfig);
        onAuthStateChanged()

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('colors/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataColors(temp)

            }

            else {

                console.log("No data available");

            }

        });

    }, []);

    function handleInputDimensionsChange(event) {

        const { name, value } = event.target

        setUserDimensions({

            ...userDimensions, [name]: value

        })

    }

    let history = useHistory();

    function addToCart() {

        const temp = JSON.parse(localStorage.getItem('products'))
        var listOfItems = temp !== null ? Object.keys(temp).map((key) => temp[key]) : []

        const newItems = []

        const dataToSend = {

            model: 'Buriti',
            id: formatId,
            kindleModel: selectedModel.name,
            value: selectedModel.value,
            elasticColor: selectedElasticColor,
            coverColors: selectedColors,
            clientNote: clientNote,
            size: selectedModel.name === 'iPad/Tablet' ? userDimensions : formatSize

        }

        newItems.push(dataToSend)

        // n lembro o porquê disso (inclusive, length tá escrito errado, então a condição não funciona)
        if (listOfItems.lenght > 0) {

            newItems.map(item => listOfItems.push(item))
            localStorage.setItem('products', JSON.stringify(listOfItems))

        } else {

            newItems.map(item => listOfItems.push(item))
            localStorage.setItem('products', JSON.stringify(listOfItems))

        }

        history.push('/Carrinho')

    }

    function changeColor(event) {

        let isChecked;

        setTimeout(() => {

            isChecked = event.target.control.checked

            if (isChecked) {

                event.target.style.backgroundColor = '#000'

            } else {

                event.target.style.backgroundColor = 'transparent'

            }

        }, 80)

    }

    const checkColor = (item, event) => {

        const isChecked = event.target.checked

        if (isChecked) {

            setSelectedColors([...selectedColors, {

                name: item.colorName,
                code: item.colorCode

            }])

            setCheckedBoxes(checkedBoxes + 1)

        } else {

            const color = item.colorName
            let index = selectedColors.findIndex((element) => element.name === color)

            if (index !== -1) {

                selectedColors.splice(index, 1)
                setCheckedBoxes(checkedBoxes - 1)

            }

        }

    }

    useEffect(() => {

        if (selectedModel === '' || selectedElasticColor === '' || (checkedBoxes > 1 || checkedBoxes === 0)) {

            setIsValidated(false)

        } else {

            setIsValidated(true)

        }

    }, [selectedModel, selectedElasticColor, checkedBoxes])

    function handleSelectedElasticColor(item, event) {

        setSelectedElasticColor(event)

    }

    function handleClientNote(event) {

        setClientNote(event.target.value)

    }

    function closeModal() {

        if (displayModal === "none")
            setDisplayModal("flex")
        else {
            setDisplayModal("none");
        }

    }

    return (

        <main id="MainSketchbook">

            <div style={{ display: displayModal }} role="dialog" className='divModal' >

                <div className="modalContent">

                    <div className="sketchbookImgWrapper">

                        <img src={logo} alt="" />

                    </div>

                    <span onClick={closeModal}>x</span>

                </div>

            </div>

            <Header />

            <section id="CreateSketchbookSection">

                <div className="logoWrapper">

                    <img src={logo} alt="logo" />

                </div>

                <div className="textIntro">

                    <h1>Monte seu Buriti</h1>
                    <h5>Selecione as opções abaixo e monte seu cactus do seu jeito</h5>

                </div>

                <fieldset>

                    <label for="kindleModel">Selecione o modelo</label>

                    <select onChange={handleSelectedModel} className="kindleModel">

                        <option value="" selected disabled>Modelo do seu aparelho</option>

                        {values.formats.map((format, index) => {

                            return (

                                <option value={index} key={index}>{format.name}</option>

                            )

                        }
                        )}

                    </select>

                    <p>Veja as especificações dos modelos clicando <Link to="/gramaturas">aqui</Link></p>

                </fieldset>

                <fieldset className="userModel" style={{ display: displayDimensionForms }}>

                    <label for="userModel">Insira as dimensões abaixo</label>

                    <form className="userModel">

                        <input id='width' name='width' type='number' onChange={handleInputDimensionsChange} placeholder='Largura' />
                        <input id='length' name='length' type='number' onChange={handleInputDimensionsChange} placeholder='Comprimento' />
                        <input id='height' name='height' type='number' onChange={handleInputDimensionsChange} placeholder='Altura' />

                    </form>

                </fieldset>

                <div className="textWrapper">

                    <div className="textBackground">

                        <h2>Cor da capa</h2>

                    </div>

                    <p>Selecione <strong>uma</strong> cor. Arraste para o lado para conferir todas as opções.</p>

                </div>

                <div className="sliderColors">

                    <Slider {...settings}>

                        {dataColors.map((item, index) => (

                            item.models.includes("buriti") && item.categories.includes("cover") ? (

                                <div className="cardColor">

                                    <label for={index} onClick={(event) => changeColor(event)} />

                                    {item.image ?

                                        (<div key={item.id} className="colorBox">

                                            <img draggable="false" src={item.image} alt="cor" />

                                        </div>)

                                        :

                                        (<div key={item.id} style={{ backgroundColor: item.colorCode }} className="colorBox">

                                            <p>{item.colorCode}</p>

                                        </div>)

                                    }

                                    <div className="colorName">

                                        <p>{item.colorName}</p>

                                        <input
                                            type="checkbox"
                                            value={index}
                                            id={index}
                                            onChange={(event) => checkColor(item, event)}
                                            style={{ accentColor: item.colorCode }}
                                        />

                                    </div>

                                </div>

                            ) : null

                        ))}

                    </Slider>

                </div>

                <section id="RadioSelectionColors">

                    <div className="boxColor">

                        <div className="textWrapper">

                            <div className="textBackground">

                                <h2>Cor do elástico</h2>

                            </div>

                            <p>Selecione <strong>uma</strong> cor</p>

                        </div>

                        <div className="elasticColorWrapper">

                            {dataColors.map((item, index) => (

                                item.models.includes("buriti") && item.categories.includes("elastic") ? (

                                    <div className="colorWrapper">

                                        {item.image ?

                                            (

                                                <div className="elasticColor">

                                                    <img src={item.image} alt="cor do elástico" />

                                                </div>

                                            )

                                            :

                                            (

                                                <div style={{ backgroundColor: item.colorCode }} className="elasticColor" />

                                            )

                                        }

                                        <input

                                            type="radio"
                                            onClick={(event) => handleSelectedElasticColor(event, item, index)}
                                            name="selectedElasticColor"
                                            key={item.id}
                                            value={item.name}
                                            style={{ accentColor: item.colorCode }}

                                        />

                                    </div>

                                ) : null

                            ))}

                        </div>

                    </div>

                </section>

                <div className="additionalInfos">

                    <label for="additionalInfos">Informações adicionais <strong>(opcional)</strong></label>

                    <textarea
                        type="text"
                        name="additionalInfos"
                        id="additionalInfos"
                        onChange={handleClientNote}
                    />

                    {isValidated ? (

                        <>

                            <div className="productInfosWrapper">

                                <h1>Seu sketchbook</h1>

                                <ul>

                                    <li><strong>Modelo: </strong>{selectedModel.name}</li>

                                    <li>
                                        <strong>Cor da capa: </strong>
                                        {selectedColors.map((color, index) => {

                                            return (

                                                <span key={index}>{(index ? ' + ' : '') + color.name}</span>

                                            )

                                        })}
                                    </li>

                                    <li><strong>Cor do elástico: </strong>{selectedElasticColor.colorName}</li>

                                </ul>

                                <h3>Valor do sketchbook: R$ {selectedModel.value}</h3>

                                <button onClick={() => addToCart()}>Adicionar ao carrinho</button>

                            </div>

                        </>

                    ) : (

                        <>

                            <p>Você deve selecionar <strong>todas as opções</strong> antes de finalizar seu sketchbook</p>

                        </>

                    )}

                </div>

            </section>

            <Footer />

        </main>

    )

}