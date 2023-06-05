import React, { useState } from 'react'
import { getEmailSorteo } from '../../../services/axiosService';
import ConfirmationModal from '../../modals/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../modals/SuccessModal';
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";

const Reportes = () => {

    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });
    const lottery = JSON.parse(sessionStorage.getItem('lottery'));
    const idInterno = lottery?.idInterno;
    const navigate = useNavigate();

    function handleCloseFailModal() {
        setShowFailModal(false);
    }
    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/ChooseLottery');      // Redirect to the next page
    }
    const handleConfirmation = async (confirmed) => {
        if (!confirmed) {
            setShowConfirmation(false);
            return;
        }
        await confirmationAction();
        setShowConfirmation(false);
    }

    const handleShowConfirmation = async (action) => {
        setShowConfirmation(true);
        setConfirmationAction(() => () => {
            action();
        });
    }

    const handleSubmit = async () => {
        try {
            setShowLoadingModal(true);
            const response = await getEmailSorteo(idInterno);
            if (response.status === 200) {
                setShowLoadingModal(false);
                setTitulo('Reporte enviado');
                setMensaje('El reporte se ha enviado al correo con éxito');
                setShowSuccessModal(true);
            }
        } catch (error) {
            setShowLoadingModal(false);
            setTitulo('Error');
            setMensaje('Ha ocurrido un error al enviar el reporte al correo');
            setShowFailModal(true);
        }
    }
    return (
        <>
            <div>
                <button onClick={
                    async () => {
                        await handleShowConfirmation(handleSubmit);
                    }
                } type="submit" className="btn" >Obtener Reporte </button>
                <br></br>
            </div>
            <SuccessModal
                show={showSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseSuccessModal}
            />
            <LoadingModal
                show={showLoadingModal}
                titulo='Enviando reporte al correo'
                mensaje='Por favor espere...'
            />
            <FailModal
                show={showFailModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseFailModal}
            />
            <ConfirmationModal
                show={showConfirmation}
                titulo='Confirmación'
                mensaje='¿Está seguro que desea enviar el reporte al correo?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
}

export default Reportes;