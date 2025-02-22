 
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Inventory from './inventory';
import Orders from './orders';
import Shipments from './shipments';
import Employees from './employees';
import EmployeeRegistration from './employeeRegistration';
import RemoveEmployee from './removeEmployee';
import MonthlyReport from './monthlyReport';
import Refund from './refund';
import AddInstrument from './addInstrument';
import AddAccessory from './addAccessory';
import AddService from './addService';
import RemoveInstrument from './removeInstrument';
import RemoveAccessories from './removeAccessories';
import RemoveService from './removeService';
import InstrumentList from './instrumentList';
import AccessoryList from './accessoryList';
import ServiceList from './serviceList';
import AddAccessoryQuantity from './addAccessoryQuantity';
import AddInstrumentQuantity from './addInstrumentQuantity';
import "./employeesMain.css"

const EmployeesMain = () => {

    const [currentComponent, setCurrentComponent] = useState(null);
    const navigate = useNavigate()

    const handleMenuItemClick = (component) => {
        setCurrentComponent(component);
    };

    useEffect(() => {
        async function fetchData(){
            const token = localStorage.getItem("token")
            if(token){
                try{
                    const decodedToken = jwt_decode(token);
                    const expirationDate = new Date(decodedToken.exp * 1000);
                    if (expirationDate > new Date()){
                        try{
                            const response = await fetch(`/api/getReviews/${decodedToken.id}`)
                            if (response.status === 500) {
                                throw new Error("Fetching data failed")
                                navigate("/")
                            }
                            else{
                                if(response.json.success){
                                    return
                                }
                                else{
                                    navigate("/")
                                }
                            }
                        }catch(err){
                            console.log("Error: " + err)
                        }
                    }
                    else{
                        navigate("/")
                    }
                }catch(error){
                    console.error("Error: ", error)
                }
            }else{
                navigate("/")
            }
        }
        fetchData()
    }, []);
    return (
        <div className='workInterface'>
            <div className='sidePanel'>
                <ul className='sideMenu'>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Inventory />)}>Inventory</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Orders />)}>Order List</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Shipments />)}>Shipments</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Employees />)}>Employee list</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<EmployeeRegistration />)}>Add new employee</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<RemoveEmployee />)}>Remove employee</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<MonthlyReport />)}>Monthly reports section</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Refund />)}>Returns and refunds management</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddInstrument />)}>Add a Instrument</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddAccessory />)}>Add an Accessory</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddService />)}>Add a Service</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<RemoveInstrument />)}>Remove a Instrument</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<RemoveAccessories />)}>Remove an Accessory</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<RemoveService />)}>Remove a Service</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<InstrumentList />)}>Instrument List</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AccessoryList />)}>Accessory List</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<ServiceList />)}>Service List</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddAccessoryQuantity />)}>Increase Accessory Quantity</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddInstrumentQuantity />)}>Increase Instrument Quantity</li>
                </ul>
            </div>
            <div className='contentContainer'>
                {currentComponent}
            </div>
        </div>
    );
}

export default EmployeesMain;
