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
import { signOut } from '../utils/auth';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navbar className="navBarComp" id="navBarComp" collapseOnSelect expand="lg">
      <Container className="nav-text-cont">
        <Link passHref href="/home">
          <Navbar.Brand className="nav-bar-brand">LoveLink</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-bar-links">
            <Link passHref href="/home">
              <Nav.Link className="nav-link">Home</Nav.Link>
            </Link>
            <Link passHref href="/Journal">
              <Nav.Link className="nav-link">Journal</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link className="nav-link" onClick={resetUnviewedNotifsCount}>
                Profile <span className="notification-count">{unviewedNotifsCount > 0 && `${unviewedNotifsCount}`}</span>
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-auto">
          <button type="button" className="sign-out-nav" onClick={signOut}>
            Sign Out
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
}
