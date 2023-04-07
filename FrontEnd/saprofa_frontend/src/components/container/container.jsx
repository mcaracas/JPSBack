import React from 'react';
import Sidebar from './sidebar';

const Container = ({ component }) => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="row-fluid d-flex" style={{ width:'100%' }}>
                    <div className="col-md-2">
                        <Sidebar></Sidebar>
                    </div>
                    <div className="col-md-10">
                        {component}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Container;
