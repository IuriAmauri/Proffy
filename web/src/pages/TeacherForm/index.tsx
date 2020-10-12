import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.scss';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState("");
    const [avatarUrl, setAvatar] = useState("");
    const [whatsapp, setWhatsApp] = useState("");
    const [bio, setBio] = useState("");
    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");

    const [scheduleItems, setScheduleItems] = useState([
        { weekDay: 0, from: '', to: ''}
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { weekDay: 0, from: '', to: ''}
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return {...scheduleItem, [field]: value}
            }

            return scheduleItem;
        });

        setScheduleItems(updateScheduleItems);
    }

    function createClass(e: FormEvent) {
        e.preventDefault();

        api.post('createclasses', {
            name,
            avatarUrl,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch((err) => {
            alert('Erro ao realizar cadastro ' + err)
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas." 
                        description="O primeiro passo é preencher esse fomulário de inscrição"/>

            <main>
                <form onSubmit={ createClass }>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome completo" type="text" value={ name } onChange={ (e) => { setName(e.target.value) }}/>
                        <Input name="avatarUrl" label="Avatar" type="text" value={ avatarUrl } onChange={ (e) => { setAvatar(e.target.value) }}/>
                        <Input name="whatsapp" label="WhatsApp" type="text" value={ whatsapp } onChange={ (e) => { setWhatsApp(e.target.value) }}/>
                        <TextArea name="bio" label="Biografia" value={ bio } onChange={ (e) => { setBio(e.target.value) }}/>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select name="subject" label="Matéria" value={subject} onChange={ (e) => {setSubject(e.target.value) }}
                            options={[
                                { value: "", label:"Selecione" },
                                { value: "Artes", label:"Artes" },
                                { value: "Biologia", label:"Biologia" },
                                { value: "Ciências", label: "Ciência" },
                                { value: "Educação física", label:"Educação física" },
                                { value: "Física", label:"Física" },
                                { value: "Geografia", label:"Geografia" },
                                { value: "História", label:"História" },
                                { value: "Matemática", label:"Matemática" },
                                { value: "Português", label:"Português" },
                                { value: "Química", label:"Química" },
                                { value: "Programação", label:"Programação" }
                            ]}
                        />
                        <Input name="cost" label="Custo da sua hora" type="text" value={cost} onChange={ (e) => {setCost(e.target.value) }}/>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis

                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={ scheduleItem.weekDay } className="schedule-item">
                                    <Select name="weekDay" value={ scheduleItem.weekDay } label="Dia da Semana" 
                                        onChange={ e => setScheduleItemValue(index, 'weekDay', e.target.value) }
                                        options={[
                                            { value: "0", label: "Domingo" },
                                            { value: "1", label: "Segunda-feira" },
                                            { value: "2", label: "Terça-feira" },
                                            { value: "3", label: "Quarta-feira" },
                                            { value: "4", label: "Quinta-feira" },
                                            { value: "5", label: "Sexta-feira" },
                                            { value: "6", label: "Sábado" }                            
                                    ]}/>
                                    <Input name="from" value={ scheduleItem.from } label="Das" type="time" onChange={ e => setScheduleItemValue(index, 'from', e.target.value) }/>
                                    <Input name="to" value={ scheduleItem.to } label="Até" type="time" onChange={ e => setScheduleItemValue(index, 'to', e.target.value) }/>
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;