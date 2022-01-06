import Cookies from 'universal-cookie';
let cookies = new Cookies();

export const kuki = {
    set: (key, value, options) => cookies.set(key, value, options),
    get: (key) => cookies.get(key),
    remove: (key) => cookies.remove(key)
}

export const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}