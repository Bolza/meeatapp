import { forEach } from 'lodash';

export function objectValuesToArray(obj) {
    let array = [];
    forEach(obj, (v, k) => {
        if (!v.id) v.id = k;
        array.push(v);
    });
    return array;
}