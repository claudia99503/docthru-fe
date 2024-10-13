import styles from './Profile.module';
import Image from 'next/image';
import assets from '@/variables/images';

export default function Profile() {
  <div>
    <Image src={assets.images.profileMember} width={32} height={32} />
    <div>
      <span>{user.nickName || 기본사용자}</span>
      <span>{user.grade || 일반}</span>
    </div>
  </div>;
}
