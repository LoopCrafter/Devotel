

import { FC, useEffect, useState } from 'react'
import { Icon } from '../Icon';

export const ThemeToggle:FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkMode = ()=>{
    setIsDarkMode(prev => !prev)
  }
  useEffect(()=>{
    if(isDarkMode){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
  },[isDarkMode])

  return (
    <div className="flex gap-2" onClick={handleDarkMode}>
        {isDarkMode ? (
          <Icon name="moon" width={24} height={24} color="#2980b9" />
        ) : (
          <Icon name="sun" width={24} height={24} color="#f1c40f" />
        )}
      </div>
  )
}
