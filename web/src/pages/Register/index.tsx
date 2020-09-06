import React, { FormEvent, useState } from 'react';
import PageLogo from '../../components/PageLogo';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.scss';
import { useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        api.post('users', {
            name,
            email,
            userName,
            password
        }).then(() => {
            history.push('/login');
        }).catch((err) => {
            alert('Erro ao cadastrar usuário ' + err)
        });
    }

    return (
        <div id="page-register">
            <div className="register-container">
                <form onSubmit={ handleRegister }>
                    <legend>Cadastro</legend>
                    <p>Preencha os dados abaixo para começar</p>
                    <Input name="name" placeholder="Nome" onChange={ (e) => {setName(e.target.value) }}/>
                    <Input name="email" placeholder="Email" onChange={ (e) => {setEmail(e.target.value) }}/>
                    <Input name="userName" placeholder="Usuário" onChange={ (e) => {setUserName(e.target.value) }}/>
                    <Input name="password" placeholder="Senha" type="password" onChange={ (e) => {setPassword(e.target.value) }}/>
                    
                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
            <PageLogo />
        </div>
    );
}

export default Register;