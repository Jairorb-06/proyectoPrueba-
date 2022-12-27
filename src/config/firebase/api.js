import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const saveAttendees = async (
  _tokenId,
  _account,
  _name,
  _identification,
  _email,
  _phone
) => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  try {
    const docRef = await addDoc(collection(db, "attendees"), {
      tokenId: _tokenId,
      account: _account,
      name: _name,
      identification:_identification,
      email: _email,
      phone: _phone,
      date: hoy,
      state: false,
    });
    return `Usuario registrado con idDoc: ${docRef.id} `;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAttendees = async () => {
  const colRef = collection(db, "attendees");
  const result = await getDocs(colRef);

  return result;
};
const fireBaseTime = (seconds, nanoseconds) =>
  new Date(seconds * 1000 + nanoseconds / 1000000);

export const searchRegister = async ( _tokenId , _account ) => {
  if (_tokenId !== "" && _account !== "") {
    const colRef = collection(db, "attendees");
    const result = await getDocs(colRef);
    const docs = [];
    result.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    })
    // console.log(_tokenId, _account)
    const search = docs.find(
      (n) => n.tokenId === _tokenId && n.account === _account
    );
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const ayer = hoy.getTime() - 86400000; // 24 horas
    // const otroTiempo = hoy.getTime() - 36000000; //10 horas //10800000;   // 3 horas
    if(search !== undefined){
      const dateRegister =  fireBaseTime(search.date.seconds, search.date.nanoseconds);
      if(dateRegister < hoy && dateRegister > ayer ){
        console.log("Correcto! ");
        return true;
      }
    }
    console.log("Tu registro no coincide");
    return false;
  }
  return "Cargando..";
};

export const searchIdName = async (_tokenId, _account) =>{
  if (_tokenId !== "" && _account !== "") {
    const colRef = collection(db, "attendees");
    const result = await getDocs(colRef);
    const docs = [];
    result.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    })
    const search = docs.find(
      (n) => n.tokenId === _tokenId && n.account === _account
    );
    
    if(search !== undefined){
      return {identification:search.identification, name:search.name}
    }
    return 'No se encuentra registro!';
  }
  return "Cargando..";
}


