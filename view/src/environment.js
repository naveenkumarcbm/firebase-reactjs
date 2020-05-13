const USERS_PREFIX = '/api/users'
const Environment = {
    BASE_URL: 'https://us-central1-navvani.cloudfunctions.net',
    LOGIN: USERS_PREFIX + '/login',
    SIGN_UP: USERS_PREFIX + '/signup',
    USERS_LIST: USERS_PREFIX+'/all'
}

export default Environment;