// Her fortæller vi maskinen, hvordan den skal tegne
module.exports = (req, res) => {
  const slutDato = new Date("April 19, 2026 23:59:59").getTime();
  const nu = new Date().getTime();
  const forskel = slutDato - nu;

  // Lav teksten
  let tekst = "SLUT!";
  if (forskel > 0) {
    const dage = Math.floor(forskel / (1000 * 60 * 60 * 24));
    const timer = Math.floor((forskel % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutter = Math.floor((forskel % (1000 * 60 * 60)) / (1000 * 60));
    tekst = dage + "d " + timer + "t " + minutter + "m tilbage";
  }

  // Lav et billede med tekst (SVG er nemmest her)
  const svg = `
    <svg width="400" height="60" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="black" />
      <text x="50%" y="50%" font-family="Courier, monospace" font-size="24" fill="white" 
            text-anchor="middle" dominant-baseline="middle">
        ${tekst}
      </text>
    </svg>
  `;

  // Send billedet til e-mailen
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.send(svg);
};
