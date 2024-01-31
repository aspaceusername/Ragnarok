import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {Container,Navbar, Offcanvas,Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './Navbar.css';
import { useAuth } from './Paginas/AuthContext';
import SearchBar from './SearchBar';

export function Navbarapp () {
    const { isLoggedIn, userEmail, logout } = useAuth();
    //Search -------------
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch existing users from your API
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://sheetdb.io/api/v1/6ynr12flm6ov8');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    try {
      if (searchQuery.trim() !== '') {
        const filteredResults = users.filter((user) => user.Email.includes(searchQuery));
        setSearchResults(filteredResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching users:', error.message);
    }
  };
  

  useEffect(() => {
  }, [searchResults]);
    
    //CLOCK -------------------------
    const [showTime, setShowTime] = useState('');
    const updateClock = () => {
        const date = new Date();
        
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true, // Use 24-hour format
    }
        const dateTimeString = date.toLocaleString('en-US', options);
        setShowTime(dateTimeString);
    };

    useEffect(() => {
        // CLOCK
        updateClock();
        //UPDATES DO CLOCK
        const intervalId = setInterval(updateClock, 1000);
    }, []);

    //END OF CLOCK -------------------------
    //BARRA LATERAL -------------------------
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleToggle = () => {
        setShowOffcanvas(!showOffcanvas);
    };
    
    const [isVisible, setIsVisible] = useState(false);
    //END OF BARRA LATERAL -------------------------
    //BACK TO TOP BUTTON -------------------------
    const buttonStyle = {
        display: isVisible ? 'inline-block' : 'none',
        position: 'fixed',
        bottom: '25px',
        left: '50%',
        transform: 'translateX(-50%)', 
        zIndex: 10,
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Use smooth scrolling
        });
    };

    useEffect(() => {
        //BACK TO TOP VISIVEL QUANDO USER FAZ SCROLL
        const handleScroll = () => {
            setIsVisible(window.scrollY > 20);
        };

        //EVENTLISTENER NO SCROLL PARA A HANDLESCROLL
        window.addEventListener('scroll', handleScroll);
    }, []);
    //END OF BACK TO TOP BUTTON -------------------------
    return (
        <header className='navbar_Header'>

            {/*barra de navegação*/}
            <Container fluid className="container">
            <Link to="/">
                <img src="/logo.png" alt="Logo" className="logo_Img"/> 
            </Link>
            </Container>
            <nav className="navbar navbar-expand-sm bg-light">
                <Container fluid>
                    
                    <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <>
                                {/*botões para alternar entre páginas*/}
                                <Button variant="white" onClick={handleToggle}>
                                    <span className="navbar-toggler-icon"></span>
                                </Button>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Profile">Welcome back, {userEmail}</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={logout}>
                                        Logout
                                    </button>
                                </li>

                                <li className="nav-item push">
                                    <span align="center" className="nav-link">{showTime}</span>
                                </li>
                                <SearchBar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    handleSearch={handleSearch}
                                    searchResults={searchResults}
                                />

                                {searchQuery.trim() !== '' && searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map((user) => (
                                    <div key={user.Email}>
                                    </div>
                                    ))}
                                </div>
                                )}


                            </>
                        ):(
                            <>
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                handleSearch={handleSearch}
                                searchResults={searchResults}
                            />

                                {searchQuery && searchResults.length > 0 && (
                                    <div className="search-results">
                                        {searchResults.map((user) => (
                                        <div key={user.Email}>
                                        </div>
                                        ))}
                                    </div>
                                )}

                                <Button variant="white" onClick={handleToggle}>
                                    <span className="navbar-toggler-icon"></span>
                                </Button>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className ="nav-link push" to="/Signup">Register</Link>
                                </li>
                                <li className="nav-item push">
                                    <span align="center" className="nav-link">{showTime}</span>
                                </li>
                            </>
                        )}
                    </ul>
                </Container>
            </nav>
            <div>
                           
        
        </div>
        {/*fim de barra de navegação*/}

        {/*botão back to top*/}
        <Button id="back-to-top" style={buttonStyle} onClick={scrollToTop} className="btn btn-light btn-lg back-to-top" >
         Top   
        </Button>
        {/*fim de botão back to top*/}

        {/*barra lateral*/}
        <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} className="offcanvas-style"> 
            <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
            <ul className="offcanvas-body">
                <li>
                <Link className="offcanvas-link" to="/forum/General" onClick={handleToggle}>General</Link>
                </li>
                <li>
                <Link className="offcanvas-link" to="/forum/Rules" onClick={handleToggle}>Server Rules</Link>
                </li>
                <li>
                <Link className="offcanvas-link" to="/forum/Guilds" onClick={handleToggle}>Guilds</Link>
                </li>
                {/* Add more topics as needed */}
            </ul>
            </Offcanvas.Body>

        </Offcanvas>
        {/*fim de barra lateral*/}

        </header>

    );
}

export default Navbarapp;

