import React from 'react';
import PropTypes from 'prop-types';


const Valija3Monazos = () => {
    return (
        <form>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th colSpan={11}>Pruebas realizadas antes del sorte<br/> Números favorecidos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Valija</th>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                        <td><input type={'text'}/></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};


Valija3Monazos.propTypes = {

};


export default Valija3Monazos;
