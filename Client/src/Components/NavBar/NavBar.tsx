import Styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/actions';
import { RootState } from '../../redux/actions-types';


export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const languageState = useSelector((state: RootState) => state.language);
 

    const changeLanguage = () => {
        dispatch(setLanguage(!languageState));
    }

    return (
        <nav >
            <div className={Styles.container}>
                <button className={Styles.navbutton} onClick={() => navigate('/')}>
                    {languageState ? 'Acerca de mí' : 'About me'}
                </button>
                <button className={Styles.navbutton} onClick={() => navigate('/Projects')}>
                    {languageState ? 'Proyectos' : 'Projects'}
                </button>
                <button className={Styles.navbutton} onClick={() => navigate('/Skills')}>
                    {languageState ? 'Habilidades y currículum' : 'Skills & resume'}
                </button>
                <button className={Styles.navbutton} onClick={() => navigate('/Contact')}>
                    {languageState ? 'Contacto' : 'Contact'}
                </button>
                <button className={Styles.Lanbutton} onClick={changeLanguage}>
                    {languageState ? 'EN' : 'ES'}
                </button>
            </div>
        </nav>
    );
}
