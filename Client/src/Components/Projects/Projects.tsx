import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/actions-types";
import Styles from './Projects.module.css';
import { useSelector } from "react-redux";
import ReactPlayer from 'react-player';

interface Project {
    id: number;
    name: string;
    description: string;
    video?: string;
    links: string[];
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const Back_url = process.env.REACT_APP_BACK_URL;
    const languageState = useSelector((state: RootState) => state.language);

    useEffect(() => {
        getProjects(languageState)
    }, [])
    useEffect(() => {
        getProjects(languageState)
    }, [languageState])

    const getProjects = async (languageState: boolean) => {
        try {
            const response = await axios.get(`${Back_url}/projects/${languageState}`)
            setProjects(response.data)
        } catch (error: any) {
            console.error(error.message)
        }
    }


    return (
        <div className={Styles.divMayor}>
            <NavBar />
            <div className={Styles.projectsContainer}>
                {projects.map((project) => (
                    <div key={project.id} className={Styles.projectCard}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        {project.video && (
                            <ReactPlayer
                                url={project.video}
                                width="100%" 
                                height="100%" 
                                controls={true} 
                            />
                        )}
                        <div className={Styles.linksCont}>
                            <h3>Links:</h3>
                            <ul>
                                {project.links.map((link, index) => (
                                    <li key={index}>
                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}