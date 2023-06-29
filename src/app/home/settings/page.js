'use client'

import { useTheme } from '@/context/ThemeContext'
import '../../../assets/settings.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const SettingsPage = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <main className={`settings-page ${theme === 'light' ? 'light' : ''}`}>
      <h1 className='page-title'>Settings</h1>
      <section className='settings'>
        <ul>
          <li className='settings-item'>
            Change Theme
            <div className='theme-switcher'>
              <button className={theme === 'light' ? `active` : ''} onClick={() => toggleTheme()}><FontAwesomeIcon icon={faSun}/> Light</button>
              <button className={theme === 'dark' ? `active` : ''} onClick={() => toggleTheme()}><FontAwesomeIcon icon={faMoon}/> Dark</button>
            </div>
          </li>
          <li className='settings-item'>
            My Social Media
            <div className='social-links'>
              <a href='https://github.com/JuaniLlaberia' target='_blank'><FontAwesomeIcon size='2x' icon={faGithub}/></a>
              <a href='https://www.linkedin.com/in/juan-ignacio-llaberia-241b351b3/' target='_blank'><FontAwesomeIcon size='2x' icon={faLinkedin}/></a>
              <a href='https://www.instagram.com/juani_llabe/' target='_blank'><FontAwesomeIcon size='2x' icon={faInstagram}/></a>
            </div>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default SettingsPage
