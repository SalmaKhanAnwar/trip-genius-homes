
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-8 px-6 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div>
          <h3 className="font-semibold text-sm mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
            <li><a href="#" className="hover:underline">Cancellation options</a></li>
            <li><a href="#" className="hover:underline">Report neighborhood concern</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-4">Hosting</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
            <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-4">Airbnb</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">New features</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Gift cards</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-4">Community</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline">Airbnb.org: disaster relief housing</a></li>
            <li><a href="#" className="hover:underline">Combating discrimination</a></li>
            <li><a href="#" className="hover:underline">Sustainability</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row md:justify-between items-center">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm mb-4 md:mb-0">
          <p>&copy; 2023 Airbnb, Inc.</p>
          <div className="hidden md:flex gap-1">
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
          <div className="hidden md:flex gap-1">
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <div className="hidden md:flex gap-1">
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", height: "16px", width: "16px"}} fill="currentColor"><path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.178 5.091a6.78 6.78 0 0 0 3.68-4.281l.01-.054zm-10.976-1.5h2.75c.091-1.96.53-3.783 1.178-5.091a6.78 6.78 0 0 0 -3.68 4.281l-.01.054zm2.75 1.5h-2.752c.091 1.96.53 3.783 1.178 5.091a6.78 6.78 0 0 0 3.68-4.281l.01-.054zm1.949-7.5h-.068c-.683 0-1.72 2.365-1.932 5.23h3.905c-.156-2.895-1.176-5.343-1.887-5.493l-.018-.007zm2.241 5.25h2.751c-.091-1.96-.53-3.783-1.178-5.091a6.78 6.78 0 0 0 -3.68 4.281l-.01.054zm-1.517-7.313c.246.835.437 1.76.567 2.748.398.25.75.834.966 1.527h1.949a6.27 6.27 0 0 0 -3.482-4.275zm-3.318 0a6.3 6.3 0 0 0 -3.48 4.275h1.948c.216-.693.568-1.277.966-1.527.13-.988.32-1.913.566-2.748zm4.342 12.826c-.247-.835-.437-1.76-.567-2.748-.398-.25-.75-.834-.966-1.527h-1.95a6.27 6.27 0 0 0 3.483 4.275zm-3.317 0a6.3 6.3 0 0 0 3.48-4.275h-1.949c-.216.693-.568 1.277-.966 1.527-.13.988-.32 1.913-.565 2.748z"></path></svg>
            <a href="#" className="hover:underline">English (US)</a>
          </div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", height: "16px", width: "16px"}} fill="currentColor"><path d="m8.002 0c-.08 0-.16 0-.24.004l-.083.007-.073.008c-4.484.412-7.998 4.168-7.998 8.742 0 4.834 3.923 8.765 8.758 8.765 4.834 0 8.758-3.93 8.758-8.765 0-4.576-3.514-8.331-8-8.742-.11-.01-.221-.02-.332-.02zm-.31 1.505h.044c.047 0 .094 0 .141.003 3.773.434 6.715 3.632 6.715 7.553 0 4.206-3.406 7.612-7.612 7.612-4.206 0-7.612-3.406-7.612-7.612 0-3.922 2.941-7.12 6.714-7.552.203-.023.407-.033.61-.004zm.151 2.521v4.308h3.231c.126 0 .211.086.211.213 0 .12-.097.21-.213.21h-3.23v.5h3.23c.126 0 .211.087.211.214 0 .12-.097.209-.213.209h-3.23v3.230c0 .127-.085.213-.212.213-.116 0-.21-.097-.21-.213v-3.23h-.5v3.23c0 .127-.085.213-.213.213-.116 0-.21-.097-.21-.213v-3.23h-.5v3.23c0 .127-.085.213-.212.213-.116 0-.21-.097-.21-.213v-3.23h-.5v3.23c0 .127-.085.213-.212.213-.116 0-.21-.097-.21-.213v-3.23h-3.23c-.127 0-.214-.086-.214-.213 0-.117.097-.21.213-.21h3.23v-.5h-3.23c-.127 0-.214-.086-.214-.213 0-.117.097-.21.213-.21h3.23v-4.308c0-.126.086-.213.213-.213.116 0 .21.097.21.213v4.308h.5v-4.308c0-.126.086-.213.213-.213.116 0 .21.097.21.213v4.308h.5v-4.308c0-.126.086-.213.212-.213.117 0 .212.097.212.213v4.308h.5v-4.308c0-.126.086-.213.212-.213.117 0 .211.097.211.213z"></path></svg>
            <a href="#" className="hover:underline">USD</a>
          </div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", height: "16px", width: "16px"}} fill="currentColor"><path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm7 9.08-9.5 9.5-4.5-4.5L6.88 17l6.62 6.62L25.12 12 23 9.88z"></path></svg>
            <a href="#" className="hover:underline">Support & resources</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
