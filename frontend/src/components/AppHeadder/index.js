import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { cookie } from '../../context/collection'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { port } from '../../context/collection';
import { useLocation } from 'react-router-dom';

const AppHeader = () => {
  const location = useLocation();
  const { pathname } = location;
  const loc = pathname.split("/");
  const [tog, settog] = useState(false)
  const [cookies,] = useCookies([cookie]);
  const [scroll, setscroll] = useState(null);
  useEffect(() => {
    if (scroll) {
      window.scrollTo({
        top: 2550,
        behavior: 'smooth'
      })
      setscroll(null)
    }
  }, [scroll]);
  useEffect(() => {
    cookies.data1 && axios.get(port + '/api/getUser/' + cookies.data1).then((res) => {
      if (res.data !== false) {
        console.log(res.data);
        setuser(res.data)
      }
    })
  }, [cookies])
  const [user, setuser] = useState(0)
  return (
    <div>
      <header style={{ margin: '0px', marginTop: '0px', fontFamily: 'sans-serif', fontSize: '300px' }} id="header" className="fixed-top">
        <div className="container d-flex align-items-center">

          <div style={{paddingRight:'20px'}} className="logo"><a style={{ textDecoration: 'none' }} href="/dashboard"><img style={{width:'auto',height:'100px',paddingBottom:'10px'}} src={logo}/></a></div>
          <div style={{paddingLeft:'600px'}}><nav className="nav-menu d-none d-lg-block">
            <ul>
              <li className={loc[1] === 'dashboard' ? 'active' : null}><Link style={{ fontWeight: 'medium', textDecoration: 'none' }} to="/dashboard">Home</Link></li>
              <li className={loc[1] === 'blog' ? 'active' : null}><Link style={{ fontWeight: 'medium', textDecoration: 'none' }} to="/blog/chicken">Recipes</Link></li>
              <li className={loc[1] === 'about' ? 'active' : null}><Link style={{ fontWeight: 'medium', textDecoration: 'none' }} to="/about">About us</Link></li>
              <li className={loc[1] === 'fooddiary' ? 'active' : null}><Link style={{ fontWeight: 'medium', textDecoration: 'none' }} to="/fooddiary">Food diary</Link></li>
              <li className={loc[1] === 'login' ? 'active' : loc[1] === 'signup'?'active':null}>{user ? <Link to='/account' style={{ fontWeight: 'medium', textDecoration: 'none' }}>Account</Link> : <Link style={{ fontWeight: 'medium', textDecoration: 'none' }} to="/login">Signin</Link>}</li>
            </ul>
          </nav></div>
          
          {/* <!-- .nav-menu --> */}

        </div>

      </header>
    </div>
  )
}

export default AppHeader
