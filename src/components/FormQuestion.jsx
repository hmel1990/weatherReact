import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class FormQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            isSending: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log ('Компонент отрисовался')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log ('произошло изменение')
        console.log(prevState);
    }

    handleChange = (event) => {
        this.setState({ question: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const question = this.state.question;
        if (!question.trim()) {
            alert('Пожалуйста, введите вопрос');
            return;
        }

        this.setState({ isSending: true });


        try {
            const response = await fetch('https://serverweather-ev0x.onrender.com/send/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: this.state.question })
            });

            const serverResponse = await response.text();
            console.log('Ответ от сервера:', serverResponse);
            alert('Вопрос успешно отправлен!');
            this.setState({ question: '' });
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            alert('Произошла ошибка при отправке вопроса');
        } finally {
            this.setState({ isSending: false });
        }
    };
    handleClick = () => this.setState({ question: '' })

    render() {
        const { question, isSending } = this.state;

        return (
            <div className="form-question-container text-white">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formQuestion">
                        <Form.Label>Ваш вопрос:</Form.Label>
                        <Form.Control
                            type="text"
                            name="question"
                            value={question}
                            onChange={this.handleChange}
                            placeholder="Введите свой вопрос"
                            required
                            className="anketa-input"
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isSending}
                        className="m-2"
                    >
                        {isSending ? 'Отправка...' : 'Отправить'}
                    </Button>
                    <Button
                        variant="primary"
                        type="reset"
                        className="m-2"
                        onClick={this.handleClick}
                    >
                        Сбросить
                    </Button>
                </Form>
            </div>
        );
    }
}

export default FormQuestion;
