import React from 'react';

function Footer() {
  return (
    <footer className="bg-secondary py-5">
      <div className="container ">
        <div className="row">
          <div className="col-md-4">
            <h4 className="font-weight-bold">About Us</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula dolor id tellus ornare, at fermentum risus egestas.</p>
          </div>
          <div className="col-md-4">
            <h4 className="font-weight-bold">Contact Us</h4>
            <ul className="list-unstyled">
              <li>Phone: 555-555-5555</li>
              <li>Email: info@example.com</li>
              <li>Address: 123 Main Street, Anytown, USA</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="font-weight-bold">Follow Us</h4>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#"><i className="fab fa-facebook-square fa-2x"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="fab fa-twitter-square fa-2x"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="fab fa-instagram fa-2x"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;