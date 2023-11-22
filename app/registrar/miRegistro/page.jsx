'use client';
import React, { useState, useEffect } from 'react';
import { getToken } from '../../componentes/hooks/SessionUtilClient';
import { ObtenerTodo } from '../../componentes/hooks/Conexion';
import Link from 'next/link';

export default function MiRegistro() {

    const [censos, setCensos] = useState([]);

    useEffect(() => {
        const ObtenerResgistros = async () => { //metodo nuevo
            try {
                const token = getToken();
                const externalUsuario = obtenerExternalUsuario();  // Obtener el external del localStorage

                if (!externalUsuario) {
                    console.error("No se pudo obtener el external del usuario desde el sessionStorage");
                    return;
                }
                const url = `examen.php/?resource=census_children_login&external=${externalUsuario}`;
                const response = await ObtenerTodo(url, token);
                const resultado = response.info;
    
                setCensos(resultado);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        ObtenerResgistros();
    }, []);
    
    function obtenerExternalUsuario() {
        const external = sessionStorage.getItem('id');
        console.log("External obtenido:", external);
        return external;
    }
    

    return (
        <div className="row">
            <figure className="text-center">
                <h1 style={{color: "green", marginTop: "75px"}}>CENSOS REALIZADOS</h1>
            </figure>
            <div className="container-fluid">
                <div className="col-4">
                    <Link href="/registrar" className="btn btn-success">NUEVO</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Nombres</th>
                            <th>Edad</th>
                            <th>Talla</th>
                            <th>Peso</th>
                            <th>Escuela</th>
                            <th>Representante</th>
                            <th>Curso</th>
                            <th>EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {censos.map((censo, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{censo.nombres}</td>
                                <td>{censo.edad}</td>
                                <td>{censo.talla}</td>
                                <td>{censo.peso}</td>
                                <td>{censo.escuela}</td>
                                <td>{censo.representante}</td>
                                <td>{censo.curso}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Link href="/modificar/[external]" as={`/modificar/${censo.extrenal_censo}`} className="btn btn-outline-success btn-rounded">
                                            
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>

                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};