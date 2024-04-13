import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form: {
      alitas: '',
      descripcion: '',
      piezas: '',
      precio: ''
    },
    id: 0
  };

  peticionGet = () => {
    firebase.child("alitas").on("value", (alitas) => {
      if (alitas.val() !== null) {
        this.setState({ ...this.state.data, data: alitas.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionPost=()=>{
    firebase.child("alitas").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }

  peticionPut=()=>{
    firebase.child(`alitas/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }

  peticionDelete=()=>{
    if(window.confirm(`Estás seguro que deseas eliminar las alitas ${this.state.form && this.state.form.alitas}?`))
    {
    firebase.child(`alitas/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarAlitas=async(alitas, id, caso)=>{

    await this.setState({form: alitas, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
      <div className="App">
        <br />
        <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>
        <br />
        <br />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Alitas</th>
              <th>Descripción</th>
              <th>Piezas</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].alitas}</td>
                <td>{this.state.data[i].descripcion}</td>
                <td>{this.state.data[i].piezas}</td>
                <td>{this.state.data[i].precio}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>this.seleccionarAlitas(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={()=>this.seleccionarAlitas(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                </td>

              </tr>
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Alitas: </label>
          <br />
          <input type="text" className="form-control" name="alitas" onChange={this.handleChange}/>
          <br />
          <label>Descripción: </label>
          <br />
          <input type="text" className="form-control" name="descripcion" onChange={this.handleChange}/>
          <br />
          <label>Piezas: </label>
          <br />
          <input type="text" className="form-control" name="piezas" onChange={this.handleChange}/>
          <br />
          <label>Precio: </label>
          <br />
          <input type="text" className="form-control" name="precio" onChange={this.handleChange}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>



    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>Editar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Alitas: </label>
          <br />
          <input type="text" className="form-control" name="alitas" onChange={this.handleChange} value={this.state.form && this.state.form.alitas}/>
          <br />
          <label>Descripción: </label>
          <br />
          <input type="text" className="form-control" name="descripcion" onChange={this.handleChange} value={this.state.form && this.state.form.descripcion}/>
          <br />
          <label>Piezas: </label>
          <br />
          <input type="text" className="form-control" name="piezas" onChange={this.handleChange} value={this.state.form && this.state.form.piezas}/>
          <br />
          <label>Precio: </label>
          <br />
          <input type="text" className="form-control" name="precio" onChange={this.handleChange} value={this.state.form && this.state.form.precio}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>
      </div>
    );
  }
}

export default App;
