import { useState } from "react";

const ParticipantesDropdown = ({ participantes, value, label, setParticipanteForm }) => {
    const [selected, setSelected] = useState(value);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setSelected(selectedValue);
        setParticipanteForm(label, selectedValue);
    };

    return (
        <select
            className="form-select form-select-sm"
            onChange={handleChange}
            value={selected}
        >
            <option value="">Seleccione</option>
            {participantes.map((participante) => (
                <option key={participante} value={participante}>
                    {participante}
                </option>
            ))}
        </select>
    );
}

export default ParticipantesDropdown;