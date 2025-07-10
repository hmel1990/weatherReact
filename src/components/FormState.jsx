// отдельный красивый класс для хранения состояния формы
export default class FormState {
    // статический объект с начальными значениями полей (чтоб не дублировать код при начальном состоянии и сбросе полей)
    static #initialFields = {
        adress: '',
        totalArea: '',
        livingArea: '',
        roomsNumber: '',
        floor:'',
        floorNumber:'',
        photo: []
    };

    // приватное поле для хранения данных
    #fields;

    constructor(fields = null) {
        // инициализация копией начальных значений или кастомным набором
        // объект будет иногда пересоздаваться, поэтому важно чтоб он либо строился с нуля пустым, либо забирал данные у старого объекта
        this.#fields = fields ? { ...FormState.#initialFields, ...fields } : { ...FormState.#initialFields };
    }

    getField(field) {
        return this.#fields[field];
    }

    setField(field, value) {
        this.#fields[field] = value;
    }

    // метод сброса всех полей
    reset() {
        this.#fields = { ...FormState.#initialFields };
    }

    // метод для получения всех полей (для useActionState)
    getAllFields() {
        return { ...this.#fields };
    }
}