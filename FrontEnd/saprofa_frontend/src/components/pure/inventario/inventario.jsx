import React, { useState, useEffect } from 'react'
import SuccessModal from '../../modals/SuccessModal';
import ConfirmationModal from '../../modals/ConfirmationModal';
import LoadingModal from "../../modals/LoadingModal";
import FailModal from "../../modals/FailModal";
import { getPremios } from '../../../services/axiosService';
import { useNavigate } from 'react-router-dom';

const Inventario = ({ idSorteo, fecha, sorteo }) => {
    const [titulo, setTitulo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [premios, setPremios] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(() => { });

    function handleCloseFailModal() {
        setShowFailModal(false);
    }
    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
        navigate('/');
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
    const initialValues = {
        cantidadPremios: 0,
        montoUnitario: 0,
        descripcion: ''
    };


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
        }
    }

    useEffect(() => {
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
                            <td>
                                <button className="btn btn-danger" onClick={() => {
                                    const newPremios = premios.filter(premio => premio.id !== item.id);
                                    setPremios(newPremios);
                                }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td><b>Total: {premios.reduce((a, b) => a + (b['cantidadPremios'] || 0), 0)}</b></td>
                        <td colSpan="3"><b>¢ {premios.reduce((a, b) => a + (b['montoUnitario'] || 0), 0)}</b></td>
                    </tr>
                </tfoot>
            </table>
        );
    }
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
                    <button className="btn" onClick={() => {
                        const id = premios.length + 1;
                        const nuevaFila = { id: id, cantidadPremios: 1, montoUnitario: 0, descripcion: "" };
                        setPremios([...premios, nuevaFila]);
                    }}>Agregar fila</button>

                </div>
                <br />

            </div>
            <SuccessModal
                show={showSuccessModal}
                titulo={titulo}
                mensaje={mensaje}
                handleClose={handleCloseSuccessModal}
            />
            <LoadingModal
                show={showLoadingModal}
                titulo='Guardando Marchamos'
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
                mensaje='¿Está seguro que desea registrar las pruebas?'
                handleConfirmation={handleConfirmation}
            />
        </>
    );
};

export default Inventario;