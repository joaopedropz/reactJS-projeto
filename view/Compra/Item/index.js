import {React} from 'react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';
import { api } from '../../../config';

export const Item = (props) => {
    

    const [data, setData] = useState([]);

    

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/produto/"+id+"/compra")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
                
            })
    }
    useEffect(() => {
        getItens();
    }, [id]);
    return (
        <div>
            <Container>
                <div>
                    <h1>Produtos no carrinho</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ServicoId}>
                                <td> {item.CompraId} </td>
                                <td> {item.quantidade}</td>
                                <td> {item.valor}</td>
                                <td className="text-center/"> 
                                <Link to={"/listar-produto/"+item.id}
                                className="btn btn-outline-primary btn-sm">
                                    Consultar
                                </Link>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
}