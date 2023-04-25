export function isLogin() {
    return Boolean(window.localStorage.getItem('ACCESS'));
}