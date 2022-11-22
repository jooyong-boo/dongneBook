import axios from 'axios';
import styled from 'styled-components';
import { BASE_URL } from '../../constants/constants';
import Input from '../common/Input';

type IdSectionProps = {
	data: {
		label: string;
		state: string;
		setState: Function;
		validity: boolean;
		setValidity: Function;
		type: string;
	};
	notify: Function;
};

const IdSection = ({ data, notify }: IdSectionProps) => {
	const { label, state, setState, setValidity, type } = data;
	const handleValidateClick = (
		label: string,
		state: string,
		validate: Function,
	) => {
		// 아이디 중복확인 부분 서버 엔드포인트 소문자 변경 작업중으로 임시 사용 불가 -> 다음 배포 때 적용 예정
		const endPoint = label === '아이디' ? 'id' : 'nickname';
		const endPointTemp = label === '아이디' ? 'Id' : 'nickname';
		state
			? axios
					.get(
						`${BASE_URL}auth/signup/check${endPointTemp}?${endPoint}=${state}`,
					)
					.then(res => {
						if (res.data.success) {
							validate(true);
							notify(`사용가능한 ${label}입니다.`);
							console.log(res);
						} else notify(res.data.message);
					})
					.catch(e => {
						notify(e.message);
					})
			: notify(`${label === '아이디' ? '아이디를' : '닉네임을'} 입력해주세요.`);
	};

	return (
		<StyledIdSection>
			<IdWrapper key={label}>
				<Input label={label} state={state} setState={setState} type={type} />
				<div
					className="overlapCheck"
					onClick={() => handleValidateClick(label, state, setValidity)}>
					중복확인
				</div>
			</IdWrapper>
		</StyledIdSection>
	);
};

const StyledIdSection = styled.div`
	display: grid;
`;

const IdWrapper = styled.div`
	min-width: 117.5%;
	display: grid;
	grid-template-columns: 22rem 1px;
	.overlapCheck {
		width: 4.1rem;
		height: 1rem;
		background-color: transparent;
		color: ${props => props.theme.colors.buttonGreen};
		font-weight: bold;
		position: relative;
		top: 3.4rem;
		right: 4.1rem;
		cursor: pointer;
	}
`;

export default IdSection;