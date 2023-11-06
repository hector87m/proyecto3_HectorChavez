import { useState } from "react";
const datosPropiedad = [
  { tipo: "Casa", factor: 1.09 },
  { tipo: "P.H.", factor: 1.05 },
  { tipo: "Depto. Edificio", factor: 1.02 },
  { tipo: "Barrio Privado", factor: 1.19 },
  { tipo: "Oficina", factor: 2.39 },
  { tipo: "Local Comercial", factor: 1.41 },
  { tipo: "Depósito Logística", factor: 1.92 },
];
const datosUbicacion = [
  { tipo: "CABA", factor: 1.13 },
  { tipo: "Tandil", factor: 1.04 },
  { tipo: "Costa Atlántica", factor: 1.29 },
  { tipo: "Patagonia", factor: 1.0 },
];
export default function Index() {
  const [data, setData] = useState({
    fechaCotizacion: "",
    propiedad: "",
    factorPropiedad: 0,
    ubicacion: "",
    factorUbicacion: 0.0,
    metros2: 0.0,
    costoM2: 35.86,
    poliza: 0.0,
  });
  const [historial, setHistorial] = useState(
    JSON.parse(localStorage.getItem("historialCotizaciones")) || []
  );
  const cotizarPoliza = () => {
    const poliza =
      data.factorPropiedad * data.factorUbicacion * data.metros2 * data.costoM2;
    setData({
      ...data,
      poliza: poliza.toFixed(2),
      fechaCotizacion: new Date().toLocaleDateString(),
    });
    guardarHistorial();
  };
  const setFactorPropiedad = (e) => {
    setData({
      ...data,
      factorPropiedad: e.target.value,
      propiedad: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
    });
  };
  const setFactorUbicacion = (e) => {
    setData({
      ...data,
      factorUbicacion: e.target.value,
      ubicacion: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
    });
  };
  const setFactorMt2 = (e) => {
    setData({ ...data, metros2: e.target.value });
  };
  const guardarHistorial = () => {
    console.log(historial);
    setHistorial([...historial, data]);
    localStorage.setItem("historialCotizaciones", JSON.stringify(historial));
  };
  return (
    <div>
      {" "}
      <div className="historial">
        <a href="Historial">
          <span title="Ver Historial">📋</span>
        </a>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className=" center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select defaultValue="" id="propiedad" onChange={setFactorPropiedad}>
          <option value="" disabled>
            {" "}
            ...{" "}
          </option>
          {datosPropiedad.map(({ factor, tipo }, id) => (
            <option key={id} value={factor}>
              {tipo}
            </option>
          ))}
        </select>
        <label htmlFor="ubicacion">Selecciona su ubicación</label>
        <select defaultValue="" id="ubicacion" onChange={setFactorUbicacion}>
          <option value="" disabled>
            {" "}
            ...{" "}
          </option>
          {datosUbicacion.map(({ factor, tipo }, id) => (
            <option key={id} value={factor}>
              {tipo}
            </option>
          ))}
        </select>
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          onChange={setFactorMt2}
          type="number"
          id="metros2"
          min="20"
          max="500"
          required
        />
        <div className="center separador">
          <button onClick={cotizarPoliza} className="button button-outline">
            Cotizar
          </button>
        </div>
        <div className="center separador">
          <p className="importe">
            Precio estimado: $<span id="valorPoliza">{data.poliza}</span>
            <span className="guardar ocultar" title="Guardar en historial">
              💾
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
