import Cookies from 'universal-cookie';

let cookies = new Cookies();

export const kuki = {
    set: (key, value, options) => cookies.set(key, value, options),
    get: (key) => cookies.get(key),
    remove: (key) => cookies.remove(key)
}