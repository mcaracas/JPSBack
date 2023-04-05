import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { updatePassword } from '../../../services/axiosService';
import EncabezadoFranjas from '../EncabezadoFranjas';
import SuccessModal from '../../modals/SuccessModal';

function ConfirmationCodeModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [enteredCode, setEnteredCode] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const code = location.state.code;
    const username = location.state.username;
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [mensaje, setMensaje] = useState('')

    function handleClose() {
        setIsOpen(false);
        navigate('/');
    }

    function handleConfirm() {
        if (enteredCode === code) {
            setTitulo('Operación exitosa')
            setMensaje('se enviará un correo con la nueva contraseña')
            setShowSuccessModal(true)
            return true;
        } else {
            setTitulo('Operación fallida')
            setMensaje('El código no coincide')
            setShowSuccessModal(true)
            return false;
        }
    }

    const handleSubmit = async () => {
        try {
            if (handleConfirm()) {
                await updatePassword(username);
            }
        } catch (error) {
            setTitulo('Operación fallida')
            setMensaje('No se pudo guardar del registro')
            setShowSuccessModal(true)
        }
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false)
        navigate('/')
    }

    return (
        <>
            <div>
                <EncabezadoFranjas title={"Recuperar Contraseña"}></EncabezadoFranjas>
                {isOpen && (
                    <div className="form-group" style={styles.modalOverlay}>
                        <div className='username-field' style={styles.modalContent}>
                            <h3>Confirmar Código</h3>
                            <input className="inp" placeholder='Digite el código recibido' type="text" value={enteredCode}
                                onChange={(e) => setEnteredCode(e.target.value)}
                            />
                            <div className='button-field' style={styles.actions} >
                                <button type="submit" className='btn' onClick={handleSubmit}>Confirmar</button>
                                <button className='btn' onClick={handleClose}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
            <SuccessModal
                show={showSuccessModal}
                handleClose={handleCloseSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
            />
        </>
    );
}

const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 5,
        boxShadow: "0px 0px 10px #333",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 20,
        marginRight: 20,
        backgroundColor: "#fff",
    },

};

export default ConfirmationCodeModal;
