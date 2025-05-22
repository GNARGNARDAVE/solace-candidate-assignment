import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
    title: 'Solace Candidate Assignment',
    description: 'Show us what you got',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" type="image/x-icon" href="/src/app/favicon.ico" />
                <link href="https://fonts.cdnfonts.com/css/mollie-glaston" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
