import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { contactInfo } from '../mock';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`Newsletter subscription for ${email} - Feature coming soon!`);
    e.target.reset();
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">Evidentia</span>
            </div>
            <p className="text-gray-300 mb-4">
              Transforming data into decisions through rigorous research and evidence-based solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-emerald-400 transition-colors">Services</Link></li>
              <li><Link to="/industries" className="text-gray-300 hover:text-emerald-400 transition-colors">Industries</Link></li>
              <li><Link to="/insights" className="text-gray-300 hover:text-emerald-400 transition-colors">Insights</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-emerald-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">{contactInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to our newsletter for the latest insights and research updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Evidentia Research Consultancy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;