'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            {/* Burger only visible on small screens */}
            <Button
                variant="ghost"
                className="p-2 flex flex-col gap-[6px] group block md:hidden"
                onClick={handleClick}
            >
                <span
                    className={`block h-[3px] w-6 bg-white rounded transition-all duration-300
                        ${isOpen ? 'rotate-45 translate-y-[9px]' : ''}
                    `}
                />
                <span
                    className={`block h-[3px] w-6 bg-white rounded transition-all duration-300
                        ${isOpen ? 'opacity-0' : 'opacity-100'}
                    `}
                />
                <span
                    className={`block h-[3px] w-6 bg-white rounded transition-all duration-300
                        ${isOpen ? '-rotate-45 -translate-y-[9px]' : ''}
                    `}
                />
            </Button>

            {/* Menu content */}
            {isOpen && (
                <div className="absolute top-12 right-0 bg-neutral-900 text-white p-4 rounded shadow-lg w-40 md:hidden">
                    <ul className="space-y-2">
                        <li className="hover:text-neutral-300 cursor-pointer">Home</li>
                        <li className="hover:text-neutral-300 cursor-pointer">About</li>
                        <li className="hover:text-neutral-300 cursor-pointer">Contact</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
