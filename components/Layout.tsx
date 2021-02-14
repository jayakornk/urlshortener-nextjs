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
      <div className="flex flex-col min-h-screen">
        <Navbar menus={menus} openLogin={handleAvatarClick} />
        <main className="relative flex-1 py-12 bg-blue-50">{children}</main>
        <Footer />
      </div>
    </>
  );
};
