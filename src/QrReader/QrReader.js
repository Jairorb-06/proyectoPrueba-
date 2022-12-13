import React, { useState } from "react";
 import QrScan from '../../node_modules/react-qr-reader'
 import { Link } from "react-router-dom";
// import QrScan from 'react-qr-reader';
// import { QrReader } from 'react-qr-reader';

const QrReader = () => {

    const modalStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
      const [qrscan, setQrscan] = useState('No result');
    const handleScan = data => {
        if (data) {
            setQrscan(data)
            console.log(data)
        }
    }
    const handleError = err => {
    console.error(err)
    }

  return (
    <div style={modalStyles}>
        <div class="d-grid gap-2 d-md-flex justify-content-md">
        <Link to="/">
            <button class="btn btn-outline-primary btn-sm" type="button">Regresar</button>
        </Link>
        </div>
      <h1>QR Scanner</h1>
      <div style={{ marginTop:30}}>                
                 <QrScan
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: 240, width: 320 }}
                /> 
            </div>
        
      <textarea className="form-control"  rows="4"
      style={{fontSize:18, width:340, height:100, marginTop:100}}
       defaultValue={qrscan}
       value={qrscan}
      />
    </div>
  );
};

export default QrReader;
