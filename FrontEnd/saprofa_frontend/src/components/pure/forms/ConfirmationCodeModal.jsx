import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { updatePassword } from '../../../services/axiosService';
import EncabezadoFranjas from '../EncabezadoFranjas';
function ConfirmationCodeModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [enteredCode, setEnteredCode] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const code = location.state.code;
    const username = location.state.username;

    function handleClose() {
        setIsOpen(false);
        navigate('/');
    }

    function handleConfirm() {
        console.log(code);
        if (enteredCode === code) {
            alert("Se enviará un correo con la nueva contraseña.");

            navigate('/');
            return true;
        } else {
            alert("El código no coincide.");
            return false;
        }
    }
    return (
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
                            <button type="submit" className='btn' onClick={
                                async () => {
                                    try {
                                        if (handleConfirm()) {
                                            await updatePassword(username);
                                        }
                                    } catch (error) {
                                        if (error.response.status === 500) {
                                            console.log('Server error:', error);
                                        }
                                    }
                                }
                            }>Confirmar</button>
                            <button className='btn' onClick={handleClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
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
