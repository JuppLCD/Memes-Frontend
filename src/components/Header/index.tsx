import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useReduxDispatch, useReduxSelector } from '../../store';
import { logoutUser } from '../../store/slices/meme/MemeSlice';
import { logout } from '../../store/slices/user/UserSlice';

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const userState = useReduxSelector((state) => state.user);
	const dispach = useReduxDispatch();

	const logoutClickFunction = () => {
		dispach(logout());
		dispach(logoutUser());
	};
	return (
		<header>
			<div className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
				<div className='relative flex items-center justify-between'>
					<Link to='/' aria-label='Memes' title='Memes' className='inline-flex items-center'>
						<span className='ml-2 text-xl font-bold tracking-wide text-white uppercase'>Memes</span>
					</Link>
					<ul className='items-center hidden space-x-8 md:flex'>
						{userState.isAuth ? (
							<>
								<li>
									<Link
										to='/public'
										aria-label='Public memes view'
										title='Public memes view'
										className='font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400'
									>
										Public memes
									</Link>
								</li>
								<li>
									<Link
										to='/user'
										aria-label='User memes view'
										title='User memes view'
										className='font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400'
									>
										User memes
									</Link>
								</li>
								<li>
									<button
										onClick={logoutClickFunction}
										className='inline-flex items-center justify-center w-full h-12 tracking-wide focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
										aria-label='Log Out'
										title='Log Out'
									>
										Log Out
									</button>
								</li>
							</>
						) : (
							<>
								<li>
									<Link
										to='/login'
										className='inline-flex items-center justify-center h-12 tracking-wide  transition duration-200 shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline	focus:outline-none text-black bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
										aria-label='LogIn'
										title='LogIn'
									>
										LogIn
									</Link>
								</li>
							</>
						)}
					</ul>
					<div className='md:hidden'>
						<button
							aria-label='Open Menu'
							title='Open Menu'
							className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50'
							onClick={() => setIsMenuOpen(true)}
						>
							<svg className='w-5 text-white' viewBox='0 0 24 24'>
								<path fill='currentColor' d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z' />
								<path fill='currentColor' d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z' />
								<path fill='currentColor' d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z' />
							</svg>
						</button>
						{isMenuOpen && (
							<div className='absolute top-0 left-0 w-full'>
								<div className='p-5 bg-white border rounded shadow-sm'>
									<div className='flex items-center justify-between mb-4'>
										<div>
											<Link to='/' aria-label='Memes' title='Memes' className='inline-flex items-center'>
												<span className='ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase'>Memes</span>
											</Link>
										</div>
										<div>
											<button
												aria-label='Close Menu'
												title='Close Menu'
												className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
												onClick={() => setIsMenuOpen(false)}
											>
												<svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
													<path
														fill='currentColor'
														d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
													/>
												</svg>
											</button>
										</div>
									</div>
									<nav>
										<ul className='space-y-4'>
											{userState.isAuth ? (
												<>
													<li>
														<Link
															to='/public'
															aria-label='Public memes view'
															title='Public memes view'
															className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
														>
															Public memes
														</Link>
													</li>
													<li>
														<Link
															to='/user'
															aria-label='User memes view'
															title='User memes view'
															className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
														>
															User memes
														</Link>
													</li>
													<li>
														<button
															onClick={logoutClickFunction}
															className='inline-flex items-center justify-center w-full h-12 tracking-wide focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
															aria-label='Log Out'
															title='Log Out'
														>
															Log Out
														</button>
													</li>
												</>
											) : (
												<>
													<li>
														<Link
															to='/login'
															className='w-full bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline inline-flex items-center justify-center h-12 tracking-wide  transition duration-200 shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline	focus:outline-none text-black bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
															'
															aria-label='LogIn'
															title='LogIn'
														>
															LogIn
														</Link>
													</li>
												</>
											)}
										</ul>
									</nav>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
