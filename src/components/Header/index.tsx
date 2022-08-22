import { Link } from 'react-router-dom';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { logout } from '../../store/slices/user/UserSlice';

function Header() {
	const userState = useReduxSelector((state) => state.user);
	const dispach = useReduxDispatch();
	return (
		<header>
			{userState.isAuth ? (
				<>
					<Link to='/'>Home</Link>
					<Link to='/public'>Public memes</Link>
					<Link to='/user'>User memes</Link>
					<button onClick={() => dispach(logout())}>Log Out</button>
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
