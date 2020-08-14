import React, {useEffect} from 'react';
import './List.scss';
import classNames from 'classnames';
import list from "../../assets/img/list.svg";
import Badge from "../badge/Badge";
import removeSvg from "../../assets/img/close-24px.svg";
import axios from 'axios';


function List({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) {
    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('  http://localhost:3000/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    }

    useEffect(() => {
    }, [items]);

    return (
        <ul onClick={onClick} className="list">
            {
                items.map(
                    (item, index) =>
                        <li onClick={onClickItem ? () => onClickItem(item) : null}
                            key={index}
                            className={
                                classNames(item.className,
                                {active: item.active ? item.active : activeItem && activeItem.id === item.id})}>
                            <i>
                                {item.icon ? item.icon : <Badge color={item.color.name}/>}
                            </i>
                            <span>{item.name} {item.tasks && `(${item.tasks.length})`}</span>
                            {isRemovable &&
                            <img onClick={() => removeList(item)} className="list__remove-icon" src={removeSvg}
                                 alt="remove icon"/>}
                        </li>
                )
            }

        </ul>

    )
}

export default List;