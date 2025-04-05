

import { FC, useEffect } from 'react'
import { Icon } from '../Icon';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleTheme } from '@/store/features';

export const ThemeToggle:FC = () => {
    const dispatch = useAppDispatch()
    const mode = useAppSelector((state) => state.theme.mode)

  const handleDarkMode = ()=>{
    dispatch(toggleTheme())
  }
  useEffect(()=>{
    if(mode === 'dark'){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
  },[mode])

  return (
    <button className="flex gap-2 cursor-pointer" onClick={handleDarkMode}>
        {mode === 'light'  ? (
          <Icon name="sun" width={24} height={24} color="#f1c40f" />
        ) : (
          <Icon name="moon" width={24} height={24} color="#2980b9" />
        )}
      </button>
  )
}
