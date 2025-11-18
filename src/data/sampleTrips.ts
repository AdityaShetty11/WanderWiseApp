export interface SampleActivity {
  time: string;
  category: string;
  name: string;
  location: string;
}

export interface SampleDay {
  day: string;
  date: string;
  activities: SampleActivity[];
}

export interface SampleTrip {
  id: string;
  title: string;
  destination: string;
  dates: string;
  days: number;
  accent: string;
  flag: string;
  image: string;
  itinerary: SampleDay[];
}

export const SAMPLE_TRIPS: SampleTrip[] = [
  {
    id: "tokyo",
    title: "7 days in Tokyo",
    destination: "Tokyo, Japan",
    dates: "Jun 1 – Jun 7",
    days: 7,
    accent: "#378ADD",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=70",
    itinerary: [
      {
        day: "Day 1", date: "Jun 1",
        activities: [
          { time: "09:00", category: "Sightseeing", name: "Senso-ji Temple", location: "Asakusa" },
          { time: "12:30", category: "Food", name: "Ramen at Ichiran", location: "Shibuya" },
          { time: "15:00", category: "Sightseeing", name: "Shibuya Crossing", location: "Shibuya" },
          { time: "19:30", category: "Food", name: "Yakitori dinner", location: "Shinjuku" },
        ],
      },
      {
        day: "Day 2", date: "Jun 2",
        activities: [
          { time: "08:30", category: "Food", name: "Tsukiji Outer Market", location: "Tsukiji" },
          { time: "11:00", category: "Sightseeing", name: "teamLab Borderless", location: "Azabudai Hills" },
          { time: "17:00", category: "Sightseeing", name: "Tokyo Tower", location: "Minato" },
        ],
      },
      {
        day: "Day 3", date: "Jun 3",
        activities: [
          { time: "09:00", category: "Transport", name: "Shinkansen to Kyoto", location: "Tokyo Station" },
          { time: "13:00", category: "Stay", name: "Check in — Ryokan", location: "Gion, Kyoto" },
          { time: "16:00", category: "Sightseeing", name: "Fushimi Inari Shrine", location: "Fushimi" },
        ],
      },
    ],
  },
  {
    id: "paris",
    title: "5 days in Paris",
    destination: "Paris, France",
    dates: "Aug 10 – Aug 14",
    days: 5,
    accent: "#D4537E",
    flag: "🇫🇷",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=70",
    itinerary: [
      {
        day: "Day 1", date: "Aug 10",
        activities: [
          { time: "10:00", category: "Sightseeing", name: "Eiffel Tower", location: "Champ de Mars" },
          { time: "13:00", category: "Food", name: "Café de Flore", location: "Saint-Germain" },
          { time: "15:30", category: "Sightseeing", name: "Musée d'Orsay", location: "7th arrondissement" },
          { time: "20:00", category: "Food", name: "Seine river dinner cruise", location: "Pont de l'Alma" },
        ],
      },
      {
        day: "Day 2", date: "Aug 11",
        activities: [
          { time: "09:00", category: "Sightseeing", name: "Louvre Museum", location: "1st arrondissement" },
          { time: "13:30", category: "Food", name: "Crêpes at Breizh Café", location: "Le Marais" },
          { time: "15:00", category: "Sightseeing", name: "Notre-Dame Cathedral", location: "Île de la Cité" },
        ],
      },
    ],
  },
  {
    id: "barcelona",
    title: "4 days in Barcelona",
    destination: "Barcelona, Spain",
    dates: "Sep 5 – Sep 8",
    days: 4,
    accent: "#D85A30",
    flag: "🇪🇸",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=70",
    itinerary: [
      {
        day: "Day 1", date: "Sep 5",
        activities: [
          { time: "10:00", category: "Sightseeing", name: "Sagrada Família", location: "Eixample" },
          { time: "13:00", category: "Food", name: "Tapas at Bar del Pla", location: "El Born" },
          { time: "16:00", category: "Sightseeing", name: "Park Güell", location: "Gràcia" },
          { time: "20:30", category: "Food", name: "Paella dinner", location: "Barceloneta" },
        ],
      },
      {
        day: "Day 2", date: "Sep 6",
        activities: [
          { time: "09:30", category: "Food", name: "La Boqueria Market", location: "La Rambla" },
          { time: "11:30", category: "Sightseeing", name: "Gothic Quarter walk", location: "Barri Gòtic" },
          { time: "16:30", category: "Sightseeing", name: "Casa Batlló", location: "Passeig de Gràcia" },
        ],
      },
    ],
  },
  {
    id: "bali",
    title: "6 days in Bali",
    destination: "Bali, Indonesia",
    dates: "Oct 12 – Oct 17",
    days: 6,
    accent: "#1D9E75",
    flag: "🇮🇩",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=70",
    itinerary: [
      {
        day: "Day 1", date: "Oct 12",
        activities: [
          { time: "09:00", category: "Sightseeing", name: "Tanah Lot Temple", location: "Tabanan" },
          { time: "12:30", category: "Food", name: "Nasi goreng lunch", location: "Seminyak" },
          { time: "15:00", category: "Sightseeing", name: "Tegallalang Rice Terraces", location: "Ubud" },
          { time: "19:00", category: "Food", name: "Sunset dinner at Ku De Ta", location: "Seminyak" },
        ],
      },
      {
        day: "Day 2", date: "Oct 13",
        activities: [
          { time: "06:00", category: "Sightseeing", name: "Mount Batur sunrise hike", location: "Kintamani" },
          { time: "12:00", category: "Stay", name: "Check in — jungle villa", location: "Ubud" },
          { time: "15:00", category: "Sightseeing", name: "Ubud Monkey Forest", location: "Ubud" },
        ],
      },
    ],
  },
];
