import './Footer.css';
import IconTwitter from '../../../src/assets/icons/twitter.svg?react';
import IconInstagram from '../../../src/assets/icons/instagram.svg?react';
import IconFacebook from '../../../src/assets/icons/facebook.svg?react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const socialNetworks: SocialNetwork[] = [
  {
    name: 'twitter',
    icon: <IconTwitter />,
    link: 'https://x.com/',
  },
  {
    name: 'instagram',
    icon: <IconInstagram />,
    link: 'https://www.instagram.com/',
  },
  {
    name: 'facebook',
    icon: <IconFacebook />,
    link: 'https://www.facebook.com/',
  },
];

const contacts: Contact[] = [
  {
    name: 'map',
    iconPath: '../../../src/assets/icons/map.svg',
    text: '8558 Green Rd., LA',
    link: 'https://maps.app.goo.gl/m9LKYuU6HcqbPURk9',
    isExternal: true,
  },
  {
    name: 'phone',
    iconPath: '../../../src/assets/icons/phone.svg',
    text: '+1 (603) 555-0123',
    link: 'tel:+16035550123',
  },
  {
    name: 'business hours',
    iconPath: '../../../src/assets/icons/clock.svg',
    text: 'Mon-Sat: 9:00 AM – 23:00 PM',
  },
];

export function Footer() {
  const renderContacts = (contacts: Contact[]) => {
    const className = 'contact-item';

    return contacts.map((c) => {
      const imgElement = <img src={c.iconPath} alt={`${c.name} icon`} />;

      if (c.link && c.isExternal) {
        return (
          <a
            key={c.name}
            className={className}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {imgElement}
            <span>{c.text}</span>
          </a>
        );
      }

      if (c.link) {
        return (
          <Link key={c.name} className={className} to={c.link}>
            {imgElement}
            <span>{c.text}</span>
          </Link>
        );
      }

      return (
        <div key={c.name} className={className}>
          {imgElement}
          <span>{c.text}</span>
        </div>
      );
    });
  };

  return (
    <footer className="footer">
      <div className="item">
        <h2>
          Sip, Savor, Smile. <span className="accent">It’s coffee time!</span>
        </h2>
        <div className="social-networks">
          {socialNetworks.map((s) => {
            return (
              <a
                key={s.name}
                className="icon no-underline button round"
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            );
          })}
        </div>
      </div>
      <div className="item" id="contact-us">
        <h3>Contact us</h3>
        <div className="contacts">{renderContacts(contacts)}</div>
      </div>
    </footer>
  );
}

interface Contact {
  name: string;
  iconPath: string;
  text: string;
  isExternal?: boolean;
  link?: string;
}

interface SocialNetwork {
  name: string;
  icon: ReactNode;
  link: string;
}
