import { AISuggestion } from "../types";

type CitySuggestionSet = {
  city: string;
  aliases: string[];
  suggestions: AISuggestion[];
};

const CITY_SUGGESTIONS: CitySuggestionSet[] = [
  {
    city: "Berlin",
    aliases: ["berlin"],
    suggestions: [
      { name: "Reichstag dome visit", category: "sightseeing", location: "Berlin Mitte", duration: "1.5 hrs", bestTime: "09:00", description: "Book ahead for a classic Berlin skyline view and a useful first stop near the government quarter.", isHiddenGem: false },
      { name: "Breakfast in Prenzlauer Berg", category: "food", location: "Prenzlauer Berg", duration: "1 hr", bestTime: "08:30", description: "A slow breakfast in one of Berlin’s most relaxed neighborhoods, good for coffee and a local pastry stop.", isHiddenGem: true },
      { name: "Museum Island afternoon", category: "other", location: "Museum Island", duration: "2.5 hrs", bestTime: "13:00", description: "Pick one museum and take your time rather than rushing the whole complex. It works best as a focused cultural block.", isHiddenGem: false },
      { name: "East Side Gallery walk", category: "sightseeing", location: "Friedrichshain", duration: "1.5 hrs", bestTime: "15:30", description: "A straightforward way to see Berlin’s wall history and open-air art in one easy walk.", isHiddenGem: false },
      { name: "Markthalle Neun food stop", category: "food", location: "Kreuzberg", duration: "1.5 hrs", bestTime: "18:30", description: "A strong local-food choice with rotating stalls and a better taste of the city than a standard tourist dinner.", isHiddenGem: true },
      { name: "Evening stroll around Unter den Linden", category: "sightseeing", location: "Berlin Mitte", duration: "45 min", bestTime: "21:00", description: "A calm end to the day with landmarks lit up and less rush than the daytime center.", isHiddenGem: false },
    ],
  },
  {
    city: "Hamburg",
    aliases: ["hamburg"],
    suggestions: [
      { name: "Elbphilharmonie plaza visit", category: "sightseeing", location: "HafenCity", duration: "1 hr", bestTime: "10:00", description: "Go for the view first and the architecture second; it’s one of Hamburg’s most memorable quick stops.", isHiddenGem: false },
      { name: "Fish sandwich by the harbor", category: "food", location: "Landungsbrücken", duration: "45 min", bestTime: "11:30", description: "A simple Hamburg classic that fits neatly between waterfront stops and doesn’t need a long sit-down meal.", isHiddenGem: true },
      { name: "Speicherstadt walk", category: "sightseeing", location: "Speicherstadt", duration: "1.5 hrs", bestTime: "13:30", description: "The warehouse district is best on foot, with canals and red-brick facades giving you a strong sense of place.", isHiddenGem: false },
      { name: "Miniatur Wunderland stop", category: "other", location: "Speicherstadt", duration: "2 hrs", bestTime: "15:30", description: "A very Hamburg indoor activity that works well if you want something detailed and weather-proof.", isHiddenGem: false },
      { name: "St. Pauli dinner spot", category: "food", location: "St. Pauli", duration: "2 hrs", bestTime: "19:00", description: "A lively evening meal area with plenty of easygoing restaurants and a short walk after dinner.", isHiddenGem: false },
      { name: "Alster sunset loop", category: "sightseeing", location: "Outer Alster", duration: "45 min", bestTime: "21:00", description: "A peaceful last stop with water views and a different mood from the harbor districts.", isHiddenGem: true },
    ],
  },
  {
    city: "Munich",
    aliases: ["munich", "muenchen", "münchen"],
    suggestions: [
      { name: "Marienplatz morning walk", category: "sightseeing", location: "Altstadt", duration: "1 hr", bestTime: "09:00", description: "A clean first look at central Munich, especially useful before the square fills up.", isHiddenGem: false },
      { name: "Viktualienmarkt breakfast", category: "food", location: "Near Marienplatz", duration: "1 hr", bestTime: "08:30", description: "A market breakfast that gives you an easy start and a quick introduction to Munich flavors.", isHiddenGem: false },
      { name: "English Garden break", category: "other", location: "English Garden", duration: "1.5 hrs", bestTime: "12:30", description: "A good pause between bigger sightseeing blocks, especially if you want green space in the middle of the city.", isHiddenGem: false },
      { name: "Isar river stroll", category: "sightseeing", location: "Isar banks", duration: "1 hr", bestTime: "15:00", description: "One of the easiest ways to feel Munich’s slower pace without leaving the city center.", isHiddenGem: true },
      { name: "Bavarian dinner hall", category: "food", location: "Lehel", duration: "2 hrs", bestTime: "19:00", description: "A classic evening meal with the kind of hearty dishes that fit Munich well.", isHiddenGem: false },
      { name: "Night view from Olympiapark", category: "sightseeing", location: "Olympiapark", duration: "45 min", bestTime: "21:00", description: "A simple late stop with city views and a different feel from the old town.", isHiddenGem: true },
    ],
  },
  {
    city: "Cologne",
    aliases: ["cologne", "koeln", "köln"],
    suggestions: [
      { name: "Cologne Cathedral visit", category: "sightseeing", location: "Altstadt-Nord", duration: "1 hr", bestTime: "09:00", description: "The obvious anchor for a Cologne day and still worth doing early before the busiest crowds.", isHiddenGem: false },
      { name: "Old town bakery stop", category: "food", location: "Altstadt", duration: "45 min", bestTime: "08:30", description: "A quick bakery breakfast before the city gets busy is an easy local-style start.", isHiddenGem: true },
      { name: "Rhine promenade walk", category: "sightseeing", location: "Rhine riverside", duration: "1.5 hrs", bestTime: "13:00", description: "A relaxed mid-day walk with great views and a good way to connect the city’s main sights.", isHiddenGem: false },
      { name: "Chocolate Museum stop", category: "other", location: "Rheinauhafen", duration: "1.5 hrs", bestTime: "15:00", description: "A practical indoor stop if you want something different from churches and river views.", isHiddenGem: false },
      { name: "Kölsch beer hall dinner", category: "food", location: "Belgian Quarter", duration: "2 hrs", bestTime: "19:00", description: "A straightforward Cologne evening with regional food and a lively atmosphere.", isHiddenGem: false },
      { name: "Sunset from Hohenzollern Bridge", category: "sightseeing", location: "Between cathedral and Deutz", duration: "45 min", bestTime: "21:00", description: "A strong final photo stop and one of the easiest places to end the day with a city view.", isHiddenGem: true },
    ],
  },
  {
    city: "Frankfurt",
    aliases: ["frankfurt", "frankfurt am main"],
    suggestions: [
      { name: "Main tower viewpoint", category: "sightseeing", location: "Banking district", duration: "1 hr", bestTime: "09:30", description: "A quick way to understand Frankfurt’s skyline and city layout from above.", isHiddenGem: false },
      { name: "Römerberg breakfast", category: "food", location: "Altstadt", duration: "1 hr", bestTime: "08:30", description: "Start in the historic center before moving toward the glass-and-steel side of the city.", isHiddenGem: false },
      { name: "Museumsufer stop", category: "other", location: "South bank of the Main", duration: "2 hrs", bestTime: "12:30", description: "A solid cultural stretch that works well if you want more than just business-district views.", isHiddenGem: false },
      { name: "Old town café break", category: "food", location: "Römer district", duration: "45 min", bestTime: "15:00", description: "A slower afternoon stop with coffee and dessert in the city’s historic core.", isHiddenGem: true },
      { name: "Frankfurt market dinner", category: "food", location: "Sachsenhausen", duration: "2 hrs", bestTime: "19:00", description: "A practical dinner district with local dishes and an easy post-meal walk nearby.", isHiddenGem: false },
      { name: "Evening Main river walk", category: "sightseeing", location: "Main riverbanks", duration: "45 min", bestTime: "21:00", description: "A nice low-effort end to the day that shows off the skyline after dark.", isHiddenGem: true },
    ],
  },
  {
    city: "Stuttgart",
    aliases: ["stuttgart"],
    suggestions: [
      { name: "Königstraße morning stroll", category: "sightseeing", location: "City center", duration: "1 hr", bestTime: "09:00", description: "A useful central walk that gives you a quick feel for Stuttgart’s main shopping and transit area.", isHiddenGem: false },
      { name: "Swabian breakfast stop", category: "food", location: "Hauptbahnhof area", duration: "1 hr", bestTime: "08:30", description: "A simple food stop that pairs well with a morning in the city center.", isHiddenGem: true },
      { name: "Mercedes-Benz Museum", category: "other", location: "Bad Cannstatt", duration: "2 hrs", bestTime: "12:00", description: "A reliable indoor anchor if you want a strong museum stop with local relevance.", isHiddenGem: false },
      { name: "Parks and hills break", category: "sightseeing", location: "Stuttgart hills", duration: "1.5 hrs", bestTime: "15:00", description: "A good contrast to the city center with more open space and wide views.", isHiddenGem: true },
      { name: "Swabian dinner house", category: "food", location: "West Stuttgart", duration: "2 hrs", bestTime: "19:00", description: "A comfortable dinner option for trying regional dishes in a straightforward setting.", isHiddenGem: false },
      { name: "Sunset over the vineyards", category: "sightseeing", location: "Uhlbach hills", duration: "45 min", bestTime: "21:00", description: "A quieter evening stop that gives Stuttgart a very different feel from the city streets.", isHiddenGem: true },
    ],
  },
  {
    city: "Düsseldorf",
    aliases: ["dusseldorf", "duesseldorf", "düsseldorf"],
    suggestions: [
      { name: "Königsallee walk", category: "sightseeing", location: "City center", duration: "1 hr", bestTime: "09:30", description: "A polished first stop that shows off Düsseldorf’s shopping boulevard and central feel.", isHiddenGem: false },
      { name: "Altstadt brunch", category: "food", location: "Old town", duration: "1 hr", bestTime: "08:45", description: "A relaxed breakfast before the Old Town gets busy with lunch and evening crowds.", isHiddenGem: true },
      { name: "Rhine tower viewpoint", category: "sightseeing", location: "MedienHafen", duration: "1 hr", bestTime: "12:30", description: "A clean skyline stop that helps frame the river and modern harbor area.", isHiddenGem: false },
      { name: "MedienHafen architecture loop", category: "other", location: "MedienHafen", duration: "1.5 hrs", bestTime: "15:00", description: "A good walking block if you like modern architecture and waterfront views.", isHiddenGem: true },
      { name: "Rheinischer dinner spot", category: "food", location: "Altstadt", duration: "2 hrs", bestTime: "19:00", description: "An easy dinner area with plenty of choice and a lively evening vibe.", isHiddenGem: false },
      { name: "Night river walk", category: "sightseeing", location: "Rhine promenade", duration: "45 min", bestTime: "21:00", description: "A simple end-of-day walk with one of the best city-night atmospheres in the area.", isHiddenGem: true },
    ],
  },
  {
    city: "Leipzig",
    aliases: ["leipzig", "leipzig germany", "leipzig, germany", "leipzig saxony", "leipzig, saxony"],
    suggestions: [
      { name: "Leipzig market square morning", category: "sightseeing", location: "Leipzig Innenstadt", duration: "1 hr", bestTime: "09:00", description: "A calm start in Leipzig’s central square before moving into museums or cafes.", isHiddenGem: false },
      { name: "Leipzig café breakfast in Plagwitz", category: "food", location: "Leipzig-Plagwitz", duration: "1 hr", bestTime: "08:30", description: "A neighborhood breakfast stop that feels a bit more local than the central tourist strip.", isHiddenGem: true },
      { name: "St. Thomas Church stop", category: "other", location: "Leipzig city center", duration: "45 min", bestTime: "11:00", description: "A compact cultural stop that fits easily into a walk through the center.", isHiddenGem: false },
      { name: "Karl-Heine Canal walk", category: "sightseeing", location: "Leipzig-Plagwitz", duration: "1.5 hrs", bestTime: "14:00", description: "A pleasant afternoon route with water views, old industrial buildings, and plenty of places to pause.", isHiddenGem: true },
      { name: "Leipzig Saxon dinner house", category: "food", location: "Leipzig Südvorstadt", duration: "2 hrs", bestTime: "19:00", description: "A relaxed dinner area with enough variety to keep the evening easy and unhurried.", isHiddenGem: false },
      { name: "Evening at the Monument to the Battle of the Nations", category: "sightseeing", location: "Leipzig Probstheida", duration: "1 hr", bestTime: "21:00", description: "A strong last stop with broad views and a more dramatic side of Leipzig.", isHiddenGem: false },
    ],
  },
  {
    city: "Dortmund",
    aliases: ["dortmund"],
    suggestions: [
      { name: "Westfalenpark morning walk", category: "sightseeing", location: "City south", duration: "1.5 hrs", bestTime: "09:00", description: "A relaxed green-space start that works well before heading into the city center.", isHiddenGem: false },
      { name: "Coffee in Kreuzviertel", category: "food", location: "Kreuzviertel", duration: "1 hr", bestTime: "08:30", description: "A neighborhood coffee stop that feels less rushed than the main station area.", isHiddenGem: true },
      { name: "Signal Iduna Park area visit", category: "other", location: "Borsigplatz area", duration: "1 hr", bestTime: "12:00", description: "A useful stop if you want a landmark that’s closely tied to the city’s identity.", isHiddenGem: false },
      { name: "Dortmund U viewing stop", category: "sightseeing", location: "City center", duration: "1 hr", bestTime: "14:30", description: "A compact cultural and photo stop with a clear urban view.", isHiddenGem: false },
      { name: "Dinner in the city center", category: "food", location: "Innenstadt", duration: "2 hrs", bestTime: "19:00", description: "An easy dinner choice with enough flexibility for a simple evening plan.", isHiddenGem: false },
      { name: "Phoenix See sunset walk", category: "sightseeing", location: "Phoenix West", duration: "45 min", bestTime: "21:00", description: "A calmer evening stop that gives Dortmund a more modern waterfront feel.", isHiddenGem: true },
    ],
  },
  {
    city: "Essen",
    aliases: ["essen"],
    suggestions: [
      { name: "Messe district morning walk", category: "sightseeing", location: "City west", duration: "1 hr", bestTime: "09:00", description: "A useful introduction to the city center before the rest of the day gets busy.", isHiddenGem: false },
      { name: "Ruhr-style breakfast stop", category: "food", location: "Rüttenscheid", duration: "1 hr", bestTime: "08:30", description: "A simple breakfast in one of Essen’s better-known food neighborhoods.", isHiddenGem: true },
      { name: "Zollverein Coal Mine Complex", category: "other", location: "Essen Nord", duration: "2 hrs", bestTime: "11:30", description: "A strong cultural anchor and one of the best-known sights in the Ruhr area.", isHiddenGem: false },
      { name: "Baldeneysee afternoon loop", category: "sightseeing", location: "South Essen", duration: "1.5 hrs", bestTime: "15:00", description: "A nice change of pace with water views and a more open feel than the city center.", isHiddenGem: true },
      { name: "Dinner in Rüttenscheid", category: "food", location: "Rüttenscheid", duration: "2 hrs", bestTime: "19:00", description: "A practical dinner area with lots of choice and an easy post-meal walk.", isHiddenGem: false },
      { name: "Night walk through the center", category: "sightseeing", location: "Essen center", duration: "45 min", bestTime: "21:00", description: "A low-effort way to end the day without needing another big attraction.", isHiddenGem: false },
    ],
  },
];

const DEFAULT_CITY = CITY_SUGGESTIONS[0];

function normalizeDestination(destination: string): string {
  return destination.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();
}

function extractCityCandidate(destination: string): string {
  const normalized = normalizeDestination(destination);
  const tokens = normalized
    .split(/[\s,./|()\-–—·]+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => token !== "germany" && token !== "deutschland");

  return tokens.join(" ") || normalized;
}

export function getMockAISuggestions(destination: string): AISuggestion[] {
  const normalized = extractCityCandidate(destination);

  const match = CITY_SUGGESTIONS.find((city) =>
    city.aliases.some((alias) => {
      const normalizedAlias = normalizeDestination(alias);
      return (
        normalized === normalizedAlias ||
        normalized.startsWith(normalizedAlias) ||
        normalized.includes(` ${normalizedAlias} `) ||
        normalized.includes(normalizedAlias)
      );
    })
  );

  return (match ?? DEFAULT_CITY).suggestions;
}