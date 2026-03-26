import { useState } from "react";
import { MapPin, Phone, Star, Search, UserRound, Loader2, AlertCircle, Globe, Navigation } from "lucide-react";
import { getDoctorsByPincode, type Doctor } from "@/data/doctors";

interface LiveDoctor {
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  distance: number;
  rating: number;
  lat: number;
  lon: number;
  source: "live" | "fallback";
}

async function geocodePincode(pincode: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&limit=1`,
      { headers: { "User-Agent": "NaturopathyAIApp/1.0" } }
    );
    const data = await res.json();
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    return null;
  } catch {
    return null;
  }
}

async function fetchNearbyDoctors(lat: number, lon: number): Promise<LiveDoctor[]> {
  const query = `
    [out:json][timeout:10];
    (
      node["amenity"="doctors"](around:5000,${lat},${lon});
      node["amenity"="clinic"](around:5000,${lat},${lon});
      node["amenity"="hospital"](around:5000,${lat},${lon});
      node["healthcare"="doctor"](around:5000,${lat},${lon});
      node["healthcare"="alternative"](around:5000,${lat},${lon});
    );
    out body;
  `;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `data=${encodeURIComponent(query)}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (!res.ok) throw new Error("Overpass API failed");
  const data = await res.json();

  return data.elements
    .filter((el: any) => el.tags?.name)
    .map((el: any, i: number) => {
      const dist = haversine(lat, lon, el.lat, el.lon);
      const tags = el.tags || {};
      return {
        id: `live-${el.id || i}`,
        name: tags.name || "Unknown Clinic",
        specialty: tags["healthcare:speciality"] || tags.healthcare || tags.amenity || "General",
        address: [tags["addr:street"], tags["addr:city"]].filter(Boolean).join(", ") || "Address not listed",
        phone: tags.phone || tags["contact:phone"] || "Not available",
        distance: Math.round(dist * 10) / 10,
        rating: 0,
        lat: el.lat,
        lon: el.lon,
        source: "live" as const,
      };
    })
    .sort((a: LiveDoctor, b: LiveDoctor) => a.distance - b.distance)
    .slice(0, 15);
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fallbackToLocal(pincode: string): LiveDoctor[] {
  return getDoctorsByPincode(pincode).map((d: Doctor) => ({
    id: d.id,
    name: d.name,
    specialty: d.specialty,
    address: d.hospital,
    phone: d.phone,
    distance: d.distance,
    rating: d.rating,
    lat: 0,
    lon: 0,
    source: "fallback" as const,
  }));
}

const DoctorsPage = () => {
  const [pincode, setPincode] = useState("");
  const [doctors, setDoctors] = useState<LiveDoctor[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState<"live" | "fallback" | "">("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length < 3) return;

    setLoading(true);
    setError("");
    setDoctors([]);
    setSearched(true);

    try {
      const coords = await geocodePincode(pincode.trim());
      if (!coords) throw new Error("Could not locate pincode");

      const live = await fetchNearbyDoctors(coords.lat, coords.lon);
      if (live.length > 0) {
        setDoctors(live);
        setSource("live");
      } else {
        setDoctors(fallbackToLocal(pincode.trim()));
        setSource("fallback");
      }
    } catch {
      setDoctors(fallbackToLocal(pincode.trim()));
      setSource("fallback");
      setError("Live data unavailable — showing local suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Nearby Doctors</h1>
      <p className="text-sm text-muted-foreground mb-6">Real-time doctor & clinic search powered by OpenStreetMap</p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter your pincode"
            disabled={loading}
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-soft disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-soft hover:shadow-elevated transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs mb-4">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {!searched ? (
        <div className="text-center py-16">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
          <p className="text-sm text-muted-foreground">Enter your pincode to find nearby doctors</p>
          <p className="text-xs text-muted-foreground mt-1">Try any Indian pincode (e.g. 110001, 400001, 560001)</p>
        </div>
      ) : loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
          <p className="text-sm text-muted-foreground">Searching nearby doctors & clinics…</p>
          <p className="text-xs text-muted-foreground mt-1">Querying OpenStreetMap data</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">
              {doctors.length} result{doctors.length !== 1 ? "s" : ""} near {pincode}
            </p>
            <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
              {source === "live" ? <Globe className="w-3 h-3" /> : <Navigation className="w-3 h-3" />}
              {source === "live" ? "Live data" : "Local data"}
            </span>
          </div>

          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
              <p className="text-sm text-muted-foreground">No doctors found for this area</p>
            </div>
          ) : (
            doctors.map((doc) => (
              <div key={doc.id} className="p-4 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elevated transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UserRound className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm truncate">{doc.name}</h3>
                        <p className="text-xs text-primary font-medium capitalize">{doc.specialty}</p>
                      </div>
                      {doc.source === "live" && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold flex-shrink-0">
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{doc.address}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {doc.distance} km
                      </span>
                      {doc.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-accent" /> {doc.rating}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {doc.phone}
                      </span>
                    </div>
                    {doc.source === "live" && doc.lat !== 0 && (
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${doc.lat}&mlon=${doc.lon}#map=17/${doc.lat}/${doc.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[11px] text-primary font-medium hover:underline"
                      >
                        <Globe className="w-3 h-3" /> View on map
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
