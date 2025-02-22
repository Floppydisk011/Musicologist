 

import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./remove.css";

const AddInstrumentQuantity = () => {

    const [instrumentId, setInstrumentId] = useState(0)
    const [quantity, setQuantity] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(instrumentId === null || instrumentId === undefined || instrumentId === 0){
            alert("Please enter a instrument id")
            return
        }
        let increase = {
            id: instrumentId,
            quantity: quantity
        }
        fetch("/api/increaseInstrument", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(increase)
        }).then(response => response.json()).then(data => {
            if(data.success){
                alert("Instrument quantity increased successfully")
            }
            else{
                alert("Attention: instrument quantity was not increased")
            }
        }).catch(error => {
            alert("Attention: instrument increasing failed")
        })
    }

    return (
        <div>
            <div className='remove'>
                    <div className="removeTitle">
                        <h1>Increase instrument Quantity</h1>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">instrument ID</h3>
                        <TextField id="outlined-number" onChange={(e) => setInstrumentId(e.target.value)} label="Instrument Id" type="number" InputLabelProps={{shrink: true,}}/>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">Quantity</h3>
                        <TextField id="outlined-number" onChange={(e) => setQuantity(e.target.value)} label="Quantity" type="number" InputLabelProps={{shrink: true,}}/>
                    </div>
                    <div className="remContainer">
                        <button id="cancelRemove">Cancel</button>
                        <button id='confirmRemove' onClick={HandleForm}>Confirm</button>
                    </div>
                </div>
        </div>
    );
}

export default AddInstrumentQuantity;
