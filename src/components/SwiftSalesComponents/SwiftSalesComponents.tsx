import styled from 'styled-components';
import React from 'react';

const colorPalette = ['#896E38', '#102526', '#2F5D8C', '#A38881', ' #D8D8D6'];

export const SwiftSalesButton = ({
	size = 'small',
	variant = 'primary',
	children,
	onClick,
	type = 'button',
	disabled,
}: {
	size: string;
	variant: string;
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset' | undefined;
	disabled?: boolean;
}) => {
	return (
		<BaseButton theme={{ size, variant, disabled }} onClick={onClick} type={type} disabled={disabled}>
			{children}
		</BaseButton>
	);
};

const BaseButton = styled.button`
	font-size: ${props => (props.theme.size === 'small' ? '13px' : '16px')};
	height: ${props => (props.theme.size === 'small' ? '28px' : '40px')};
	width: ${props => (props.theme.size === 'small' ? '105px' : '120px')};
	background-color: ${props =>
		props.theme.variant === 'primary'
			? '#102526;'
			: props.theme.variant === 'secondary'
			? 'gray'
			: props.theme.variant === 'danger'
			? 'crimson'
			: '#102526'};
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: 0.2s ease-in-out;

	${props => props.theme.disabled && 'opacity: 0.5;'}
	${props => props.theme.disabled && 'cursor: not-allowed;'}
	${props => !props.theme.disabled && '&:hover { opacity: 0.8;}'}
`;

export default SwiftSalesButton;
