import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#eff3fd] border-t-2 border-gray-600  ">
      <Box className="container mx-auto px-6 py-12">
        <Box className="flex flex-wrap justify-between gap-2 ">
          {/* Quick Links */}
          <Box>
            <Typography variant="h6" className="font-semibold mb-4">
              Quick Links
            </Typography>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-gray-600">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-gray-600">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-600">
                  Contact
                </Link>
              </li>
            </ul>
          </Box>

          {/* Resources */}
          <Box>
            <Typography variant="h6" className="font-semibold mb-4">
              Resources
            </Typography>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="hover:text-gray-600">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/clubs" className="hover:text-gray-600">
                  Clubs
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-gray-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-gray-600">
                  Library
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gray-600">
                  FAQs
                </Link>
              </li>
            </ul>
          </Box>

          {/* Contact Information */}
          <Box>
            <Typography variant="h6" className="font-semibold mb-4">
              Contact Us
            </Typography>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-600" />
                <a
                  href="mailto:info@wucs.edu.et"
                  className="hover:text-gray-600"
                >
                  info@wucs.edu.et
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-600" />
                <a href="tel:+251911234567" className="hover:text-gray-600">
                  +251 911 234 567
                </a>
              </li>
              <li className="flex items-center">
                <LocationOn className="mr-2 h-5 w-5 text-gray-600" />
                <span>Wolkite, Ethiopia</span>
              </li>
            </ul>
          </Box>

          {/* Social Media Links */}
          <Box>
            <Typography variant="h6" className="font-semibold mb-4">
              Follow Us
            </Typography>
            <Box className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box className="mt-12 pt-6 border-t border-gray-300 text-center">
          <Typography variant="body2" className="text-gray-600">
            &copy; {new Date().getFullYear()} Wolkite University Community
            School. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
