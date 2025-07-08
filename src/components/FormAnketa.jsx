import {useActionState} from "react";

import FormState from "./FormState";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




function FormAnketa() {
    const url = `https://serverweather-ev0x.onrender.com/send/`;
    const initialState = new FormState();
    const [state, formAction, isPending] = useActionState(
        async (_prevState, formData) =>
            // _prevState - это текущее состояние формы (объект FormState) на момент отправки формы
            // FormData — это встроенный объект браузера, часть стандартного JavaScript API (Web API), доступного во всех современных браузерах
            //_prevState, FormData стандартные параметры для функции,  react сам решает, что передать в эту функцию, и передаёт два параметра: _prevState и formData
        {
            try
            {
                // собираем все поля формы в обычный объект
                const entries = Object.fromEntries(formData.entries());

                console.log(entries);

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( entries)
                });
                let responseFromServer  = response.text();
                console.log(responseFromServer);
                return new FormState();
            }
            catch (error)
            {
                alert('Произошла ошибка при отправке данных. ' + error.message);
                const entries = Object.fromEntries(formData.entries());
                return new FormState({ ..._prevState.getAllFields(), ...entries });
            }
        },
        initialState
    )

    return (
        <>
          <div className="anketa-container">
              <form action = {formAction}>
                  <fieldset className="anketa-fieldset">


                      <legend className="anketa-legend">Введите данные о квартире</legend>

                      {/* ====================================================================== */}

                      {/* адрес */}
                      <Form.Label htmlFor="adress">Адрес (обязательное поле):</Form.Label><br />
                      {/*<label htmlFor="adress" className="anketa-label">Адрес (обязательное поле):</label><br />*/}
                      <Form.Control
                          autoComplete="username"
                          type="text"
                          id="adress"
                          name="adress"
                          defaultValue={state.getField('adress')}
                          className="anketa-input"
                          required
                      /><br />
                      {/* ====================================================================== */}

                      {/* общая площадь */}
                      <Form.Label htmlFor="adress" className="anketa-label">Общая площадь (обязательное поле):</Form.Label><br />
                      <Form.Control
                          autoComplete="livingArea"
                          type="text"
                          id="totalArea"
                          name="totalArea"
                          defaultValue={state.getField('totalArea')}
                          className="anketa-input"
                          required
                      /><br />
                      {/* ====================================================================== */}

                      {/* жилая площадь */}
                      <Form.Label htmlFor="adress" className="anketa-label">Жилая площадь (обязательное поле):</Form.Label><br />
                      <Form.Control
                          // autoComplete="username"
                          type="text"
                          id="livingArea"
                          name="livingArea"
                          defaultValue={state.getField('livingArea')}
                          className="anketa-input"
                          required
                      /><br />

                      {/* ====================================================================== */}

                      {/* кнопки */}
                      <Button as="input" type="submit" value={isPending ? 'Отправка…' : 'Отправить'} disabled={isPending}
                              variant="primary" size="lg"
                              className="m-2"/>
                      <Button as="input" type="reset" value="Сбросить"
                              variant="primary" size="lg"
                              onClick={() => formAction(new FormData())}
                              className="m-2"/>

                  </fieldset>
              </form>
          </div>
        </>
    )
}

export default FormAnketa