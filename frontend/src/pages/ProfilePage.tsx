import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../redux/hooks';

// component
import PickBookList from '../components/Member/PickBookList';
import ReservationBookList from '../components/Member/ReservationBookList';
import TabLists from '../components/common/TabLists';
import Title from '../components/common/Title';
import Button from '../components/common/Button';
import ProfileEditPage from './ProfileEditPage';
import BookItem from '../components/Books/BookItem';
import userImage from '../assets/image/user.png';
import Animation from '../components/Loading/Animation';

// hooks
import { useMypageAPI } from '../api/mypage';
import useTabs from '../hooks/useTabs';

// etc
import { MemberInfo } from '../queryType/members';
import { logout } from '../redux/slice/userSlice';
import { dummyBookWish } from '../assets/dummy/books';

function ProfilePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [tab, curTab, handleChange] = useTabs(['찜 목록', '예약 목록']);
	const { id } = useAppSelector(state => state.loginInfo);

	const handleEditPage = () => {
		navigate('/profile/edit');
	};

	// api mypage member info
	const { getMyInfo, getPickBookList } = useMypageAPI();

	const { data, isLoading } = useQuery({
		queryKey: ['myprofile'],
		queryFn: () => getMyInfo(id),
		retry: false,
	});

	console.log('data: ', data);
	if (isLoading) return <Animation width={50} height={50} />;

	return (
		<Layout>
			<Title text="마이페이지" />
			<ProfileBox>
				<img src={userImage} alt="dummy" width={80} height={100} />
				<UserInfoBox>
					<p>닉네임: {data?.name}</p>
					<p>주거래 동네:{data?.address ?? ' 거래 할 동네를 설정해주세요!'}</p>
					<p>빌려준 도서 수: {data?.totalBookCount}</p>
					<div className="editprofile">
						<p className="edit1" onClick={handleEditPage}>
							수정하기
						</p>
						<HiOutlinePencilAlt className="edit" onClick={handleEditPage} />
					</div>
				</UserInfoBox>
			</ProfileBox>

			<TabLists tabs={tab} handleChange={handleChange} />
			{curTab === '찜 목록' && <PickBookList />}
			{curTab === '예약 목록' && <ReservationBookList />}
			{/* <MyList /> */}
			<Button
				fontSize={'small'}
				className="logout"
				onClick={() => {
					dispatch(logout());
					navigate('/books');
				}}>
				로그아웃
			</Button>
		</Layout>
	);
}

const ContainerNew = styled.div`
	width: 90%;
`;

const Layout = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 1rem;
	min-width: 90%;

	.logout {
		margin-top: 20px;
		margin-bottom: 20px;
		background-color: #a4a4a4;
		padding: 10px 48px;
		&:hover {
			background-color: grey;
		}
	}
`;

const ProfileBox = styled.div`
	width: 80%;
	display: flex;
	padding: 1.2rem;
	border: 1px solid #eaeaea;

	.edit1 {
		cursor: pointer;
	}
	.edit {
		display: grid;
		position: relative;
		right: 0;
		background-color: #fbfbfb;
		color: ${props => props.theme.colors.buttonGreen};
		padding-left: 5px;
		cursor: pointer;
	}
`;

const UserInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 2rem;

	.editprofile {
		display: flex;
		color: ${props => props.theme.colors.buttonGreen};
	}
`;

export default ProfilePage;
