import React from 'react'
import {
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaXTwitter,
} from 'react-icons/fa6'

const Footer = () => {
    const commonContainerStyles = 'flex justify-start w-full h-[50%]'
    const commonInnerContainerStyles =
        'container flex items-center justify-start mx-auto desktop:ml-[11.2rem] laptop:ml-[1.7rem] tablet:ml-[1.1rem] mobile:ml-[0.8rem]'
    const commonPaddingY = 'desktop:py-8 laptop:py-8 tablet:py-6 mobile:py-5'

    const socialIcons = [
        {
            href: 'https://www.facebook.com',
            icon: FaFacebookF,
            alt: 'Facebook',
            hoverBg: 'hover:bg-[#1877F2]',
        },
        {
            href: 'https://www.linkedin.com',
            icon: FaLinkedinIn,
            alt: 'LinkedIn',
            hoverBg: 'hover:bg-[#0A66C2]',
        },
        {
            href: 'https://www.instagram.com',
            icon: FaInstagram,
            alt: 'Instagram',
            hoverBg: 'hover:bg-[#E4405F]',
        },
        {
            href: '#',
            icon: FaXTwitter,
            alt: 'X',
            hoverBg: 'hover:bg-gray-700',
        },
    ]

    return (
        <footer className="flex justify-center text-white bg-black h-[11rem]  ">
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
                                    aria-label={social.alt}
                                >
                                    <IconComponent className="w-5 h-5 text-white" />
                                </a>
                            )
                        })}
                    </div>
                </div>
                {/* Second container */}
                <div className={`${commonContainerStyles}`}>
                    <div
                        className={`${commonInnerContainerStyles} ${commonPaddingY}`}
                    >
                        <p className="font-helvetica-w20-bold text-white desktop:text-[15px] laptop:text-[14px] tablet:text-[13px] mobile:text-[12px]">
                            © Orange 2024
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
