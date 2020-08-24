import React from 'react';
import PageLogo from '../../components/PageLogo';

import './styles.scss';
import Input from '../../components/Input';

function Register() {
    return (
        <div id="page-register">
            <div className="register-container">
                <form>
                    <legend>Cadastro</legend>
                    <p>Preencha os dados abaixo para começar</p>
                    <Input name="name" placeholder="Nome" />
                    <Input name="surname" placeholder="Sobrenome" />
                    <Input name="email" placeholder="Email" />
                    <Input name="password" placeholder="Senha" />
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