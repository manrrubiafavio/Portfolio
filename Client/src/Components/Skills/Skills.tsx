import NavBar from "../NavBar/NavBar";
import Styles from './Skills.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/actions-types";
import { useSelector } from "react-redux";

interface Skills {
    id: number;
    name: string;
    logo: string;
    level: string;
}


export default function ViewSkills() {
    const [skills, setSkills] = useState<Skills[]>([])
    const Back_url = process.env.REACT_APP_BACK_URL;
    const languageState = useSelector((state: RootState) => state.language)

    useEffect(() => {
        getSkills()
    }, [])

    const getSkills = async () => {
        try {
            const response = await axios.get(`${Back_url}/skills`)
            setSkills(response.data)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const handleDownload = () => {
        let pdfUrl = ""
        let link = document.createElement('a');
        if (languageState) {
            pdfUrl = 'Client/public/cv/Favio_Manrrubia_v2.pdf';
            link.download = 'Favio_Manrrubia_CV.pdf'
        } else {
            pdfUrl = 'Client/public/cv/Favio Manrrubia cv english.pdf';
            link.download = 'Favio_Manrrubia_Resume.pdf'
        }
        link.href = pdfUrl;
        link.click();
    }

    return (
        <div className={Styles.divMayor}>
            <NavBar />
            <div className={Styles.divDownload}>
                <p>{languageState ? "Recuerde seleccionar el idioma a descargar" : "Remember choose your language"}</p>
                <button className={Styles.downloadButton} onClick={handleDownload}>{languageState ? "Descargar CV" : "Download Resume"}</button>
            </div>
            <div className={Styles.divContainer}>
                {skills.map((skill) => (
                    <div key={skill.id} className={Styles.skillCard}>
                        <h3>{skill.name}</h3>
                        <img src={skill.logo} className={Styles.skillLogo} alt="Logo" />
                        <h3 className={skill.level}> Level: {skill.level}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}