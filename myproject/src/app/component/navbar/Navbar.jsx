import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export const Navbar = () => {
    const [authModel, setAuthModel] = useState(false);
    const router = useRouter()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow" style={{ width: '100%', background: 'linear-gradient(145deg,rgb(116, 173, 238), #5560ea)' }}>
            <div className="container">
                {/* Logo */}
                {/* <a className="navbar-brand" href="/">
              <img
                src="https://via.placeholder.com/50"
                alt="Logo"
                className="d-inline-block align-text-top"
              />
              MyWebsite
            </a> */}

                {/* Toggler for Mobile View */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/services">
                                Services
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">
                                Contact
                            </a>
                        </li>
                    </ul>

                    {/* Buttons */}
                    <div className="d-flex">
                        <img onClick={()=>{setAuthModel(ele => {return ele?false:true} )}} style={{ width: '50px', height: '50px', borderRadius: '500px',cursor:'pointer' }} src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid" alt="" />
                        {authModel && (
                            <div className="auth">
                                
                                    <button onClick={()=>{
                                        router.push('/Auth/login')
                                    }}>Login</button>
                                
                                
                                    <button onClick={()=>{router.push('/Auth/Signin')}}>Sign In</button>
                                
                            </div>
                        )}
                  
                </div>
            </div>
        </div>
        </nav >
      );
}
