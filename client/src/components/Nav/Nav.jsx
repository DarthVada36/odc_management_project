import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import burguerIcon from '../../assets/icons/burguer-menu.svg'
import closeMenuIcon from '../../assets/icons/close-menu.svg'
import sessionLeaveIcon from '../../assets/icons/session-leave.svg'
import loginAdministratoIcon from '../../assets/icons/login-administrator.svg'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeLabel, setActiveLabel] = useState(null)
    const [activeLang, setActiveLang] = useState('ES')
    const menuItems = ['Cursos', 'Dashboard', 'Contacto']

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const Logo = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.46 283.46"
            className="w-full h-full desktop:ml-[2.3rem] laptop:-ml-[4.2rem] mobile:-ml-[0.3rem] tablet:-ml-[1.9rem]"
        >
            <defs>
                <style>
                    {`
                    #logo-square { fill: #ff7b00; }
                    #logo-text, #logo-line { fill: #fff; }
                    @media (max-width: 767px) {
                        #logo-text { display: none; }
                    }
                    @media (min-width: 768px) {
                        #logo-line { display: none; }
                    }
                    @keyframes slideFromTop {
                        0% {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .language-selector {
                        animation: slideFromTop 0.3s ease-out;
                    }
                    `}
                </style>
            </defs>
            <path d="M0 0h283.46v283.46H0z" id="logo-square" />
            <path d="M40.51 202.47h202.47v40.5H40.51z" id="logo-line" />
            <path
                d="M111.2 256a23.23 23.23 0 0 1-13 3.92c-7.36 0-11.71-4.9-11.71-11.46 0-8.83 8.12-13.51 24.85-15.4v-2.19c0-2.87-2.18-4.53-6.2-4.53a11.76 11.76 0 0 0-9.61 4.53l-7-4q5.52-7.71 16.82-7.7c10.28 0 16 4.45 16 11.7v28.6h-9.2zm-14.55-8.3c0 2.65 1.67 5.13 4.68 5.13 3.27 0 6.44-1.36 9.62-4.16v-9.34c-9.7 1.23-14.3 3.72-14.3 8.39zM129.54 221.07l8.59-1.19.94 4.68c4.85-3.55 8.7-5.44 13.55-5.44 8.12 0 12.3 4.31 12.3 12.84v27.47h-10.37v-25.66c0-4.83-1.26-7-5-7-3.1 0-6.19 1.43-9.71 4.38v28.3h-10.3zM233.69 260.18c-11.63 0-18.57-7.47-18.57-20.45s7-20.61 18.4-20.61 18.15 7.25 18.15 20.08c0 .68-.08 1.36-.08 2h-26.27c.08 7.47 3.18 11.24 9.29 11.24 3.93 0 6.52-1.58 8.95-5l7.61 4.22c-3.35 5.58-9.37 8.52-17.48 8.52zm7.78-25.66c0-5.28-3-8.38-7.95-8.38-4.68 0-7.61 3-8 8.38zM34.89 260.61c-10.27 0-19.52-6.54-19.52-20.82S24.62 219 34.89 219s19.52 6.55 19.52 20.82-9.26 20.79-19.52 20.79zm0-32.86c-7.75 0-9.19 7-9.19 12s1.44 12.05 9.19 12.05 9.19-7 9.19-12.05-1.44-12-9.19-12zM61.53 220h9.87v4.64a15.29 15.29 0 0 1 10.87-5.45 8.6 8.6 0 0 1 1.34.07V229h-.5c-4.52 0-9.46.7-11 4.21v26.24H61.53zM190.34 251c7.88-.06 8.54-8.07 8.54-13.31 0-6.16-3-11.18-8.61-11.18-3.73 0-7.89 2.72-7.89 11.61 0 4.88.34 12.93 7.96 12.88zm18.52-31.12v37.35c0 6.6-.5 17.45-19.31 17.57-7.75 0-14.94-3.05-16.38-9.83l10.25-1.65c.43 1.94 1.61 3.88 7.42 3.88 5.39 0 8-2.58 8-8.75v-4.59l-.14-.14c-1.65 2.94-4.16 5.74-10.19 5.74-9.19 0-16.44-6.38-16.44-19.72 0-13.19 7.47-20.57 15.86-20.58 7.87 0 10.79 3.57 11.46 5.46h-.12l.85-4.72zM255.75 206.79h-4.08v11.3h-2.16v-11.3h-4.08v-1.74h10.32zm17 11.3h-2.15V207.2h-.07l-4.27 10.89h-1.36l-4.27-10.89h-.06v10.89h-2.15v-13h3.32l3.89 9.9 3.83-9.9h3.29z"
                id="logo-text"
            />
        </svg>
    )

    const handleLabelClick = (item) => {
        setActiveLabel(item)
    }

    const handleLanguageChange = (lang) => {
        setActiveLang(lang)
    }

    // Animation for the menu items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.09,
            },
        },
    }

    const itemVariants = {
        hidden: { y: -80, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
    }

    return (
        <header className="relative">
            {/* Language selector - desktop only */}
            <div className="items-center justify-end hidden h-10 pb-1 text-[0.9rem] bg-black border-b border-neutral-600 laptop:flex">
                <div className="flex items-center gap-2 mt-[0.9rem] desktop:mr-[2.2rem] laptop:-mr-[4rem] font-bold text-white desktop:px-36 laptop:px-24 tablet:px-12">
                    <button
                        onClick={() => handleLanguageChange('ES')}
                        className={`relative pb-[0.45rem] transition-colors duration-300 ease-in-out animate-[slideFromTop_0.5s_ease-out]
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.3rem] after:transition-colors after:duration-300
        ${
            activeLang === 'ES'
                ? 'text-primary after:bg-primary'
                : 'text-white hover:text-primary after:bg-transparent'
        }`}
                    >
                        ES
                    </button>
                    <span className="text-neutral-600"></span>
                    <button
                        onClick={() => handleLanguageChange('EN')}
                        className={`relative pb-[0.45rem] transition-colors duration-300 ease-in-out animate-[slideFromTop_0.5s_ease-out]
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.3rem] after:transition-colors after:duration-300
        ${
            activeLang === 'EN'
                ? 'text-primary after:bg-primary'
                : 'text-white hover:text-primary after:bg-transparent'
        }`}
                    >
                        EN
                    </button>
                </div>
            </div>

            {/* Main navbar */}
            <nav className="flex items-center justify-between w-full h-[6.3rem] tablet:h-[6.31rem] mobile:h-[3.13rem] bg-black">
                {/* Left section with logo and menu */}
                <motion.div
                    className="flex items-center gap-4 desktop:pl-36 laptop:pl-24 tablet:pl-12 mobile:pl-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Logo */}
                    <motion.div
                        variants={itemVariants}
                        className="desktop:h-[80px] desktop:w-[51px] laptop:h-[51px] laptop:w-[51px] tablet:h-[51px] tablet:w-[51px] mobile:h-[31px] mobile:w-[31px]"
                    >
                        <Logo />
                    </motion.div>

                    {/* Brand text */}
                    <div className="flex flex-col pl-3 desktop:ml-[2.1rem] laptop:-ml-[4.4rem] mobile:mb-1 tablet:-ml-[2.1rem] mobile:-ml-[1.3rem]">
                        <motion.span
                            variants={itemVariants}
                            className="font-bold text-primary pb-2 desktop:text-[1.7rem] laptop:text-[1.7rem] tablet:text-[1.69rem] mobile:text-[1.05rem] mobile:-mb-[0.5rem] tablet:-mb-[0.75rem] laptop:-mb-[0.65rem]"
                        >
                            Orange
                        </motion.span>
                        <motion.span
                            variants={itemVariants}
                            className="font-bold text-white -mt-2 desktop:text-[1.7rem] laptop:text-[1.7rem] tablet:text-[1.69rem] mobile:text-[1.05rem]  mobile:-mb-1 "
                        >
                            Digital Center
                        </motion.span>
                    </div>

                    {/* Desktop menu */}
                    <motion.div
                        className="items-center hidden gap-8 ml-[1.2rem] laptop:flex"
                        variants={containerVariants}
                    >
                        {menuItems.map((item) => (
                            <motion.a
                                key={item}
                                variants={itemVariants}
                                href="#"
                                onClick={() => handleLabelClick(item)}
                                className={`relative text-base font-bold transition-colors duration-300 ease-in-out font-inter hover:text-primary mt-[3.65rem] pb-[1.15rem] 
                                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.3rem] after:transition-colors after:duration-300
                                    ${
                                        activeLabel === item
                                            ? 'text-primary after:bg-primary'
                                            : 'text-white after:bg-transparent'
                                    }`}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right section */}
                <motion.div
                    className="flex items-center desktop:-mr-[0.3rem] desktop:gap-[1.7rem] mobile:gap-[0.5rem] pr-2 desktop:pr-[10.5rem] laptop:pr-5 tablet:pr-5 tablet:-mb-[0.5rem] mobile:pr-4 mobile:mb-[1.5rem]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Login icon */}
                    <motion.button
                        variants={itemVariants}
                        className="p-2 mt-[1.8rem] text-white hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                        <img
                            src={loginAdministratoIcon}
                            alt="Iniciar sesión"
                            className="desktop:w-8 desktop:h-8 laptop:w-7 laptop:h-7 tablet:w-7 tablet:h-7 mobile:w-7 mobile:h-7"
                        />
                    </motion.button>

                    {/* Logout icon */}
                    <motion.button
                        variants={itemVariants}
                        className="p-2 text-white transition-colors duration-300 ease-in-out hover:text-primary"
                    >
                        <img
                            src={sessionLeaveIcon}
                            alt="Cerrar sesión"
                            className="desktop:w-8 mt-[1.8rem] desktop:h-8 laptop:w-7 laptop:h-7 tablet:w-7 tablet:h-7 mobile:w-7 mobile:h-7"
                        />
                    </motion.button>

                    {/* Menu button - mobile only */}
                    <button
                        className="p-2 mt-[1.9rem] mobile:-mr-[0.8rem] text-white laptop:hidden animate-[spin_0.5s_ease-out]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <img
                            src={isMenuOpen ? closeMenuIcon : burguerIcon}
                            alt={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                            className={`w-8 h-8 wmobile:w-7 mobile:h-7 transition-transform duration-300 ${
                                isMenuOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                </motion.div>
            </nav>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="border-t border-neutral-600 laptop:hidden">
                    <div className="bg-black">
                        <div className="flex flex-col  px-2 font-bold text-[14px]">
                            {menuItems.map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    onClick={() => handleLabelClick(item)}
                                    className={`border-b py-[0.825rem]  border-neutral-600 transition-colors duration-300 ease-in-out
                                        ${
                                            activeLabel === item
                                                ? 'text-primary'
                                                : 'text-white hover:text-primary'
                                        }`}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Language selector in mobile menu */}
                        <div className="flex justify-end gap-2 p-6 py-[0.9rem] font-bold text-white tablet:text-[14px] text-[13px]">
                            <button
                                onClick={() => handleLanguageChange('ES')}
                                className={`transition-colors duration-300 ease-in-out
                                    ${
                                        activeLang === 'ES'
                                            ? 'text-primary'
                                            : 'text-white hover:text-primary'
                                    }`}
                            >
                                ES
                            </button>
                            <span className="text-neutral-600"></span>
                            <button
                                onClick={() => handleLanguageChange('EN')}
                                className={`transition-colors duration-300 ease-in-out
                                    ${
                                        activeLang === 'EN'
                                            ? 'text-primary'
                                            : 'text-white hover:text-primary'
                                    }`}
                            >
                                EN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Nav
