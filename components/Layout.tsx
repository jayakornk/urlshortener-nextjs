import { useState } from 'react';

import { WithChildren } from '@/utils/withChildren';

import { Footer } from './Footer';
import { LoginModal } from './LoginModal';
import { Meta } from './Meta';
import { Navbar, NavbarMenuProps } from './Navbar';

type LayoutProps = WithChildren;

const menus: NavbarMenuProps[] = [
  { label: 'Dashboard', href: '/' },
  // { label: 'Team', href: '/team' },
  // { label: 'Projects', href: '/projects' },
  // { label: 'Calendar', href: '/calendar' },
];

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleAvatarClick = () => {
    setOpenLoginModal(true);
  };

  return (
    <>
      <Meta />
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
      <Navbar menus={menus} openLogin={handleAvatarClick} />
      <div
        className="relative py-12 bg-blue-50"
        style={{ minHeight: 'calc(100vh - 8rem)' }}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};
