import React from "react";
import { Link } from "react-router-dom";
// import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div class="footer bg-dark shadow-lg pt-5 pb-5 text-white-50 text-center text-md-start">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <div class="info mb-5">
                <p class="mb-5">
                  Pellentesque in ipsum id rci porta dapibus. Vivamus magna
                  lacinia eget consectetur sed, convallis at tellus.
                </p>
                <div class="copyright">
                  Created By <span>Graphberry</span>
                  <div>
                    © 2022 - <span>Inc</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="links ms-5">
                <h5 class="text-light">Links</h5>
                <ul class="list-unstyled lh-lg">
                  <li>Links</li>
                  <li>Home</li>
                  <li>Our Services</li>
                  <li>Portfolio</li>
                  <li>Testimonials</li>
                  <li>Support</li>
                  <li>Terms and Condition</li>
                </ul>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="contact">
                <h5 class="text-light">Contact Us</h5>
                <p class="mb-5 mb-3 lh-lg">
                  Get in touch with us via mail phone.We are waiting for your
                  call or message
                </p>
                <ul class="d-flex list-unstyled gap-4 mt-5 ">
                  <li>
                    <Link href="#" class="d-block text-light">
                      <i class="fa-brands facebook fa-facebook p-2 rounded-circle"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" class="d-block text-light">
                      <i class="fa-brands fa-twitter twitter p-2 rounded-circle"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" class="d-block text-light">
                      <i class="fa-brands fa-linkedin linkedin p-2 rounded-circle "></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" class="d-block text-light">
                      <i class="fa-brands fa-youtube youtube p-2 rounded-circle"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
