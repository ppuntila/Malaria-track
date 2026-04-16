const { useState, useEffect, useRef } = React;

const malariaData = {
  cases: [
    {
      id: 0,
      name: "นายเสกสรรค์ สมุติรัมย์",
      desc: "ป่วยจากระยอง เข้าพื้นที่ 18 มี.ค. 69",
      dateStr: "18 มี.ค. 2569",
      dateVal: "2026-03-18",
      address: "67/2 ม.7 ต.ทับไทร",
      status: "พักรักษาตัว",
      statusClass: "status-warning",
      lat: 12.905, lng: 102.245
    },
    {
      id: 2, // Sort order by date
      name: "นางคนึงนิต พุทธอุทัย",
      desc: "Case 2 Malaria P.V. (อายุ 53 ปี) มารพ. 8 เม.ย. 69",
      dateStr: "4 มี.ค. 2569",
      dateVal: "2026-03-04",
      address: "96/6 ม.1 ต.โป่งน้ำร้อน",
      status: "พบเชื้อ",
      statusClass: "status-active",
      lat: 12.924, lng: 102.256
    },
    {
      id: 1,
      name: "แรงงานพม่า",
      desc: "Case 1 Malaria P.V. มารพ. 5 เม.ย. 69",
      dateStr: "24 มี.ค. 2569",
      dateVal: "2026-03-24",
      address: "39/20 ม.1 ต.โป่งน้ำร้อน",
      status: "พบเชื้อ",
      statusClass: "status-active",
      lat: 12.918, lng: 102.252
    },
    {
      id: 3,
      name: "นางยุพา วงศ์ดา",
      desc: "Case 3 Malaria P.V. (อายุ 41 ปี) มารพ. 12 เม.ย. 69",
      dateStr: "7 เม.ย. 2569",
      dateVal: "2026-04-07",
      address: "1/8 ม.1 ต.โป่งน้ำร้อน (ทำงานตัดยาง ทับไทร)",
      status: "Admit",
      statusClass: "status-critical",
      lat: 12.901, lng: 102.251
    }
  ].sort((a, b) => new Date(a.dateVal) - new Date(b.dateVal)),
  temples: [
    { id: 't1', name: 'วัดป่าพงษ์เลิศ', lat: 12.922, lng: 102.254 },
    { id: 't2', name: 'วัดป่าคิรีธรรม', lat: 12.895, lng: 102.261 }
  ]
};

const mapCenter = [12.910, 102.255];

function MapComponent({ cases, temples }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    
    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    // Initialize map
    const map = L.map(mapRef.current).setView(mapCenter, 13);
    mapInstance.current = map;

    // Dark styled map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Add Temples and 2km Radius
    temples.forEach(temple => {
      // Create Custom Temple Icon
      const templeIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="custom-marker-dot temple-marker-dot"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      L.marker([temple.lat, temple.lng], { icon: templeIcon })
        .bindPopup(`<b>${temple.name}</b><br/>จุดอ้างอิงศูนย์กลาง`)
        .addTo(map);

      // Add 2km radius circle (2000 meters)
      L.circle([temple.lat, temple.lng], {
        color: '#a855f7',
        fillColor: '#a855f7',
        fillOpacity: 0.05,
        radius: 2000,
        weight: 1,
        dashArray: '5, 5'
      }).addTo(map);
    });

    // Add Case Markers
    cases.forEach(c => {
      let colorClass = c.statusClass === 'status-critical' ? '#f43f5e' : 
                       c.statusClass === 'status-warning' ? '#fbbf24' : '#3b82f6';
                       
      const caseIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="custom-marker-ping" style="background-color: ${colorClass}"></div>
          <div class="custom-marker-dot" style="background-color: ${colorClass}"></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker([c.lat, c.lng], { icon: caseIcon })
        .bindPopup(`
          <div style="font-family: 'Kanit';">
            <strong style="font-size:1.1em;color:${colorClass}">${c.name}</strong><br/>
            <span>${c.desc}</span><br/>
            <span style="color:#94a3b8;font-size:0.9em">${c.address}</span>
          </div>
        `)
        .addTo(map);
    });

  }, [cases, temples]);

  return <div id="map" ref={mapRef}></div>;
}

function App() {
  const [activeCase, setActiveCase] = useState(null);

  const stats = {
    total: 3,
    imported: 1,
    area: "พื้นที่ B1"
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          ระบบติดตามสถานการณ์โรคไข้มาลาเรีย
        </h1>
        <div className="header-stats">
          <div className="stat-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            ผู้ป่วย P.V. ยืนยัน: {stats.total} ราย
          </div>
          <div className="stat-badge" style={{background: 'rgba(251, 191, 36, 0.15)', borderColor: 'rgba(251, 191, 36, 0.3)', color: '#fde047', boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)'}}>
             {stats.area}
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="panel-card">
          <h2 className="panel-header">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ไทม์ไลน์ผู้ป่วย (Timeline)
          </h2>
          <div className="timeline-container">
            {malariaData.cases.map((c, index) => (
              <div 
                key={c.id} 
                className={`timeline-item ${activeCase === c.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveCase(c.id)}
                onMouseLeave={() => setActiveCase(null)}
              >
                <div className="timeline-dot"></div>
                <div className="case-card">
                  <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.5px', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {c.dateStr}
                  </div>
                  <div className="case-name" style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
                    {c.name}
                  </div>
                  <div className="case-detail" style={{ marginTop: '0.5rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {c.address}
                  </div>
                  <div className="case-detail">{c.desc}</div>
                  <div style={{ marginTop: '0.75rem' }}>
                    <span className={`status-pill ${c.statusClass}`}>{c.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card" style={{padding: '0.5rem'}}>
          <div className="map-wrapper">
             <MapComponent cases={malariaData.cases} temples={malariaData.temples} />
          </div>
        </section>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
