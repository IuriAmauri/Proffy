import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
    id: number,
    name :string,
    avatarUrl: string,
    bio: string,
    subject: string,
    cost: number,
    whatsapp: string        
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    };

    return (
        <article className="teacher-item">
            <header>
                <img src={ teacher.avatarUrl } alt="Iuri Girolometo"/>
                <div>
                    <strong>{ teacher.name }</strong>
                    <span>{teacher.name}</span>
                </div>
            </header>
            <p> { teacher.bio } </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ { teacher.cost }</strong>
                </p>
                <a href={` https://wa.me/${teacher.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={ createNewConnection }>
                    <img src={whatsAppIcon} alt="WhatsApp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );

}

export default TeacherItem;