 
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import "./addInstrument.css";

const AddInstrument = () => {

    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];

      const [base64Image,setBase64Image] = useState(null);
      const [selectedImage, setSelectedImage] = useState(null);
      const [instrumentName, setInstrumentName] = useState(null);
      const [price, setPrice] = useState(null);
      const [description,setDescription] = useState("none");
      const [feedback, setFeedback] = useState(0);
      const [brand, setBrand] = useState(null);
      const [dimensions,setDimensions] = useState(null);
      const [weight, setWeight] = useState(null);
      const [quantity, setQuantity] = useState(0);
      const [category, setCategory] = useState(1);

      const handleChange = (event) => {
        setCategory(event.target.value);
      };
    
    const handleImageChange = (event) => {
      const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setSelectedImage(file);
      setBase64Image(reader.result);
    };
    
    reader.readAsDataURL(file);
    };  

    const handleForm = (event) => {
      event.preventDefault();
      let instrumentData = {
        name: instrumentName,
        price: price,
        description: description,
        feedback: feedback,
        brand: brand,
        dimensions: dimensions,
        weight: weight,
        quantity: quantity,
        image: base64Image,
        category: category
      }
      fetch('/api/setInstrument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instrumentData)
      }).then(response => response.json()).then(data => {
        if(data.success){
            alert('Instrument posted successfully')
        }
        else{
            alert("Attention: Instrument not posted")
        }
      }).catch(error => {
        console.log(error)
      })
    }

  return (
    <div>
        <div className='instrumentUpload'>
                    <div className="instrumentTitle">
                        <h1>Sell a Instrument</h1>
                    </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentName">Name Instrument</h3>
                        <TextField id="outlined-basic" className="field" label="Instrument Name" variant="outlined" onChange={(e) => setInstrumentName(e.target.value)}/>
                    </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentPrice">Price</h3>
                        <TextField id="outlined-basic" className="field" label="Instrument Price" variant="outlined" onChange={(e) => setPrice(e.target.value)}/>
                        <TextField
                              id="outlined-select-currency-native"
                              className='currencySelector'
                              select
                              label="Currency"
                              defaultValue="EUR"
                              SelectProps={{
                                native: true,
                              }}
                            >
                              {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                          </TextField>                    
                      </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentDescription">Description</h3>
                        <TextField id="outlined-multiline-static" label="Description" multiline rows={5} defaultValue="none" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="instrumentContainer">
                      <Typography component="legend" className="instrumentFeedback">Feedback (set up by customers)</Typography>
                      <Rating name="disabled" value={feedback} disabled />
                    </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentBrand">Brand</h3>
                        <TextField id="outlined-basic" className="field" label="Brand" variant="outlined" onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentDimensions">Dimensions</h3>
                        <TextField id="outlined-basic" className="field" label="Dimensions" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setDimensions(e.target.value)} InputProps={{startAdornment: <InputAdornment position="start">cm</InputAdornment>,}}/>
                    </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentWeight">Weight</h3>
                        <TextField id="outlined-basic" className="field" label="Weight" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setWeight(e.target.value)} InputProps={{startAdornment: <InputAdornment position="start">kg</InputAdornment>,}}/>
                    </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentQuantity">Quantity</h3>
                        <TextField id="outlined-basic" className="field" label="Quantity" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentImage">Image</h3>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          />
                    </div>
                    <div className="instrumentContainer">
                        <h3 className="instrumentCategory">Category</h3>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                          >
                            <MenuItem value={1}>Pianos</MenuItem>
                            <MenuItem value={2}>Strings</MenuItem>
                            <MenuItem value={3}>Woodwinds</MenuItem>
                            <MenuItem value={4}>Brass</MenuItem>
                            <MenuItem value={5}>Percussions</MenuItem>
                          </Select>
                    </div>
                    <div className="instrumentContainer">
                        <button id="cancelInstrument">Cancel</button>
                        <button id='confirmInstrument' onClick={handleForm}>Confirm</button>
                    </div>
                </div>
    </div>
  );
};

export default AddInstrument;
