import profileImage270 from '../assets/profile-270.webp';
import profileImage540 from '../assets/profile-540.webp';
import profileImage810 from '../assets/profile-810.webp';

/**
 * Responsive WebP-Varianten des Profilbilds.
 *
 * Die Breiten 270/540/810 px decken 1x/2x/3x für die 270 px breite
 * Hero-Darstellung und die 256–288 px breite About-Darstellung ab.
 */
export const profileImages = {
  /** 1x – Hero bei 270 CSS px, About bei 256 CSS px. */
  small: profileImage270,
  /** 2x – Retina-Hero und About auf den meisten Displays. */
  medium: profileImage540,
  /** 3x – High-DPI-Displays. */
  large: profileImage810,
};

export const profileImageSrcSet = [
  `${profileImages.small} 270w`,
  `${profileImages.medium} 540w`,
  `${profileImages.large} 810w`,
].join(', ');

/** Fallback für Browser ohne srcSet-Unterstützung. */
export const profileImageFallback = profileImages.medium;
