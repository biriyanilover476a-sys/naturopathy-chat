import { useState } from "react";
import { MapPin, Phone, Star, Search, UserRound } from "lucide-react";
import { getDoctorsByPincode, type Doctor } from "@/data/doctors";

const DoctorsPage = () => {
  const [pincode, setPincode] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length < 3) return;
    setDoctors(getDoctorsByPincode(pincode.trim()));
    setSearched(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Nearby Doctors</h1>
      <p className="text-sm text-muted-foreground mb-6">Find naturopathy & holistic doctors near you</p>

      {/* Pincode Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter your pincode"
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-soft"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-soft hover:shadow-elevated transition-all active:scale-95"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Results */}
      {!searched ? (
        <div className="text-center py-16">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
          <p className="text-sm text-muted-foreground">Enter your pincode to find nearby doctors</p>
          <p className="text-xs text-muted-foreground mt-1">Try: 110001, 400001, or 560001</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground mb-2">{doctors.length} doctor{doctors.length !== 1 ? "s" : ""} found near {pincode}</p>
          {doctors.map((doc) => (
            <div key={doc.id} className="p-4 rounded-2xl bg-card border border-border shadow-soft">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UserRound className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{doc.name}</h3>
                      <p className="text-xs text-primary font-medium">{doc.specialty}</p>
                    </div>
                    {doc.available ? (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold flex-shrink-0">Available</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-semibold flex-shrink-0">Unavailable</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{doc.hospital}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {doc.distance} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent" /> {doc.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {doc.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
