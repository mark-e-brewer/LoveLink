/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import { getUsersUnviewedNotifs } from '../API/Promises';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  const [unviewedNotifsCount, setUnviewedNotifsCount] = useState(0);

  const fetchUnviewedNotifsCount = async () => {
    try {
      const unviewedNotifs = await getUsersUnviewedNotifs(user?.id);
      setUnviewedNotifsCount(unviewedNotifs.length);
    } catch (error) {
      console.error('Error fetching unviewed notifications:', error);
    }
  };

  const resetUnviewedNotifsCount = () => {
    setUnviewedNotifsCount(0);
  };

  useEffect(() => {
    fetchUnviewedNotifsCount();
    const intervalId = setInterval(fetchUnviewedNotifsCount, 90 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Navbar className="navBarComp" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Love-Link</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/home">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link onClick={resetUnviewedNotifsCount}>
                Profile {unviewedNotifsCount > 0 && `(${unviewedNotifsCount})`}
              </Nav.Link>
            </Link>
            <Link passHref href="/Journal">
              <Nav.Link>Journal</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
