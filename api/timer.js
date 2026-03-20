module.exports = (req, res) => {
  // 1. DYNAMISK DATO: Nu kan du skrive ?date=2026-04-19 i dit link!
  // Hvis du ikke skriver noget, bruger den din standard-dato:
  const targetDate = req.query.date ? new Date(req.query.date) : new Date("2026-04-19T23:59:59");
  
  const nu = new Date();
  const forskel = targetDate.getTime() - nu.getTime();

  let tekst = "TILBUDDET ER SLUT";
  if (forskel > 0) {
    const d = Math.floor(forskel / (1000 * 60 * 60 * 24));
    const h = Math.floor((forskel % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((forskel % (1000 * 60 * 60)) / (1000 * 60));
    
    // Vi gør tallene pænere (f.eks. 05 i stedet for 5)
    const timer = h < 10 ? '0' + h : h;
    const minutter = m < 10 ? '0' + m : m;
    
    tekst = `${d} DAGE : ${timer} TIMER : ${minutter} MIN`;
  }

  // 2. DESIGNET (SVG med Vibe)
  // Her kan du rette fill="#000000" til din brand-farve
  const svg = `
    <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="10" fill="url(#grad)" />
      
      <text x="50%" y="30" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="bold" fill="#888" text-anchor="middle" letter-spacing="2">
        TID TILBAGE
      </text>
      
      <text x="50%" y="70" font-family="Courier New, monospace" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">
        ${tekst}
      </text>
      
      <rect x="10%" y="85" width="80%" height="1" fill="#444" />
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.send(svg);
};
