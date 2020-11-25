import React, { useState, FormEvent } from 'react';
import PageHeader from '../components/PageHeader';
import TeacherItem, { Teacher } from '../components/TeacherItem';
import Input from '../components/Input';
import Select from '../components/Select';
import api from '../services/api';

import '../styles/teacher-list.scss';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                weekDay,
                time
            }
        })

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis">
            <form id="search-teachers" onSubmit={ searchTeachers } >
                    <Select name="subject" label="Matéria" value={ subject }
                        onChange={ (e) => { setSubject(e.target.value) }}
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
                    ]}/>
                    <Select name="weekDay" label="Dia da Semana" value={ weekDay }
                        onChange={ (e) => { setWeekDay(e.target.value) }}
                        options={[
                            { value: "0", label: "Domingo" },
                            { value: "1", label: "Segunda-feira" },
                            { value: "2", label: "Terça-feira" },
                            { value: "3", label: "Quarta-feira" },
                            { value: "4", label: "Quinta-feira" },
                            { value: "5", label: "Sexta-feira" },
                            { value: "6", label: "Sábado" }                            
                    ]}/>
                    <Input name="time" label="Hora" type="time" value={ time } onChange={ (e) => { setTime(e.target.value) }}/>
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                { teachers.map((teacher: Teacher)  => {
                    return <TeacherItem key={ teacher.name } teacher={ teacher } />
                })}
            </main>
        </div>
    )
}

export default TeacherList;