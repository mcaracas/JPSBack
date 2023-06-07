export const cerrarSesion = () => {
    sessionStorage.clear();
    window.location.href = '/';
}