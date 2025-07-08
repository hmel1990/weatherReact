import {useActionState} from "react";

import FormState from "./FormState";




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
                      <label htmlFor="adress" className="anketa-label">Адрес (обязательное поле):</label><br />
                      <input
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
                      <label htmlFor="adress" className="anketa-label">Общая площадь (обязательное поле):</label><br />
                      <input
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
                      <label htmlFor="adress" className="anketa-label">Жилая площадь (обязательное поле):</label><br />
                      <input
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
                      <input
                          type="submit"
                          value="Отправить"
                          disabled={isPending}
                          className="anketa-button anketa-button-submit"
                      />
                      <input
                          type="reset"
                          value="Сбросить"
                          onClick={() => formAction(new FormData())}
                          className="anketa-button anketa-button-reset"
                      />

                  </fieldset>
              </form>
          </div>
        </>
    )
}

export default FormAnketa