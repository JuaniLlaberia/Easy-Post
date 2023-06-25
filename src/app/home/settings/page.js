'use client'

import { useTheme } from '@/context/ThemeContext'
import '../../../assets/settings.css'
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';

const SettingsPage = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <main className='settings-page'>
      Settings
      {theme}
      <button onClick={() => toggleTheme()}>Change Theme</button>
    </main>
  )
}

export default SettingsPage
