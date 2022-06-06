import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';

import './style.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import logo from '../../../images/baiao2.jpg';
import Baiao1Cor from '../../../images/capas/Baiao1Cor.png';
import Baiao2Cores from '../../../images/capas/Baiao2Cores.png';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function Baiao() {
    const [dataColors, setDataColors] = useState([]);
    const [formatTypes, setformatTypes] = useState([]);
    const [formatSize, setFormatSize] = useState({});
    const [formatId, setFormatId] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [isValidated, setIsValidated] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState(0);
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('');
    const [selectedLineColor, setSelectedLineColor] = useState('');
    const [selectedElasticColor, setSelectedElasticColor] = useState('');
    const [clientNote, setClientNote] = useState('');
    const [sketchbookInfos, setSketchbookInfos] = useState('');
    const [displayModal, setDisplayModal] = useState('none');
    const [maxSlides, setMaxSlides] = useState(5);

    const settings = {
        className: 'start',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: maxSlides,
        swipeToSlide: true,
    };

    const values = {

        name: "Baião",
        formats: [{

            name: "21X21",
            id: 1,
            size: {
                width: 21,
                length: 21,
                height: 3,
                // height: 2.5,
                weight: 0.5
            },
            types: [

                {
                    name: "Papel Reciclado Liso",
                    value: 60
                },
                {
                    name: "Papel Kraft",
                    value: 65
                },
                {
                    name: "Papel Canson 140g",
                    value: 75
                },
                {
                    name: "Papel Canson 200g",
                    value: 85
                },
                {
                    name: "Papel Preto",
                    value: 82
                },
                {
                    name: "Papel Canson Aquarela",
                    value: 115
                },
                {
                    name: "Papel Montval",
                    value: 115
                }

            ]

        },
        {

            name: "15X15",
            id: 2,
            size: {
                width: 15,
                length: 15,
                height: 3,
                // height: 2.5,
                weight: 0.5
            },
            types: [

                {
                    name: "Papel Reciclado Liso",
                    value: 38
                },
                {
                    name: "Papel Reciclado Pontilhado",
                    value: 38
                },
                {
                    name: "Papel Reciclado Quadriculado",
                    value: 38
                },
                {
                    name: "Papel Reciclado Pautado",
                    value: 38
                },
                {
                    name: "Papel Marfim Liso",
                    value: 38
                },
                {
                    name: "Papel Marfim Pontilhado",
                    value: 38
                },
                {
                    name: "Papel Marfim Quadriculado",
                    value: 38
                },
                {
                    name: "Papel Marfim Pautado",
                    value: 38
                },
                {
                    name: "Papel Kraft",
                    value: 42
                },
                {
                    name: "Papel Canson 140g",
                    value: 48
                },
                {
                    name: "Papel Canson 200g",
                    value: 55
                },
                {
                    name: "Papel Preto",
                    value: 52
                },
                {
                    name: "Papel Canson Aquarela",
                    value: 78
                },
                {
                    name: "Papel Montval",
                    value: 78
                }

            ]

        },
        {

            name: "10X10",
            id: 3,
            size: {
                width: 10,
                length: 10,
                height: 3,
                // height: 2.5,
                weight: 0.5
            },
            types: [

                {
                    name: "Papel Reciclado Liso",
                    value: 25
                },
                {
                    name: "Papel Reciclado Pontilhado",
                    value: 25
                },
                {
                    name: "Papel Reciclado Quadriculado",
                    value: 25
                },
                {
                    name: "Papel Reciclado Pautado",
                    value: 25
                },
                {
                    name: "Papel Marfim Liso",
                    value: 25
                },
                {
                    name: "Papel Marfim Pontilhado",
                    value: 25
                },
                {
                    name: "Papel Marfim Quadriculado",
                    value: 25
                },
                {
                    name: "Papel Marfim Pautado",
                    value: 25
                },
                {
                    name: "Papel Kraft",
                    value: 30
                },
                {
                    name: "Papel Canson 140g",
                    value: 35
                },
                {
                    name: "Papel Canson 200g",
                    value: 40
                },
                {
                    name: "Papel Preto",
                    value: 36
                },
                {
                    name: "Papel Canson Aquarela",
                    value: 45
                },
                {
                    name: "Papel Montval",
                    value: 45
                }

            ]

        },

        ]

    };

    useEffect(() => {
        if (window.innerWidth < 820) {
            setMaxSlides(3);
        } else {
            setMaxSlides(5);
        }
    }, []);

    function handleSelectedSketchbook(event) {
        let position = event.target.value;

        setSelectedPaperWidth(values.formats[position].name);
        setformatTypes(values.formats[position].types);
        setFormatSize(values.formats[position].size);
        setFormatId(values.formats[position].id);
    }

    function handleSelectedType(event) {
        let position = event.target.value;
        setSketchbookInfos(formatTypes[position]);
    }

    function onAuthStateChanged(user) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) setUserIsLogged(true);
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);
        onAuthStateChanged();
    }, []);

    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('colors/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                var temp = Object.keys(data).map((key) => data[key]);
                setDataColors(temp);
            } else {
                console.log('No data available');
            }
        });
    }, []);

    let history = useHistory();

    function addToCart() {
        const temp = JSON.parse(localStorage.getItem('products'));
        var listOfItems =
            temp !== null ? Object.keys(temp).map((key) => temp[key]) : [];

        const newItems = [];

        const dataToSend = {
            model: 'Baião',
            id: formatId,
            paperWidth: selectedPaperWidth,
            paper: sketchbookInfos.name,
            value: sketchbookInfos.value,
            lineColor: selectedLineColor,
            elasticColor: selectedElasticColor,
            coverColors: selectedColors,
            clientNote: clientNote,
            size: formatSize,
        };

        newItems.push(dataToSend);

        // n lembro o porquê disso (inclusive, length tá escrito errado, então a condição não funciona)
        if (listOfItems.lenght > 0) {
            newItems.map((item) => listOfItems.push(item));
            localStorage.setItem('products', JSON.stringify(listOfItems));
        } else {
            newItems.map((item) => listOfItems.push(item));
            localStorage.setItem('products', JSON.stringify(listOfItems));
        }

        history.push('/Carrinho');
    }

    function changeColor(event) {
        let isChecked;

        setTimeout(() => {
            isChecked = event.target.control.checked;

            if (isChecked) {
                event.target.style.backgroundColor = '#000';
            } else {
                event.target.style.backgroundColor = 'transparent';
            }
        }, 80);
    }

    const checkColor = (item, event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedColors([
                ...selectedColors,
                {
                    name: item.colorName,
                    code: item.colorCode,
                },
            ]);

            setCheckedBoxes(checkedBoxes + 1);
        } else {
            const color = item.colorName;
            let index = selectedColors.findIndex(
                (element) => element.name === color
            );

            if (index !== -1) {
                selectedColors.splice(index, 1);
                setCheckedBoxes(checkedBoxes - 1);
            }
        }
    };

    useEffect(() => {
        if (
            formatTypes === '' ||
            sketchbookInfos === '' ||
            selectedLineColor === '' ||
            selectedElasticColor === '' ||
            checkedBoxes > 2 ||
            checkedBoxes === 0
        ) {
            setIsValidated(false);
        } else {
            setIsValidated(true);
        }
    }, [
        formatTypes,
        sketchbookInfos,
        selectedLineColor,
        selectedElasticColor,
        checkedBoxes,
    ]);

    function handleSelectedLineColor(item, event) {
        setSelectedLineColor(event);
    }

    function handleSelectedElasticColor(item, event) {
        setSelectedElasticColor(event);
    }

    function handleClientNote(event) {
        setClientNote(event.target.value);
    }

    function handleModalInfos() {
        displayModal === 'none'
            ? setDisplayModal('flex')
            : setDisplayModal('none');
    }

    function closeModal() {
        if (displayModal === 'none') setDisplayModal('flex');
        else {
            setDisplayModal('none');
        }
    }

    return (
        <main id='MainSketchbook'>
            <div
                style={{ display: displayModal }}
                role='dialog'
                className='divModal'
            >
                <div className='modalContent'>
                    <span onClick={closeModal}>x</span>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com uma cor</h3>
                        <img src={Baiao1Cor} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com duas cores</h3>
                        <img src={Baiao2Cores} alt='' />
                    </div>
                </div>
            </div>

            <Header />

            <section id='CreateSketchbookSection'>
                <div className='logoWrapper'>
                    <img src={logo} alt='logo' />
                </div>

                <div className='textIntro'>
                    <h1>Monte seu Baião</h1>
                    <h5>
                        Selecione as opções abaixo e monte seu cactus do seu
                        jeito
                    </h5>
                </div>

                <fieldset>
                    <label for='paperWidth'>Selecione o tamanho do papel</label>

                    <select
                        onChange={handleSelectedSketchbook}
                        className='paperWidth'
                    >
                        <option value='' selected disabled>
                            Tamanho do papel
                        </option>

                        {values.formats.map((format, index) => {
                            return (
                                <option value={index} key={index}>
                                    {format.name}
                                </option>
                            );
                        })}
                    </select>
                </fieldset>

                <fieldset>
                    <label for='paper'>Selecione o papel do miolo</label>

                    <select onChange={handleSelectedType} className='paper'>
                        <option value='0' selected disabled>
                            Papel do miolo
                        </option>

                        {formatTypes.map((type, index) => {
                            return (
                                <option value={index} key={index}>
                                    {type.name} - R$ {type.value}
                                </option>
                            );
                        })}
                    </select>

                    <p>
                        Veja mais sobre a gramatura e quantidade de páginas
                        clicando <Link to='/gramaturas'>aqui</Link>
                    </p>
                </fieldset>

                <div className='textWrapper'>
                    <div className='textBackground'>
                        <h2>Cor da capa</h2>
                    </div>

                    <p>
                        Selecione <strong>até duas</strong> cores. Arraste para
                        o lado para conferir todas as opções.{' '}
                        <button onClick={() => handleModalInfos()}>
                            Clique aqui para visualizar os modelos de capa
                        </button>
                    </p>
                    <p>
                        A <b>primeira</b> cor selecionada é referente à parte
                        maior (inferior) e a <b>segunda</b> é referente à parte
                        menor (superior). Não é possível escolher dois tipos de
                        tecido por capa, e se um tecido for esolhido, ele{' '}
                        <b>obrigatoriamente</b> ficará na parte de baixo
                        (maior).
                    </p>
                </div>

                <div className='sliderColors'>
                    <Slider {...settings}>
                        {dataColors.map((item, index) =>
                            item.models.includes('baiao') &&
                            item.categories.includes('cover') ? (
                                <div className='cardColor'>
                                    <label
                                        for={index}
                                        onClick={(event) => changeColor(event)}
                                    />

                                    {item.image ? (
                                        <div key={item.id} className='colorBox'>
                                            <img
                                                draggable='false'
                                                src={item.image}
                                                alt='cor'
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            key={item.id}
                                            style={{
                                                backgroundColor: item.colorCode,
                                            }}
                                            className='colorBox'
                                        >
                                            <p>{item.colorCode}</p>
                                        </div>
                                    )}

                                    <div className='colorName'>
                                        <p>{item.colorName}</p>

                                        <input
                                            type='checkbox'
                                            value={index}
                                            id={index}
                                            onChange={(event) =>
                                                checkColor(item, event)
                                            }
                                            style={{
                                                accentColor: item.colorCode,
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : null
                        )}
                    </Slider>
                </div>

                <section id='RadioSelectionColors'>
                    <div className='boxColor'>
                        <div className='textWrapper'>
                            <div className='textBackground'>
                                <h2>Cor da linha</h2>
                            </div>

                            <p>
                                Selecione <strong>uma</strong> cor
                            </p>
                        </div>

                        <div className='lineColorWrapper'>
                            {dataColors.map((item, index) =>
                                item.models.includes('baiao') &&
                                item.categories.includes('line') ? (
                                    <div className='colorWrapper'>
                                        {item.image ? (
                                            <div className='elasticColor'>
                                                <img
                                                    src={item.image}
                                                    alt='cor do elástico'
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        item.colorCode,
                                                }}
                                                className='elasticColor'
                                            />
                                        )}

                                        <input
                                            type='radio'
                                            onClick={(event) =>
                                                handleSelectedLineColor(
                                                    event,
                                                    item,
                                                    index
                                                )
                                            }
                                            name='selectedLineColor'
                                            key={item.id}
                                            value={item.name}
                                            className='checkbox'
                                            style={{
                                                accentColor: item.colorCode,
                                            }}
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>
                    </div>

                    <div className='boxColor'>
                        <div className='textWrapper'>
                            <div className='textBackground'>
                                <h2>Cor do elástico</h2>
                            </div>

                            <p>
                                Selecione <strong>uma</strong> cor
                            </p>
                        </div>

                        <div className='elasticColorWrapper'>
                            {dataColors.map((item, index) =>
                                item.models.includes('baiao') &&
                                item.categories.includes('elastic') ? (
                                    <div className='colorWrapper'>
                                        {item.image ? (
                                            <div className='elasticColor'>
                                                <img
                                                    src={item.image}
                                                    alt='cor do elástico'
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        item.colorCode,
                                                }}
                                                className='elasticColor'
                                            />
                                        )}

                                        <input
                                            type='radio'
                                            onClick={(event) =>
                                                handleSelectedElasticColor(
                                                    event,
                                                    item,
                                                    index
                                                )
                                            }
                                            name='selectedElasticColor'
                                            key={item.id}
                                            value={item.name}
                                            style={{
                                                accentColor: item.colorCode,
                                            }}
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>
                    </div>
                </section>

                <div className='additionalInfos'>
                    <label for='additionalInfos'>
                        Informações adicionais <strong>(opcional)</strong>
                    </label>

                    <textarea
                        type='text'
                        name='additionalInfos'
                        id='additionalInfos'
                        onChange={handleClientNote}
                    />

                    {isValidated ? (
                        <>
                            <div className='productInfosWrapper'>
                                <h1>Seu sketchbook</h1>

                                <ul>
                                    <li>
                                        <strong>Tamanho do papel: </strong>
                                        {selectedPaperWidth}
                                    </li>
                                    <li>
                                        <strong>Papel do miolo: </strong>
                                        {sketchbookInfos.name}
                                    </li>

                                    <li>
                                        <strong>Cor da capa: </strong>

                                        {selectedColors.length > 0 ? (
                                            selectedColors.length === 2 ? (
                                                <span>{`${selectedColors[0].name} (parte inferior) e ${selectedColors[1].name} (parte superior)`}</span>
                                            ) : (
                                                <span>
                                                    {selectedColors[0].name}
                                                </span>
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </li>

                                    <li>
                                        <strong>Cor da linha: </strong>
                                        {selectedLineColor.colorName}
                                    </li>
                                    <li>
                                        <strong>Cor do elástico: </strong>
                                        {selectedElasticColor.colorName}
                                    </li>
                                </ul>

                                <h3>
                                    Valor do sketchbook: R${' '}
                                    {sketchbookInfos.value}
                                </h3>

                                <button onClick={() => addToCart()}>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>
                                Você deve selecionar{' '}
                                <strong>todas as opções</strong> antes de
                                finalizar seu sketchbook
                            </p>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
