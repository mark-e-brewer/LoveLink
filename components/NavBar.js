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
  const [currUser, setCurrUser] = useState({});
  const [partnerUser, setPartnerUser] = useState({});
  const [isUserLinked, setIsUserLinked] = useState(false);

  const getTheCurrentUser = () => {
    getUserByUid(user.uid)
      .then((data) => setCurrUser(data));
  };

  const getThisUserPartner = () => {
    getUserById(currUser.partnerId)
      .then((data) => setPartnerUser(data));
  };

  useEffect(() => {
    getTheCurrentUser();
  }, [user]);

  useEffect(() => {
    if (currUser.partnerId != null) {
      getThisUserPartner();
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (currUser.partnerId === partnerUser.id) {
      console.log('Linked');
      setIsUserLinked(true);
    } else {
      console.log('Not Linked');
      setIsUserLinked(false);
      getTheCurrentUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(partnerUser);
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
