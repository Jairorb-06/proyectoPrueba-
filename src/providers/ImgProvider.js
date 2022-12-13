import React, { useContext, useState, useEffect } from "react";

import { db } from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import useGetColection from "../config/firebase/getColection";

const imgContext = React.createContext();
const imgToggleContext = React.createContext();

export function useImgContext() {
  return useContext(imgContext);
}

export function useImgToggleContext() {
  return useContext(imgToggleContext);
}

const ImgProvider = (props) => {
  const [links, setLinks] = useState([]);

  const getImages = async () => {
    const querySnapshot = await getDocs(collection(db, "Images"));
    const docs = [];
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      docs.push({ ...doc.data(), id: doc.id });
    });
    setLinks(docs.filter((link) => link.mint !== true));
    //  setLinks(links.filter((link)=>link.mint !== true));
  };

  useEffect(() => {
    getImages();
  }, []);

  const update = async (id) => {
    const document = doc(db, "Images", id);
    await updateDoc(document, {
      mint: true,
    })
      .then(() => {
        // setLinks(links.filter((link)=>link.mint.toString !== "true"));
        setLinks(links.filter((link) => link.id !== id));
        //  console.log(links);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  
  /* const onDeleteLink = async (id) => {
    await deleteDoc(doc(db, "Images", id));
    // await db.collection('Images').doc(id).delete();
    //console.log(id)
    setLinks(links.filter((link) => link.id !== id));
  };  */

  return (
    <imgContext.Provider value={links}>
      <imgToggleContext.Provider value={update}>
        {props.children}
      </imgToggleContext.Provider>
    </imgContext.Provider>
  );
};

export default ImgProvider;
