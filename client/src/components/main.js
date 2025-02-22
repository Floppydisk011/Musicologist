 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instrumentTrailer from './musicologist.mp4';
import aboutVideo from './musicologist.mp4';
import './main.css';
import CardNew from './card_new';
import Twitter from './twitter_icon.png';
import Instagram from './instagram_icon.png';
import YouTube from './youtube_icon.png';

function Main_page(){

    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch("/api/home");

                if (response.status === 500) {
                    throw new Error("Fetching data failed");
                }

                const JSONData = await response.json();
                setData(JSONData.data.oggetti);
                console.log(data);
                console.log(loading);
                setLoading(false);
            
            }catch(err){
                console.log("Error: ", err)
                setLoading(false)
            }
        }

        fetchData()
        
    },[])

    function handleForm(event){
        event.preventDefault()
        let mailData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        }
        fetch("api/contact", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(mailData)
        }).then(response => response.json()).then(data => {
            alert("Thank you for contacting us for assistance. We are here to help you and will do our best to answer your questions and solve any problems you may have.")
            navigate("/")
        })

    }
    
    return(
        <div className="main_containers">
            <div className="first_container">
                <div className="title_container">
                    <h1 id="title">Welcome to Musicologist</h1>
                    <h3 id="subtitle">Where you can find the instrument that you are searching</h3>
                    <div id="visit_shop">
                         <a id="shop_button" href="/shop">
                            Shop
                        </a>
                    </div>
                   
                </div>
                <video id="video" src={instrumentTrailer} autoPlay loop controls>
                    Your browser does not support the video tag
                </video>
            </div>
            <div className="second_container">
                <h1 id="second_title">Last Instruments</h1>
                <div className='Cards_container'>
                    {data ? (
                        data.map(item => (
                            <CardNew 
                            id={item.id}
                            title={item.name}
                            price={item.price}
                            description={item.desc} 
                            immagine={`data:image/jpeg;base64, ${item.picture}`}
                            />
                        ))
                    ):(
                        <p>Nessun Dato Disponibile</p>
                    )}
                </div>
            </div>
            <div className="third_container" id="about_container">
                <div className="about">
                    <h1 id="about_title">About Us </h1>
                    <p id="about_subtitle">
                    Welcome to Musicologist, the ultimate destination for musicians and music enthusiasts! <br></br> 
                    We are a passionate e-commerce platform dedicated to providing artists of all levels with everything they need to express their creativity. <br></br>
                    <br></br>
                    From high-quality instruments and accessories to renowned music brands, we strive to offer a wide selection of products that cater to every musician's needs. <br></br>
                    Whether you're a beginner looking for your first instrument or a professional seeking top-tier equipment, Music Haven has got you covered. <br></br>
                    
                    Our mission is to make purchasing musical instruments a seamless, secure, and inspiring experience. <br></br>
                    With our user-friendly website and intuitive navigation, you can easily find what you're looking for. <br></br>
                    We also provide detailed product descriptions and user reviews to help you make informed decisions and find the perfect instrument for your journey. <br></br>
                </p>
                </div>
                <video id="video" src={aboutVideo} autoPlay loop controls>
                    Il tuo browser non supporta il tag video
                </video>
            </div>
            <div className="fourth_container" id="contact_container">
                <div className="left_container">
                    <h1 className="left_title">Follow Us</h1>
                    <div className="social_buttons">
                        <div className="buttons_container">
                            <a id="twitter_button" href="https://x.com/Musicologi2315">
                                <img src={Twitter} alt="twitter"/>
                            </a>
                            <a id="instagram_button" href="https://www.instagram.com/mus_icologist/">
                                <img src={Instagram} alt="instagram"/>
                            </a>
                            <a id="youtube_button" href="https://www.youtube.com/@Musicologist-s3o">
                                <img src={YouTube} alt="youtube"/>
                            </a>
                        </div>
                    </div>
                    <p id="bottom_info">Via Aleotti 26, 43124, Parma (PR)</p>
                    <p id="authorInfo">Made by: Davide Faroldi Lo Presti</p>
                </div>
                <div className="right_container">
                    <h1 className="right_title">Contact Us</h1>
                    <div className="contact_us_container" >
                        <h3 className="cont">Name: <input id="nameField" title="Name" type="text" onChange={(e) => setFirstName(e.target.value)}/>Surname: <input id="surnameField" title="Surame" type="text" onChange={(e) => setLastName(e.target.value)}/></h3>
                        <h3 className="cont">Email: <input id="emailField" title="Email" type="text" onChange={(e) => setEmail(e.target.value)}/></h3>
                        <h3 className="cont">Message:</h3>
                        <textarea id="messageField" title="Message" type="text" onChange={(e) => setMessage(e.target.value)}/>
                    </div>
                    <button id="sendButton" title="Send" onClick={handleForm}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Main_page;