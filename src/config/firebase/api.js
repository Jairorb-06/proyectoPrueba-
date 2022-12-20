import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

export const saveAttendees = async (_tokenId, _account, _name, _email, _phone) => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  try {
    const docRef = await addDoc(collection(db, "attendees"), {
      tokenId:_tokenId,
      account:_account,
      name: _name,
      email: _email,
      phone: _phone,
      date: hoy,
    });
    return  docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAttendees = async () => {
  const colRef = collection(db, "attendees");
  const result = await getDocs(colRef);
  
  return result;
};

export const searchRegister = async (tokenId) => {
  const colRef = collection(db, "attendees");
  const result = await getDocs(colRef);
  const docs = [];
  result.forEach((doc)=>{
    docs.push({...doc.data(), id: doc.id})
  })
  
  const search = docs.find((n)=>
    n.tokenId===tokenId
  )
  if (search === undefined){
    return false
  }
    return  true
};


const fireBaseTime=(seconds, nanoseconds) => new Date(
  seconds * 1000 + nanoseconds / 1000000,
);

export const searchDateRegist = async(_tokenId, _account)=>{
  if(_tokenId !== '' && _account !== '' ){
    const colRef = collection(db, "attendees");
    const result = await getDocs(colRef);
    const docs = [];
    result.forEach((doc)=>{
      docs.push({...doc.data(), id: doc.id})
    })
    const search = docs.find((n)=>
      n.tokenId===_tokenId && n.account === _account
    )
    const dateRegister = fireBaseTime(search.date.seconds, search.date.nanoseconds)  
   
    // const date = dateRegister.toDateString();
    // const atTime = dateRegister.toLocaleTimeString();
    //  console.log(date, atTime);

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    
    // console.log(hoy)
    // console.log(dateRegister)

    const ayer= hoy.getTime() -86400000; // 24 horas
    const  otroTiempo=  hoy.getTime()- 36000000 //10 horas //10800000;   // 3 horas

    if(dateRegister < hoy && dateRegister > otroTiempo ){
      console.log("Correcto sigue! ");
      return true;
    }else{
    console.log("Tu registro no coincide");
    return 'false';
    }
  
  }
  return "Aun no se realiza el Sccaner"
  
}
