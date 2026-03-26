export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  phone: string;
  pincode: string;
  distance: number; // km
  rating: number;
  available: boolean;
}

// Mock dataset keyed by pincode prefix (first 3 digits)
const doctorsByArea: Record<string, Doctor[]> = {
  "110": [
    { id: "d1", name: "Dr. Anita Sharma", specialty: "Naturopathy & Yoga", hospital: "Nature Cure Centre", phone: "+91 98100-XXXXX", pincode: "110001", distance: 1.2, rating: 4.8, available: true },
    { id: "d2", name: "Dr. Rajesh Gupta", specialty: "Ayurveda", hospital: "Holistic Health Clinic", phone: "+91 98110-XXXXX", pincode: "110005", distance: 2.5, rating: 4.5, available: true },
    { id: "d3", name: "Dr. Priya Verma", specialty: "Acupuncture", hospital: "Wellness Point", phone: "+91 98120-XXXXX", pincode: "110010", distance: 3.1, rating: 4.6, available: false },
    { id: "d4", name: "Dr. Sunil Mehta", specialty: "Homeopathy", hospital: "Natural Remedies Hospital", phone: "+91 98130-XXXXX", pincode: "110015", distance: 4.8, rating: 4.3, available: true },
  ],
  "400": [
    { id: "d5", name: "Dr. Kavita Desai", specialty: "Naturopathy", hospital: "Mumbai Nature Clinic", phone: "+91 98200-XXXXX", pincode: "400001", distance: 0.8, rating: 4.9, available: true },
    { id: "d6", name: "Dr. Amit Patel", specialty: "Ayurveda & Panchkarma", hospital: "Ayur Wellness", phone: "+91 98210-XXXXX", pincode: "400010", distance: 2.0, rating: 4.7, available: true },
    { id: "d7", name: "Dr. Sneha Joshi", specialty: "Yoga Therapy", hospital: "Holistic Life Centre", phone: "+91 98220-XXXXX", pincode: "400020", distance: 3.5, rating: 4.4, available: true },
  ],
  "560": [
    { id: "d8", name: "Dr. Ramesh Rao", specialty: "Naturopathy", hospital: "Bangalore Nature Cure", phone: "+91 99000-XXXXX", pincode: "560001", distance: 1.5, rating: 4.6, available: true },
    { id: "d9", name: "Dr. Lakshmi Nair", specialty: "Siddha Medicine", hospital: "Traditional Healing Hub", phone: "+91 99010-XXXXX", pincode: "560010", distance: 2.8, rating: 4.5, available: false },
    { id: "d10", name: "Dr. Venkat Reddy", specialty: "Unani & Naturopathy", hospital: "Integrated Medicine Clinic", phone: "+91 99020-XXXXX", pincode: "560020", distance: 4.2, rating: 4.3, available: true },
  ],
};

// Fallback doctors for any pincode
const fallbackDoctors: Doctor[] = [
  { id: "df1", name: "Dr. Meena Kumari", specialty: "General Naturopathy", hospital: "Community Health Centre", phone: "+91 90000-XXXXX", pincode: "000000", distance: 5.0, rating: 4.2, available: true },
  { id: "df2", name: "Dr. Arun Singh", specialty: "Ayurveda", hospital: "Ayurvedic Hospital", phone: "+91 90010-XXXXX", pincode: "000000", distance: 6.5, rating: 4.1, available: true },
  { id: "df3", name: "Dr. Pooja Nath", specialty: "Yoga & Naturopathy", hospital: "Wellness Ashram", phone: "+91 90020-XXXXX", pincode: "000000", distance: 8.0, rating: 4.0, available: true },
];

export function getDoctorsByPincode(pincode: string): Doctor[] {
  const prefix = pincode.slice(0, 3);
  const doctors = doctorsByArea[prefix] || fallbackDoctors;
  // Randomize distances slightly based on actual pincode
  const seed = parseInt(pincode.slice(-3)) || 1;
  return doctors
    .map((d) => ({ ...d, distance: Math.round((d.distance + (seed % 3) * 0.5) * 10) / 10 }))
    .sort((a, b) => a.distance - b.distance);
}
