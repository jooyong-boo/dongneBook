import styled from 'styled-components';
import dummyImage from '../assets/image/dummy.png';
import BookList from '../components/Merchant/BookList';
import TabLists from '../components/common/TabLists';
import Title from '../components/common/Title';
import useTabs from '../hooks/useTabs';
import Review from '../components/Merchant/Review';
import { useMypageAPI } from '../api/mypage';
import { useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';

function MerchantPage() {
	const [tab, curTab, handleChange] = useTabs(['책 목록', '리뷰 보기']);
	const id = useAppSelector(state => state.loginInfo.id);
	const { getMemberInfo } = useMypageAPI();
	const [memberInfo, setMemberInfo] = useState();

	useEffect(() => {
		getMemberInfo(id).then(res => {
			console.log(res);
		});
	}, []);

	return (
		<Layout>
			<Title text="상인 정보" />
			<ProfileBox>
				<img src={dummyImage} alt="dummy" width={80} height={100} />
				<UserInfoBox>
					<p>닉네임: 홍길동</p>
					<p>주거래 동네: 강남</p>
					<p>빌려주는 도서 수: 3</p>
					<p>평점(평균): 별별별별별</p>
				</UserInfoBox>
			</ProfileBox>
			<TabLists tabs={tab} handleChange={handleChange} />
			{curTab === '책 목록' && <BookList />}
			{curTab === '리뷰 보기' && <Review />}
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 1rem;
	min-width: 90%;
`;

const ProfileBox = styled.div`
	width: 80%;
	display: flex;
	padding: 1.2rem;
	border: 1px solid #eaeaea;
`;

const UserInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-left: 2rem;
	font-size: ${props => props.theme.fontSizes.paragraph};
`;

export default MerchantPage;
