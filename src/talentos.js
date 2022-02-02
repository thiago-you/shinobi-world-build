/**
 * User Talents class
 */
class Talentos {
    constructor() {
        this.list = require(lista.json);

        // add first empty item
        this.list.unshift({ 
            'value': 0, 
            'name': 'Selecione',
            'status': {}
        });
    }

    /**
     * Add talento attribute into status
     * 
     * @param object status reference 
     * @param number value 
     */
    addAttributes(status, value) {
        // check for valid status
        if (this.#isNotValidObject(status) || this.#isNotValidObject(status.talento)) {
            return;
        }

        // check for valid value
        if (value === undefined || isNaN(value)) {
            return;
        }

        const talento = this.list.find(o => o.value == value);

        // check for valid talento and talento attribute
        if (talento == undefined || talento == null) {
            return;
        }
        if (this.#isNotValidObject(talento.status)) {
            return;
        }

        for (let [key, value] of Object.entries(talento.status)) {
            if (status.talento.hasOwnProperty(key)) {
                status.talento[key] += value;
            }
        }
    }

    /**
     * Check for invalid object
     * 
     * @param {*} object 
     * @returns 
     */
    #isNotValidObject(object) {
        return object == undefined || typeof object !== 'object' || Object.keys(object).length === 0;
    }
}