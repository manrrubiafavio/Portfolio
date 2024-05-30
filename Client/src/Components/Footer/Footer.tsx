import { useState, useEffect } from "react";
import axios from "axios";
import Styles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { RootState } from "../../redux/actions-types";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Footer(){
    const [contactInfo, setContactInfo] = useState({ "id": 0, "phone": 0, "email": "", "whatsapp": "" });
    const languageState = useSelector((state: RootState) => state.language);
    const Back_Url = process.env.REACT_APP_BACK_URL;
    const Back_Url2 = process.env.REACT_APP_BACK_URL2;

    useEffect(() => {
        getContactInfo();
    }, [])    

    const getContactInfo = async () => {
        try {
            const response = await axios.get(`${Back_Url}/contact`)
            setContactInfo(response.data[0])
        } catch (error:any) {
            console.error(error.message)
            try {
                const response = await axios.get(`${Back_Url2}/contact`)
            setContactInfo(response.data[0])
            } catch (error) {
                console.error('Error en los servidores')
            }
        }
    }

    return(
        <footer className={Styles.Footer}>
                <p>
                    {languageState ? "Teléfono: " : "Phone: "} <FontAwesomeIcon icon={faPhone} />{contactInfo.phone}
                </p>
                <p>
                    {languageState ? "Correo Electrónico: " : "Email: "} <FontAwesomeIcon icon={faEnvelope} />{contactInfo.email}
                </p>
                <p >
                    <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer">
                        WhatsApp: <FontAwesomeIcon icon={faWhatsapp} /> {languageState ? "Chatea conmigo " : "Whatsapp me "}
                    </a>
                </p>
            </footer>
    )

}