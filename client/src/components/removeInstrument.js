 
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./remove.css";

const RemoveInstrument = () => {

    const [instrumentId, setInstrumentId] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(instrumentId === null || instrumentId === undefined || instrumentId === 0){
            alert("Please enter a instrument id")
            return
        }
        let remove = {
            id: instrumentId
        }
        fetch("/api/removeInstrument", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(remove)
        }).then(response => response.json()).then(data => {
            if(data.success){
                alert("Instrument removed successfully")
            }
            else{
                alert("Attention: instrument delete failed")
            }
        }).catch(error => {
            alert("Attention: instrument delete failed")
        })
    }
    
    return (
        <div>
            <div className='remove'>
                    <div className="removeTitle">
                        <h1>Remove a instrument</h1>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">instrument ID</h3>
                        <TextField
          id="outlined-number"
          onChange={(e) => setInstrumentId(e.target.value)}
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
                    </div>
                    <div className="remContainer">
                        <button id="cancelRemove">Cancel</button>
                        <button id='confirmRemove' onClick={HandleForm}>Confirm</button>
                    </div>
                </div>
        </div>
    );
}

export default RemoveInstrument;
