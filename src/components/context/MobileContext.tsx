import React, { createContext, useContext, useState, useEffect } from 'react';

const MobileContext = createContext({
	isMobile: false,
});

const MobileProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect((): (() => void) => {
		const handleResize = (): void => {
			const mobileThreshold = 1000;
			setIsMobile(window.innerWidth < mobileThreshold);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return <MobileContext.Provider value={{ isMobile }}>{children}</MobileContext.Provider>;
};

const useMobileContext = (): { isMobile: boolean } => {
	const context = useContext(MobileContext);
	if (context === undefined) {
		throw new Error('useMobileContext must be used within a MobileProvider');
	}
	return context;
};

export { MobileProvider, useMobileContext };
