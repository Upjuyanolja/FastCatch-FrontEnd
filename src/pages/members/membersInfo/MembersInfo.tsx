import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

import "./membersInfo.scss";

const MembersInfo = () => {
  const userInfo = useRecoilValue(userState);

  return (
    <div className="members-info">
      <div className="members-info__header">
        <h5 className="text-subtitle5">개인 정보</h5>
        <button className="members-info__modify text-body2"></button>
      </div>
      <div className="members-info__body">
        <div className="members-info__item">
          <label htmlFor="email" className="members-info__title">
            이메일
          </label>
          <div className="members-info__input">
            <input
              id="email"
              type="text"
              className="members-info__value text-body1"
              disabled
              value={userInfo?.email}
            />
          </div>
        </div>
        <div className="members-info__item">
          <label htmlFor="name" className="members-info__title">
            이름
          </label>
          <div className="members-info__input">
            <input
              id="name"
              type="text"
              className="members-info__value text-body1"
              disabled={true}
              value={userInfo?.name}
            />
          </div>
        </div>
        <div className="members-info__item">
          <label htmlFor="nickName" className="members-info__title">
            닉네임
          </label>
          <div className="members-info__input">
            <input
              id="nickName"
              type="text"
              className="members-info__value text-body1"
              disabled={true}
              value={userInfo?.nickname}
            />
          </div>
        </div>
        <div className="members-info__item">
          <label htmlFor="userPhoneNumber" className="members-info__title">
            휴대폰 번호
          </label>
          <div className="members-info__input">
            <input
              id="userPhoneNumber"
              type="text"
              className="members-info__value text-body1"
              disabled={true}
              value={userInfo?.phone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersInfo;
