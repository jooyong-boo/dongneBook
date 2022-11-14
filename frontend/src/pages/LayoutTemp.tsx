import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/common/NavBar';
import NavTemp from '../components/common/NavTemp';

const Main = styled.div`
	height: 100%;
	width: 100%;

	display: flex;
	justify-content: center;
`;

const Nav = styled.ul`
	display: flex;
	justify-content: space-around;
	border: 1px solid black;
	width: 100%;
	padding: 10px;
	li {
		margin: 0px 5px;
	}
`;

const LayoutTemp = () => {
	return (
		<div>
			<Main>
				<Outlet />
				<NavTemp />
				{/* <Nav>
					<li>
						<Link to={'/books/search'}>검색</Link>
					</li>
					<li>
						<Link to={'/history'}>대여목록</Link>
					</li>
					<li>
						<Link to={'/books'}>홈</Link>
					</li>
					<li>
						<Link to={'/chats'}>채팅</Link>
					</li>
					<li>
						<Link to={'/profile'}>마이페이지</Link>
					</li>
				</Nav> */}
			</Main>
		</div>
	);
};

export default LayoutTemp;