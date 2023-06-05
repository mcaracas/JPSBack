import React, { useState, useEffect } from 'react'
import SuccessModal from '../../modals/SuccessModal';
import ConfirmationModal from '../../modals/ConfirmationModal';
import FailModal from "../../modals/FailModal";
import { getPremios } from '../../../services/axiosService';
import { useNavigate } from 'react-router-dom';

const Inventario = ({ fecha, sorteo }) => {
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [premios, setPremios] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });

    function handleCloseFailModal() {
        setShowFailModal(false);
    }

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/ResultadosLoteriaFisica');
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

    async function getPremioLoteria() {
        try {
            const response = await getPremios();
            console.log(response.data);
            const filteredData = response.data.filter((item) => item.idPlan === 1);
            console.log(filteredData);
            setPremios(filteredData);
        }
        catch (error) {
            setTitulo('Operación fallida');
            setMensaje('No se pudo cargar los premios');
            setShowSuccessModal(true);
            console.log(error);
        }
    }

    useEffect(() => {
        const usuario = sessionStorage.getItem('name');
        if (!usuario) {
            sessionStorage.clear();
            navigate('/');
        }
        getPremioLoteria();
    }, []);

    function TablaPremios() {
        return (
            <table className='table table-bordered table-responsive'>
                <thead>
                    <tr>
                        <th colSpan="3">Bolitas de premios</th>
                    </tr>
                    <tr>
                        <th>Cantidad</th>
                        <th>Premio</th>
                        <th> Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {premios.map((item) => (
                        <tr key={item.id}>
                            <td>{item.cantidadPremios}</td>
                            <td>¢ {item.montoUnitario}</td>
                            <td>{item.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        );
    }
    //ver monto <td colSpan="3"><b>¢ {premios.reduce((a, b) => a + (b['montoUnitario'] || 0), 0)}</b></td>
    return (
        <>
            <div className="fiscalizacion-containerS1">
                <div className="fiscalizacion-header">
                    <b>JUNTA DE PROTECCION SOCIAL</b>
                    <br />
                    <b>AUDITORÍA INTERNA</b>
                    <br />
                    <b>INVENTARIO</b>
                    <br />
                    <b>SORTEO: {sorteo}</b>
                    <br />
                    <b>{fecha}</b>
                </div>
                <div>
                    {TablaPremios()}
                </div>
                <br />
                <button className="btn btn-primary" onClick={() => {
                    handleShowConfirmation(async () => {
                        try {
                            navigate('/ResultadosLoteriaFisica');
                            setTitulo('Operación exitosa');
                            setMensaje('Se ha guardado el inventario');
                            setShowSuccessModal(true);
                        }
                        catch (error) {
                            setTitulo('Operación fallida');
                            setMensaje('No se pudo guardar el inventario');
                            setShowFailModal(true);
                        }
                    });
                }}>Continuar</button>
            </div>
            <SuccessModal
                show={showSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseSuccessModal}
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
                mensaje='¿Desea continuar?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
};

export default Inventario;