import { Input, Tooltip, useMantineColorScheme } from '@mantine/core';
import { motion } from 'framer-motion';

export function Header(props) {
	return (
		<div id="header" className="sticky top-0 bg-zinc-800/10 dark:bg-zinc-800/75 transparent backdrop-blur z-40 lg:z-50 w-full">
		<div className="py-4 px-8">
			<div className="flex gap-5 items-center justify-center">
				Header
				<SearchBar />
				<Theme />
			</div>
		</div>
		</div>
	)
}

function SearchBar() {
	return (
		<div id="searchBar">
			<Input 
				placeholder="Search anything here..."
				radius="lg"
				rightSection={
					<Tooltip 
						label="Message Tooltip..."
						position="bottom-end"
						withArrow
					>
						<div id="tooltipIconContainer" className="dark:bg-gray-700 text-gray-400 rounded-full">
							<svg id="tooltipIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
							</svg>
						</div>
					</Tooltip>
				}
			/>
		</div>
	)
}

function Theme(){
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	
	function AnimatedIcon(props:{path:string;fill:string;}) {
		return (
			<svg id="moon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
				<motion.path
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1, fill: props.fill }}
					transition={{ 
						type: "tween",
						ease: "easeOut",
						delay:0.1,
						duration: 0.3,
					}}
					strokeLinecap="round" 
					strokeLinejoin="round"
					d={props.path}
				/>
			</svg>
		)
	}
	
	const MoonIcon = ()=><AnimatedIcon fill="#4b5563" path="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
	const SunIcon = ()=><AnimatedIcon fill="#ca8a04" path="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />

	return (
	<div 
		id="theme-controls" 
		className={`rounded-lg hover:ring-2 ring-gray-500 transition duration-100 p-1 `}
		onClick={()=>toggleColorScheme()}
	>
		{colorScheme === 'dark' ? <MoonIcon /> : <SunIcon /> }
	</div>
)
}
