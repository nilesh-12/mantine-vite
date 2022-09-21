import { useState, MouseEvent } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { List } from '@mantine/core';
import { Header } from './Header';

export default function Demo() {
	const [colorScheme, setColorScheme ] = useState<ColorScheme>('light');
	const toggleColorScheme = (event: MouseEvent, value?: ColorScheme) => {
		// case 1 = value will not be available as toggle means switching.
		// value is false then || will run next expr.
		// but if value is available then expr after || will be ignored.
		// || - when lhs is false run rhs
		// ?? - when lhs is true run rhs.
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	}
	// Dummy list
	const items = Array(70).fill(null).map((_,i)=>`item ${i+1}`)
  return (
		<ColorSchemeProvider 
			colorScheme={colorScheme} 
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{
					colorScheme: 'dark',
					// Override any other properties from default theme
					fontFamily: 'system-ui, SF Pro text, Open Sans, sans serif',
					spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
				}}
			>
			<Header />
			<div className="flex row justify-center">
			<List>
				{items.map(item=>
					<List.Item 
						key={item}
						className="px-8 py-4 bg-sky-600 text-gray-800 rounded-lg m-2">			
						{item}
					</List.Item>
				)}
			</List>
			</div>
			</MantineProvider>
		</ColorSchemeProvider>
  );
}

