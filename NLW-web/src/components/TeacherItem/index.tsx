import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://pbs.twimg.com/profile_images/976090662994153473/2TvxyOPm_400x400.jpg" alt="Iuri Girolometo"/>
                <div>
                    <strong>Iuri Girolometo</strong>
                    <span>Programação</span>
                </div>
            </header>
            <p>
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                <br/>
                <br/>
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80</strong>
                </p>
                <button type="button">
                    <img src={whatsAppIcon} alt="WhatsApp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );

}

export default TeacherItem;