import * as Route from '@/constants/routes';
import logo from '@/images/logo-full.png';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP
  ];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Developed by
            {' '}
            <a target='_blank' href="www.linkedin.com/in/amrit-mishra-1b8bb518a">Amrit Mishra</a> and
            <a target="_blank" href="www.linkedin.com/in/anurag-mishra-840619217">ANURAG MISHRA</a>
          </span>
        </strong>
      </div>
      <div className="footer-col-2">
        <img alt="Footer logo" className="footer-logo" src={logo} />
        <h5>
          all rights reserved
          &copy;&nbsp;
          {new Date().getFullYear()}
        </h5>
      </div>
      <div className="footer-col-3">
        <strong>
          <span>
            Road 9, ADITYAPUR CITY, 
            Adityapur - 831013
          </span>
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
