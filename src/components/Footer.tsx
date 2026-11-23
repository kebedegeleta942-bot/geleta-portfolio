import { profile } from "../data/profile";
import { navItems } from "./Navbar";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-bold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.tagline}</p>
          <SocialIcons className="mt-5" />
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-muted transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-xs text-muted">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
