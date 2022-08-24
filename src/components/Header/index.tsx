import { Link } from 'react-router-dom';

import { useReduxDispatch, useReduxSelector } from '../../store';
import { logoutUser } from '../../store/slices/meme/MemeSlice';
import { logout } from '../../store/slices/user/UserSlice';

function Header() {
	const userState = useReduxSelector((state) => state.user);
	const dispach = useReduxDispatch();

	const logoutClickFunction = () => {
		dispach(logout());
		dispach(logoutUser());
	};
	return (
		<header>
			{userState.isAuth ? (
				<>
					<Link to='/'>Home</Link>
					<Link to='/public'>Public memes</Link>
					<Link to='/user'>User memes</Link>
					<button onClick={logoutClickFunction}>Log Out</button>
				</>
			) : (
				<>
					<Link to='/login'>LogIn</Link>
				</>
			)}
		</header>
	);
}

export default Header;
