import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import {saveAttendees, getAttendees} from '../config/firebase/api'
import { useImgContext } from '../providers/ImgProvider';

const ModalReg = ({ tokenId, account, estado, cambiarEstado, setGenQr, setRegisterId }) => {  

  const [user, setUser] = useState({
    name:"",
    email:"",
    phone:"",
  })

  const handleChange = (e)=>
  {
    const { name, value} = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
  }));
 
  }
  const handleSubmit = async e =>{
    e.preventDefault();
    cambiarEstado(false)
    setGenQr(true)

    setRegisterId(await saveAttendees(tokenId, account, user.name, user.email, user.phone))
    setUser({
      name:"",
      email:"",
      phone:"",
    })
  }

  const getAsistentes =async ()=>{
    const delet = await getAttendees();
    console.log(delet.docs[0].data())
  }

  return (
    <>
      {estado && (
        <Modal isOpen={estado} >
          
          <ModalHeader>
            Registro &nbsp; &nbsp; &nbsp;
            <button
              type="button"
              className="btn-close"
              onClick={() => cambiarEstado(false)}
            ></button>
          </ModalHeader>
          <ModalBody> 
          <form onSubmit={handleSubmit} >
            <Label htmlFor='name'>Nombre</Label>
            <Input name='name' value={user.name} onChange={handleChange}  placeholder='Ingrese nombre y apellido' required/>
            <Label htmlFor='email'>Email</Label>
            <Input type="email" name='email' placeholder='Yourmail@mail.com' value={user.email} onChange={handleChange} required></Input>
            <Label htmlFor='text'>Celular</Label>
            <Input type="text" name='phone' placeholder='Ingrese su  número de celular' value={user.phone} onChange={handleChange} required></Input>
            <Button type='submit' className="btn btn-outline-primary btn-sm">Generar</Button>
            
          </form>     
                
          </ModalBody>
          
        </Modal>
      )}
      {/* <button onClick={getAsistentes} type="button">Asistentes</button> */}
    </>
  );
}

export default ModalReg