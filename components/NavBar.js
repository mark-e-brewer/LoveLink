/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUserById, getUserByUid } from '../API/Promises';

export default function NavBar() {
  const { user } = useAuth();
  const [isUserLinked, setIsUserLinked] = useState(false);

  const getTheCurrentUser = () => {
    getUserByUid(user.uid)?.then((data) => {
      if (data.partnerId != null) {
        getUserById(data.partnerId)?.then((partnerData) => {
          if (data?.partnerId === partnerData?.id) {
            setIsUserLinked(true);
          } else {
            setIsUserLinked(false);
            getTheCurrentUser();
          }
        });
      }
    });
  };

  useEffect(() => {
    getTheCurrentUser();
  }, []);

  return (
    <>
      {!isUserLinked ? (
        <>
          <Button className="d-flex justify-content-center text-center" onClick={signOut}>Sign-Out</Button>
        </>
      ) : (
        // Render content when user is linked
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Link passHref href="/">
              <Navbar.Brand>CHANGE ME</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Link passHref href="/">
                  <Nav.Link>Home</Nav.Link>
                </Link>
                <Link passHref href="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </Link>
                <Link passHref href="/Journal">
                  <Nav.Link>Journal</Nav.Link>
                </Link>
                <Button variant="danger" onClick={signOut}>
                  Sign Out
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}
