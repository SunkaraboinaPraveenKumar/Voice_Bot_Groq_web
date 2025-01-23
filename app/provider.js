"use client"
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs';

function Provider({ children }) {
    return (
        <div>
            <ClerkProvider>
                {children}
            </ClerkProvider>
        </div>
    )
}

export default Provider