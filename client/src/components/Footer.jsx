import React from 'react'
import {
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaTwitter,
} from 'react-icons/fa'

const Footer = () => {
    const commonContainerStyles = 'flex justify-start w-full h-[50%]'
    const commonInnerContainerStyles =
        'container flex items-center justify-start mx-auto desktop:ml-[11.2rem] laptop:ml-[1.7rem] tablet:ml-[1.1rem] mobile:ml-[0.8rem]'
    const commonPaddingY = 'desktop:py-8 laptop:py-8 tablet:py-6 mobile:py-5'

    const socialIcons = [
        {
            href: 'https://www.facebook.com/OrangeDigitalCenter',
            icon: FaFacebookF,
            alt: 'Facebook',
            hoverBg: 'hover:bg-[#1877F2]',
        },
        {
            href: 'https://www.linkedin.com/company/fundacionorange/',
            icon: FaLinkedinIn,
            alt: 'LinkedIn',
            hoverBg: 'hover:bg-[#0A66C2]',
        },
        {
            href: 'https://www.instagram.com/fundacionorange/',
            icon: FaInstagram,
            alt: 'Instagram',
            hoverBg: 'hover:bg-[#E4405F]',
        },
        {
            href: 'https://x.com/fundacionorange',
            icon: FaTwitter,
            alt: 'Twitter',
            hoverBg: 'hover:bg-[#1DA1F2]',
        },
    ]

    return (
        <footer className="flex justify-center text-white bg-black h-[11rem] mobile:h-auto">
            <div className="flex flex-col w-full h-full">
                {/* First container */}
                <div
                    className={`${commonContainerStyles} border-b border-neutral-600`}
                >
                    <div
                        className={`${commonInnerContainerStyles} ${commonPaddingY}`}
                    >
                        <span className="mr-6 font-helvetica-w20-bold desktop:text-[17px] laptop:text-[16px] tablet:text-[15px] mobile:text-[14px]">
                            Síguenos
                        </span>
                        {socialIcons.map((social) => {
                            const IconComponent = social.icon
                            return (
                                <a
                                    key={social.alt}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full border border-white flex items-center justify-center transition-all duration-300 ${social.hoverBg} hover:border-transparent mr-4`}
                                    aria-label={`Visitar ${social.alt}`}
                                >
                                    <IconComponent className="w-5 h-5 text-white" />
                                </a>
                            )
                        })}
                    </div>
                </div>
                {/* Second container */}
                <div className={`${commonContainerStyles} mobile:flex-col`}>
                    <div
                        className={`${commonInnerContainerStyles} ${commonPaddingY} mobile:flex-col mobile:items-start `}
                    >
                        <div className="flex items-center gap-7 desktop:flex-row desktop:justify-start tablet:flex-row mobile:flex-col mobile:items-start">
                            <p className="font-helvetica-w20-bold text-white desktop:text-[15px] laptop:text-[14px] tablet:text-[13px] mobile:text-[12px] mobile:mb-2">
                                © Orange 2024
                            </p>
                            <span className="mx-2 text-neutral-600 mobile:hidden">
                                |
                            </span>
                            <a
                                href="https://fundacionorange.es/aviso-legal/"
                                className="font-helvetica-w20-bold text-white desktop:text-[15px] laptop:text-[14px] tablet:text-[13px] mobile:text-[12px] hover:text-primary transition-colors duration-300 focus:outline-none mobile:mb-2"
                            >
                                Términos y condiciones
                            </a>
                            <span className="mx-2 text-neutral-600 mobile:hidden">
                                |
                            </span>
                            <a
                                href="https://fundacionorange.es/politica-de-privacidad/?_gl=1*5e4trs*_ga*OTA2MTAxOTM5LjE3MzE5MjAxMTM.*_ga_YJMC24W9CP*MTczNDAzMjcxMy4yNi4xLjE3MzQwMzI3MzAuMC4wLjA."
                                className="font-helvetica-w20-bold text-white desktop:text-[15px] laptop:text-[14px] tablet:text-[13px] mobile:text-[12px] hover:text-primary transition-colors duration-300 focus:outline-none mobile:mb-2"
                            >
                                Política de privacidad
                            </a>
                            <span className="mx-2 text-neutral-600 mobile:hidden">
                                |
                            </span>
                            <a
                                href="https://fundacionorange.es/funciones-accesibilidad/"
                                className="font-helvetica-w20-bold text-white desktop:text-[15px] laptop:text-[14px] tablet:text-[13px] mobile:text-[12px] hover:text-primary transition-colors duration-300 focus:outline-none mobile:mb-2"
                            >
                                Accesibilidad
                            </a>
                            <span className="mx-2 text-neutral-600 mobile:hidden">
                                |
                            </span>
                            <a
                                href="https://fundacionorange.es/politica-de-cookies/?_gl=1*aqjqvz*_ga*OTA2MTAxOTM5LjE3MzE5MjAxMTM.*_ga_YJMC24W9CP*MTczNDAzMjcxMy4yNi4xLjE3MzQwMzI3NzguMC4wLjA."
                                className="font-helvetica-w20-bold text-white desktop:text-[15px] laptop:text-[14px] tablet:text-[13px] mobile:text-[12px] hover:text-primary transition-colors duration-300 focus:outline-none mobile:mb-2"
                            >
                                Política de cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
