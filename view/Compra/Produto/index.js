import { React,useState,ValorInput } from 'react'
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {api} from "../../../config"
export const Cadastrar = () => {

    const [produto, setProduto] = useState({
        nome:'',
        descricao:''
    });

    const[status,setStatus] = useState({
        type:'',
        message:''
    });

    const valorInput = e => setProduto({
        ...produto,[e.target.name]: e.target.value
    })

    const cadProduto = async e =>{
        e.preventDefault();
        console.log(produto);

        const headers = {
            'Content-Type':'application/json'
        }
        await axios.post(api+"/produto",produto,{headers})
        .then ((response)=>{
           
            if (response.data.error){
                setStatus({
                    type:'error',
                    message: response.data.message
                })
            } else{
                setStatus({
                    type:'success',
                    message:response.data.message
                })
            }
        })
        .catch(()=>{
            console.log("Erro:Sem conexão com a API.")
        })
    }
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Confirmar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="listar-produto"
                        className="btn btn-outline-success btn-sm">Produtos</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>: ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert>: ""}

            <Form className="p-2" OnSubmit={cadServico}>
                <FormGroup className="p-2">
                    <Label >
                        Nome
                    </Label>
                    <Input

                        name="nome"
                        placeholder="Nome do Produto"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Descrição
                    </Label>
                    <Input

                        name="descricao"
                        placeholder="Descrição do Produto"
                        type="text"
                        onChange={ValorInput}
                    />
                </FormGroup>

                <Button type="submit" outline-color="success">
                    Confirmar Compra
                </Button>
            </Form>
        </Container>

    );
};