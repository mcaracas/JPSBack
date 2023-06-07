export const cerrarSesion = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/';
}