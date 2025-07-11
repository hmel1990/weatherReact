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
            // FormData — это встроенный объект браузера, часть стандартного JavaScript API (Web API), доступного во всех современных браузерах, содержит то что ввели в поля формы
            //_prevState, FormData стандартные параметры для функции,  react сам решает, что передать в эту функцию, и передаёт два параметра: _prevState и formData
        {
            try
            {
                // собираем все поля формы в обычный объект
                const entries = Object.fromEntries(formData.entries());

                if (formData.getAll('photo')[0] instanceof File) {

                    async function readFileAsBase64(file) {
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        });
                    }

                    const files = formData.getAll('photo'); //вернется массив из фото

                    try
                    {
                            const base64Images = await Promise.all(
                                files.map(file => readFileAsBase64(file)));
                            entries.photo = base64Images;
                    }
                    catch (error) {
                        console.error('Произошла ошибка при чтении файлов:', error);
                    }
                }

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
          <div className="anketa-container text-white">
              <form action = {formAction}>
                  <fieldset className="anketa-fieldset">


                      <legend className="anketa-legend">Введите данные о квартире</legend>

                      {/* ====================================================================== */}

                      {/* адрес */}
                      <Form.Label htmlFor="adress">Адрес:</Form.Label><br />
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
                      <Form.Label htmlFor="adress" className="anketa-label">Общая площадь:</Form.Label><br />
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
                      <Form.Label htmlFor="adress" className="anketa-label">Жилая площадь:</Form.Label><br />
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

                      {/* количество комнат */}
                      <Form.Label htmlFor="roomsNumber" className="anketa-label">Количество комнат:</Form.Label><br />
                      <Form.Control
                          // autoComplete="username"
                          type="text"
                          id="roomsNumber"
                          name="roomsNumber"
                          defaultValue={state.getField('roomsNumber')}
                          className="anketa-input"
                          required
                      /><br />

                      {/* ====================================================================== */}

                      {/* єтаж */}
                      <Form.Label htmlFor="floor" className="anketa-label">Этаж:</Form.Label><br />
                      <Form.Control
                          // autoComplete="username"
                          type="text"
                          id="floor"
                          name="floor"
                          defaultValue={state.getField('floor')}
                          className="anketa-input"
                          required
                      /><br />

                      {/* ====================================================================== */}

                      {/* єтажность */}
                      <Form.Label htmlFor="floorNumber" className="anketa-label">Этажность:</Form.Label><br />
                      <Form.Control
                          // autoComplete="username"
                          type="text"
                          id="floorNumber"
                          name="floorNumber"
                          defaultValue={state.getField('floorNumber')}
                          className="anketa-input"
                          required
                      /><br />
                      {/* ====================================================================== */}

                      {/* Фото */}
                      <Form.Label htmlFor="photo" className="anketa-label">Загрузите документы:</Form.Label><br />
                      <Form.Control
                          // autoComplete="username"
                          type="file"
                          id="photo"
                          name="photo"
                          defaultValue={state.getField('photo')}
                          className="anketa-input"
                          required
                          accept="image/*"
                          multiple
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