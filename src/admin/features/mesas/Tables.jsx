import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TitlePage from '../../../ui/TitlePage/TitlePage.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Table.css'


const mesasIniciales = [
  { id: 1, numero: 1, capacidad: 4, estado_actual: 'libre' },
  { id: 2, numero: 2, capacidad: 6, estado_actual: 'ocupada' },

];

function Tables() {
  const [mesas, setMesas] = useState(mesasIniciales);
  const [modalVisible, setModalVisible] = useState(false);
  const [mesaActual, setMesaActual] = useState({ id: '', numero: '', capacidad: '', action: 'add' });

  const abrirModal = (mesa = { id: '', numero: '', capacidad: '', action: 'add' }) => {
    setMesaActual({ ...mesa, action: mesa.id ? 'edit' : 'add' });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setMesaActual({ id: '', numero: '', capacidad: '', action: 'add' });
    setModalVisible(false);
  };

  const guardarMesa = (e) => {
    e.preventDefault();
    if (mesaActual.action === 'add') {
      const nuevaMesa = {
        id: Date.now(),
        numero: mesaActual.numero,
        capacidad: mesaActual.capacidad,
        estado_actual: 'libre',
      };
      setMesas([...mesas, nuevaMesa]);
    } else {
      setMesas(
        mesas.map((m) => (m.id === mesaActual.id ? { ...mesaActual, estado_actual: m.estado_actual } : m))
      );
    }
    cerrarModal();
  };

  const eliminarMesa = (id) => {
    if (window.confirm('¿Eliminar mesa?')) {
      setMesas(mesas.filter((m) => m.id !== id));
    }
  };

  return (
    <>
     <TitlePage />

    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><i className="fas fa-chair me-2"></i>Gestión de Mesas</h2>
        <button className="btn btn-danger" onClick={() => abrirModal()}>
          <i className="fas fa-plus me-2"></i>Nueva Mesa
        </button>
      </div>

      <div className="row">
        {mesas.map((mesa) => (
          <div key={mesa.id} className="col-md-3 col-sm-6 mb-4">
            <div className={`card mesa-card ${mesa.estado_actual === 'ocupada' ? 'border-danger' : 'border-success'}`}>
              <div className="card-body text-center">
                <div className="mesa-icon mb-3">
                  <i className={`fas fa-chair fa-2x ${mesa.estado_actual === 'ocupada' ? 'text-danger' : 'text-success'}`}></i>
                </div>
                <div id='card'>

                <h5 className="card-title">Mesa {mesa.numero}</h5>
                <p className="card-text">
                  <i className="fas fa-users me-1"></i>{mesa.capacidad} personas
                </p>
                </div>
                <span className={`badge ${mesa.estado_actual === 'ocupada' ? 'bg-danger' : 'bg-success'} mb-3`}>
                  {mesa.estado_actual.charAt(0).toUpperCase() + mesa.estado_actual.slice(1)}
                </span>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => abrirModal(mesa)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  {mesa.estado_actual === 'libre' && (
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarMesa(mesa.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={guardarMesa}>
                <div className="modal-header">
                  <h5 className="modal-title">Mesa</h5>
                  <button type="button" className="btn-close" onClick={cerrarModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Número de Mesa</label>
                    <input
                      type="number"
                      className="form-control"
                      value={mesaActual.numero}
                      onChange={(e) => setMesaActual({ ...mesaActual, numero: e.target.value })}
                      required
                      min="1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Capacidad</label>
                    <input
                      type="number"
                      className="form-control"
                      value={mesaActual.capacidad}
                      onChange={(e) => setMesaActual({ ...mesaActual, capacidad: e.target.value })}
                      required
                      min="1"
                      max="20"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                  <button type="submit" className="btn btn-danger">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Tables;
