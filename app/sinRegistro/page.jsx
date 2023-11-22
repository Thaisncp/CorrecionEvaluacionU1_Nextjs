'use client';
import React, { useState, useEffect } from 'react';
import { getToken } from '../componentes/hooks/SessionUtilClient';
import { ObtenerTodo } from '../componentes/hooks/Conexion';
import Link from 'next/link';

export default function Principal() {

    const [censos, setCensos] = useState([]);

    useEffect(() => {
        const ObtenerResgistros = async () => { //metodo nuevo
            try {
                const token = getToken();
                const url = `examen.php/?resource=unregistered_children`;
                const response = await ObtenerTodo(url, token);
                const resultado = response.info;
    
                setCensos(resultado);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        ObtenerResgistros();
    }, []);    

    return (
        <div className="row">
            <figure className="text-center" style={{marginTop: "80px"}}>
                <h1 style={{color: "purple"}}>LISTA DE NIÑOS NO CENSADOS</h1>
            </figure>
            <div className="container-fluid">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Nombres</th>
                            <th>Edad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {censos.map((auto, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{auto.nombres}</td>
                                <td>{auto.edad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};