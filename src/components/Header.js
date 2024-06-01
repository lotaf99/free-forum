import { ActionIcon, Button, Drawer, Image, Title } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChartBar, Logout, Menu2 } from 'tabler-icons-react';
import { unsetUser } from '../rtk/feature/auth/authSlice';
import Container from './Container';

function HeaderDrawer() {
  const [opened, setOpened] = useState(false);
  const onClose = () => setOpened(false);
  const onOpen = () => setOpened(true);
  return (
    <div className="block lg:hidden">
      <ActionIcon onClick={onOpen}>
        <Menu2 color="white" />
      </ActionIcon>
      <Drawer opened={opened} onClose={onClose} position="right" title="Menu">
        <HeaderMenu />
      </Drawer>
    </div>
  );
}

function HeaderMenu() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <Link to="/leaderboard">
        <Button
          leftIcon={<ChartBar />}
          variant="filled"
          color="orange"
          className="w-full lg:w-min"
        >
          Leaderboard
        </Button>
      </Link>
      {user && (
        <Link to="/login" onClick={() => dispatch(unsetUser())}>
          <Button leftIcon={<Logout />} color="red">
            Logout
          </Button>
        </Link>
      )}
      {!user && (
        <>
          <Link to="/register">
            <Button variant="outline" color="gray" className="w-full text-black lg:w-min">
              Register
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="subtle"
              className="w-full bg-gray-500 text-white hover:!bg-gray-400 lg:w-min"
            >
              Login
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="relative flex flex-col bg-white-500 shadow h-20">
      <Container className="flex flex-row justify-between items-center">
        <Link to="/">
          <div className="relative h-12 w-12">
            <Image
              radius="md"
              src="/logo.png"
              alt="Random image"
              fit="fill"
            />
          </div>
        </Link>
        <Title order={3}>Forum Bebas</Title>
        <HeaderDrawer />
        <div className="hidden lg:block">
          <HeaderMenu />
        </div>
      </Container>
    </header>
  );
}

export default Header;
