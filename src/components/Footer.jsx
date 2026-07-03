const Footer = () => {
  return (
    <footer className="bg-[#0a0a0e] border-t border-border pt-16 pb-8 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Press</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Blog</a></li>
            </ul>
          </div>
          {}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Account</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>
          {}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">DMCA</a></li>
            </ul>
          </div>
          {}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Social</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Twitter / X</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Instagram</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">YouTube</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        {}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-2xl font-bold text-primary tracking-wider">CINEVERSE</p>
          <p className="text-text-muted text-sm">© 2026 CineVerse. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
