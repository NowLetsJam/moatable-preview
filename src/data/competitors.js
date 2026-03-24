/**
 * Recommended competitor list (Beverly Hills area)
 * badge: 'top-local' = Area traffic top, 'shared-kw' = Has shared keywords
 * traffic: Average monthly organic search visits (estimated)
 * Default selected id 1-5 (top 5 by traffic)
 */
export const recommendedCompetitors = [
  { id: 1, name: 'The Beverly Hills Estates', url: 'thebeverlyhillsestates.com', traffic: 42000, badge: 'top-local' },
  { id: 2, name: 'Hilton & Hyland',           url: 'hiltonandhyland.com',         traffic: 38500, badge: 'shared-kw' },
  { id: 3, name: 'The Agency RE',             url: 'theagencyre.com',             traffic: 31200, badge: 'top-local' },
  { id: 4, name: 'Carolwood Estates',         url: 'carolwoodestates.com',        traffic: 28700, badge: 'shared-kw' },
  { id: 5, name: 'Douglas Elliman BH',        url: 'elliman.com/beverly-hills',   traffic: 24100, badge: 'top-local' },
  { id: 6, name: 'Compass Beverly Hills',     url: 'compass.com/ca/beverly-hills',traffic: 19800, badge: 'shared-kw' },
  { id: 7, name: "Sotheby's Int'l Realty",    url: 'sothebysrealty.com/los-angeles', traffic: 15600, badge: 'shared-kw' },
  { id: 8, name: 'Rodeo Realty',              url: 'rodeore.com',                 traffic: 12300, badge: 'shared-kw' },
  { id: 9, name: 'Aaroe Estates',             url: 'aaroe.com',                   traffic: 8900,  badge: 'top-local' },
  { id: 10, name: 'Beverly Glen Realty',      url: 'beverlyglenrealty.com',       traffic: 6200,  badge: 'top-local' },
]

export const defaultSelectedIds = new Set([1, 2, 3, 4, 5])

/** Market share mock data (onboarding Your Competition step) */
export const marketShareData = [
  { name: 'The Beverly Hills Estates', share: 37, color: '#b91c1c' },
  { name: 'Hilton & Hyland',           share: 21, color: '#dc2626' },
  { name: 'The Agency RE',             share: 15, color: '#f87171' },
  { name: 'Carolwood Estates',         share: 11, color: '#fecaca' },
  { name: 'Alan Potter',                   share: 13, color: '#fee2e2' },
  { name: 'You',                         share: 3,  color: '#1d4ed8' },
]
