// npm create vite@latest sqlc-quickstart
// cd sqlc-quickstart && npm install @sqlitecloud/drivers

// import { useEffect, useState } from "react";
// import { Database } from "@sqlitecloud/drivers";

// const db = new Database(
//   "sqlitecloud://cuiftdyahz.g5.sqlite.cloud:8860/foragend.sqlite?apikey=TboyodLuMtoROrC4vTheQyjW0oGQDi7IX5ibB9bJLHQ"
// );

// export default function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const result = await db.sql`SELECT * FROM doctores;`;
//       setData(result);
//     };

//     getData();
//   }, []);

//   return (
//     <div>
//       <h2>Lista de Doctores</h2>
//       {data.length === 0 ? (
//         <p>No hay doctores disponibles.</p>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "1.5rem",
//             justifyContent: "center",
//           }}
//         >
//           {data.map((doctor) => (
//             <div
//               key={doctor.id}
//               style={{
//                 border: "1px solid #e2e8f0",
//                 borderRadius: "16px",
//                 boxShadow: "0 4px 16px rgba(102,126,234,0.08)",
//                 padding: "1.5rem",
//                 minWidth: "260px",
//                 maxWidth: "320px",
//                 background: "#fff",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//               }}
//             >
//               <div
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "1.1rem",
//                   marginBottom: "0.5rem",
//                 }}
//               >
//                 {doctor.nombre}
//               </div>
//               <div>
//                 <strong>Especialidad:</strong> {doctor.especialidad}
//               </div>
//               <div>
//                 <strong>Consultorio:</strong> {doctor.consultorio}
//               </div>
//               <div>
//                 <strong>ID Público:</strong> {doctor.id_publico}
//               </div>
//               <div
//                 style={{
//                   marginTop: "0.5rem",
//                   color: "#718096",
//                   fontSize: "0.95rem",
//                 }}
//               >
//                 {/* <strong>ID interno:</strong> {doctor.id} */}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

export default function ConsultaPruebaMedico() {
  return (
    <h1>
      Hola, esta es una prueba de conexión a la base de datos SQLite Cloud
    </h1>
  );
}
