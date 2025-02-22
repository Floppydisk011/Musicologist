 
import React from 'react';
import { Link } from 'react-router-dom';
import './shopmenu.css';

function ShopMenu(){

    return(
        <div className="shop-menu-container">
            <div className="menu-container">
                <div className="menu-item">
                    <Link to="/results/Pianos">Pianos</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/Strings">Strings</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/Woodwinds">Woodwinds</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/Brass">Brass</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/Percussions">Percussions</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/Accessories">Accessories</Link>
                </div>
                <div className="menu-item" id="last">
                    <Link to="/results/Services">Services</Link>
                </div>
            </div>
        </div>
    );
}

export default ShopMenu;