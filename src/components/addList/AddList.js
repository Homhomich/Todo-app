import React, {useEffect, useState} from "react";
import List from "../list/List.js";
import "../list/List.scss";
import './AddList.scss'
import Badge from "../badge/Badge";
import closeSvg from '../../assets/img/highlight_off-24px.svg'
import axios from 'axios';


const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(3);
    const [inputVal, setInputVal] = useState('');
    const[isLoading, setIsLoading]=useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputVal('');
        setSelectedColor(colors[0].id);
    }

    const addList = () => {
        if (!inputVal) {
            alert('Введите название списка!');
            return;
        }

        setIsLoading(true);
        axios.post('  http://localhost:3000/lists', {
            name: inputVal, colorId: selectedColor
        }).then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name;
            const listObj = {...data, color: {name: color}};
            onAdd(listObj);
            onClose();
        })  .catch(() => {
            alert("Не удалось добавить список!")
        })
            .finally(()=>{
            setIsLoading(false);
        });

    }


    return (

        <div className="add-list">

            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: <svg xmlns="http://www.w3.org/2000/svg" widths="20" height="20" viewBox="0 0 24 24"
                                   className="list__icon-plus">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>,
                        name: 'Добавить список',
                    }
                ]}/>

            {visiblePopup &&
            <div className="add-list__popup">
                <img
                    onClick={onClose}
                    src={closeSvg} alt="close button"
                    className="add-list__popup-close-btn"/>

                <input value={inputVal} onChange={e => setInputVal(e.target.value)} className="field" type="text"
                       placeholder="Название списка"/>
                <div className="add-list__popup-colors">

                    {
                        colors.map(color =>
                            (
                                <Badge
                                    onClick={() => setSelectedColor(color.id)}
                                    key={color.id}
                                    color={color.name}
                                    className={selectedColor === color.id && 'active'}
                                />
                            ))
                    }
                </div>
                <button onClick={addList} className="button">
                    { isLoading ? 'Добавление...' : 'Добавить'}
                </button>

            </div>
            }
        </div>
    )

}


export default AddList;