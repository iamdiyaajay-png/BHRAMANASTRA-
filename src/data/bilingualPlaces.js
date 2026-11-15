/**
 * BHRAMANASTHRA Bilingual Geographic Database
 * Authentic names and coordinates derived from OpenStreetMap & Natural Earth.
 * Format: name (native/local language), name_en (English exonym)
 */

export const BILINGUAL_PLACES = [
  {
    "name": "Africa",
    "name_en": "Africa",
    "lat": 7.1881,
    "lon": 21.0938,
    "type": "continent",
    "minZoom": 2,
    "maxZoom": 3,
    "priority": 1
  },
  {
    "name": "Asia",
    "name_en": "Asia",
    "lat": 34.0479,
    "lon": 100.6197,
    "type": "continent",
    "minZoom": 2,
    "maxZoom": 3,
    "priority": 1
  },
  {
    "name": "Europe",
    "name_en": "Europe",
    "lat": 54.526,
    "lon": 15.2551,
    "type": "continent",
    "minZoom": 2,
    "maxZoom": 3,
    "priority": 1
  },
  {
    "name": "North America",
    "name_en": "North America",
    "lat": 54.526,
    "lon": -105.2551,
    "type": "continent",
    "minZoom": 2,
    "maxZoom": 3,
    "priority": 1
  },
  {
    "name": "South America",
    "name_en": "South America",
    "lat": -8.7832,
    "lon": -55.4915,
    "type": "continent",
    "minZoom": 2,
    "maxZoom": 3,
    "priority": 1
  },
  {
    "name": "Oceania",
    "name_en": "Oceania",
    "lat": -22.7359,
    "lon": 140.0188,
    "type": "continent",
    "minZoom": 2,
    "maxZoom": 3,
    "priority": 1
  },
  {
    "name": "Indian Ocean",
    "name_en": "Indian Ocean",
    "lat": -20.0,
    "lon": 80.0,
    "type": "ocean",
    "minZoom": 2,
    "maxZoom": 4,
    "priority": 3
  },
  {
    "name": "Pacific Ocean",
    "name_en": "Pacific Ocean",
    "lat": 0.0,
    "lon": -160.0,
    "type": "ocean",
    "minZoom": 2,
    "maxZoom": 4,
    "priority": 3
  },
  {
    "name": "Atlantic Ocean",
    "name_en": "Atlantic Ocean",
    "lat": 10.0,
    "lon": -30.0,
    "type": "ocean",
    "minZoom": 2,
    "maxZoom": 4,
    "priority": 3
  },
  {
    "name": "Arabian Sea",
    "name_en": "Arabian Sea",
    "lat": 15.0,
    "lon": 65.0,
    "type": "ocean",
    "minZoom": 4,
    "maxZoom": 6,
    "priority": 5
  },
  {
    "name": "Bay of Bengal",
    "name_en": "Bay of Bengal",
    "lat": 15.0,
    "lon": 88.0,
    "type": "ocean",
    "minZoom": 4,
    "maxZoom": 6,
    "priority": 5
  },
  {
    "name": "Mediterranean Sea",
    "name_en": "Mediterranean Sea",
    "lat": 35.0,
    "lon": 18.0,
    "type": "ocean",
    "minZoom": 4,
    "maxZoom": 6,
    "priority": 5
  },
  {
    "name": "भारत",
    "name_en": "India",
    "lat": 20.5937,
    "lon": 78.9629,
    "type": "country",
    "minZoom": 2,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "中国",
    "name_en": "China",
    "lat": 35.8617,
    "lon": 104.1954,
    "type": "country",
    "minZoom": 2,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "日本",
    "name_en": "Japan",
    "lat": 36.2048,
    "lon": 138.2529,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "España",
    "name_en": "Spain",
    "lat": 40.4637,
    "lon": -3.7492,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "مصر",
    "name_en": "Egypt",
    "lat": 26.8206,
    "lon": 30.8025,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "المغرب",
    "name_en": "Morocco",
    "lat": 31.7917,
    "lon": -7.0926,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "الجزائر",
    "name_en": "Algeria",
    "lat": 28.0339,
    "lon": 1.6596,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "تونس",
    "name_en": "Tunisia",
    "lat": 33.8869,
    "lon": 9.5375,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "ليبيا",
    "name_en": "Libya",
    "lat": 26.3351,
    "lon": 17.2283,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "السودان",
    "name_en": "Sudan",
    "lat": 12.8628,
    "lon": 30.2176,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "ኢትዮጵያ",
    "name_en": "Ethiopia",
    "lat": 9.145,
    "lon": 40.4897,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Kenya",
    "name_en": "Kenya",
    "lat": 0.0236,
    "lon": 37.9062,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Nigeria",
    "name_en": "Nigeria",
    "lat": 9.082,
    "lon": 8.6753,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "South Africa",
    "name_en": "South Africa",
    "lat": -30.5595,
    "lon": 22.9375,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Ghana",
    "name_en": "Ghana",
    "lat": 7.9465,
    "lon": -1.0232,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Sénégal",
    "name_en": "Senegal",
    "lat": 14.4974,
    "lon": -14.4524,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Tanzania",
    "name_en": "Tanzania",
    "lat": -6.369,
    "lon": 34.8888,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "RD Congo",
    "name_en": "DR Congo",
    "lat": -4.0383,
    "lon": 21.7587,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Angola",
    "name_en": "Angola",
    "lat": -11.2027,
    "lon": 17.8739,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Moçambique",
    "name_en": "Mozambique",
    "lat": -18.6657,
    "lon": 35.5296,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Madagasikara",
    "name_en": "Madagascar",
    "lat": -18.7669,
    "lon": 46.8691,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Namibia",
    "name_en": "Namibia",
    "lat": -22.9576,
    "lon": 18.4904,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Botswana",
    "name_en": "Botswana",
    "lat": -22.3285,
    "lon": 24.6849,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Zimbabwe",
    "name_en": "Zimbabwe",
    "lat": -19.0154,
    "lon": 29.1549,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Zambia",
    "name_en": "Zambia",
    "lat": -13.1339,
    "lon": 27.8493,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Uganda",
    "name_en": "Uganda",
    "lat": 1.3733,
    "lon": 32.2903,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Rwanda",
    "name_en": "Rwanda",
    "lat": -1.9403,
    "lon": 29.8739,
    "type": "country",
    "minZoom": 5,
    "maxZoom": 7,
    "priority": 5
  },
  {
    "name": "Cameroon",
    "name_en": "Cameroon",
    "lat": 7.3697,
    "lon": 12.3547,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Côte d'Ivoire",
    "name_en": "Ivory Coast",
    "lat": 7.54,
    "lon": -5.5471,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Mali",
    "name_en": "Mali",
    "lat": 17.5707,
    "lon": -3.9962,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Niger",
    "name_en": "Niger",
    "lat": 17.6078,
    "lon": 8.0817,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Tchad",
    "name_en": "Chad",
    "lat": 15.4542,
    "lon": 18.7322,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "الصومال",
    "name_en": "Somalia",
    "lat": 5.1521,
    "lon": 46.1996,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "United States",
    "name_en": "United States",
    "lat": 37.0902,
    "lon": -95.7129,
    "type": "country",
    "minZoom": 2,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "Canada",
    "name_en": "Canada",
    "lat": 56.1304,
    "lon": -106.3468,
    "type": "country",
    "minZoom": 2,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "México",
    "name_en": "Mexico",
    "lat": 23.6345,
    "lon": -102.5528,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Brasil",
    "name_en": "Brazil",
    "lat": -14.235,
    "lon": -51.9253,
    "type": "country",
    "minZoom": 2,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "Argentina",
    "name_en": "Argentina",
    "lat": -38.4161,
    "lon": -63.6167,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Chile",
    "name_en": "Chile",
    "lat": -35.6751,
    "lon": -71.543,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Colombia",
    "name_en": "Colombia",
    "lat": 4.5709,
    "lon": -74.2973,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Perú",
    "name_en": "Peru",
    "lat": -9.19,
    "lon": -75.0152,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Deutschland",
    "name_en": "Germany",
    "lat": 51.1657,
    "lon": 10.4515,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "France",
    "name_en": "France",
    "lat": 46.2276,
    "lon": 2.2137,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "United Kingdom",
    "name_en": "United Kingdom",
    "lat": 55.3781,
    "lon": -3.436,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "Italia",
    "name_en": "Italy",
    "lat": 41.8719,
    "lon": 12.5674,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "Россия",
    "name_en": "Russia",
    "lat": 61.524,
    "lon": 105.3188,
    "type": "country",
    "minZoom": 2,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "Україна",
    "name_en": "Ukraine",
    "lat": 48.3794,
    "lon": 31.1656,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Polska",
    "name_en": "Poland",
    "lat": 51.9194,
    "lon": 19.1451,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Nederland",
    "name_en": "Netherlands",
    "lat": 52.1326,
    "lon": 5.2913,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Portugal",
    "name_en": "Portugal",
    "lat": 39.3999,
    "lon": -8.2245,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Ελλάδα",
    "name_en": "Greece",
    "lat": 39.0742,
    "lon": 21.8243,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Türkiye",
    "name_en": "Turkey",
    "lat": 38.9637,
    "lon": 35.2433,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "المملكة العربية السعودية",
    "name_en": "Saudi Arabia",
    "lat": 23.8859,
    "lon": 45.0792,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "ایران",
    "name_en": "Iran",
    "lat": 32.4279,
    "lon": 53.688,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "العراق",
    "name_en": "Iraq",
    "lat": 33.2232,
    "lon": 43.6793,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "پاکستان",
    "name_en": "Pakistan",
    "lat": 30.3753,
    "lon": 69.3451,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "বাংলাদেশ",
    "name_en": "Bangladesh",
    "lat": 23.685,
    "lon": 90.3563,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "ශ්‍රී ලංකාව",
    "name_en": "Sri Lanka",
    "lat": 7.8731,
    "lon": 80.7718,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "대한민국",
    "name_en": "South Korea",
    "lat": 35.9078,
    "lon": 127.7669,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "조선",
    "name_en": "North Korea",
    "lat": 40.3399,
    "lon": 127.5101,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Việt Nam",
    "name_en": "Vietnam",
    "lat": 14.0583,
    "lon": 108.2772,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "ประเทศไทย",
    "name_en": "Thailand",
    "lat": 15.87,
    "lon": 100.9925,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Indonesia",
    "name_en": "Indonesia",
    "lat": -0.7893,
    "lon": 113.9213,
    "type": "country",
    "minZoom": 3,
    "maxZoom": 7,
    "priority": 3
  },
  {
    "name": "Malaysia",
    "name_en": "Malaysia",
    "lat": 4.2105,
    "lon": 101.9758,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Pilipinas",
    "name_en": "Philippines",
    "lat": 12.8797,
    "lon": 121.774,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "Australia",
    "name_en": "Australia",
    "lat": -25.2744,
    "lon": 133.7751,
    "type": "country",
    "minZoom": 2,
    "maxZoom": 7,
    "priority": 2
  },
  {
    "name": "Aotearoa",
    "name_en": "New Zealand",
    "lat": -40.9006,
    "lon": 174.886,
    "type": "country",
    "minZoom": 4,
    "maxZoom": 7,
    "priority": 4
  },
  {
    "name": "കേരളം",
    "name_en": "Kerala",
    "lat": 10.8505,
    "lon": 76.2711,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 3
  },
  {
    "name": "தமிழ்நாடு",
    "name_en": "Tamil Nadu",
    "lat": 11.1271,
    "lon": 78.6569,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "ಕರ್ನಾಟಕ",
    "name_en": "Karnataka",
    "lat": 15.3173,
    "lon": 75.7139,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "महाराष्ट्र",
    "name_en": "Maharashtra",
    "lat": 19.7515,
    "lon": 75.7139,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "गुजरात",
    "name_en": "Gujarat",
    "lat": 22.2587,
    "lon": 71.1924,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "राजस्थान",
    "name_en": "Rajasthan",
    "lat": 27.0238,
    "lon": 74.2179,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "उत्तर प्रदेश",
    "name_en": "Uttar Pradesh",
    "lat": 26.8467,
    "lon": 80.9462,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "पश्चिम बंगाल",
    "name_en": "West Bengal",
    "lat": 22.9868,
    "lon": 87.855,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "मध्य प्रदेश",
    "name_en": "Madhya Pradesh",
    "lat": 22.9734,
    "lon": 78.6569,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "आंध्र प्रदेश",
    "name_en": "Andhra Pradesh",
    "lat": 15.9129,
    "lon": 79.74,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "तेलंगाना",
    "name_en": "Telangana",
    "lat": 18.1124,
    "lon": 79.0193,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "ओडिशा",
    "name_en": "Odisha",
    "lat": 20.9517,
    "lon": 85.0985,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "बिहार",
    "name_en": "Bihar",
    "lat": 25.0961,
    "lon": 85.3131,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "पंजाब",
    "name_en": "Punjab",
    "lat": 31.1471,
    "lon": 75.3412,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "असम",
    "name_en": "Assam",
    "lat": 26.2006,
    "lon": 92.9376,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "Comunitat Valenciana",
    "name_en": "Valencian Community",
    "lat": 39.484,
    "lon": -0.37,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 3
  },
  {
    "name": "Andalucía",
    "name_en": "Andalusia",
    "lat": 37.5443,
    "lon": -4.7278,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "Cataluña",
    "name_en": "Catalonia",
    "lat": 41.5912,
    "lon": 1.5209,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "Comunidad de Madrid",
    "name_en": "Community of Madrid",
    "lat": 40.4168,
    "lon": -3.7038,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "Galicia",
    "name_en": "Galicia",
    "lat": 42.5751,
    "lon": -8.1339,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "País Vasco",
    "name_en": "Basque Country",
    "lat": 43.0,
    "lon": -2.75,
    "type": "state",
    "minZoom": 6,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "Castilla y León",
    "name_en": "Castile and León",
    "lat": 41.6523,
    "lon": -4.7245,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 5
  },
  {
    "name": "Canarias",
    "name_en": "Canary Islands",
    "lat": 28.2916,
    "lon": -16.6291,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "广东",
    "name_en": "Guangdong",
    "lat": 23.379,
    "lon": 113.7633,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 3
  },
  {
    "name": "四川",
    "name_en": "Sichuan",
    "lat": 30.6171,
    "lon": 102.7103,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "浙江",
    "name_en": "Zhejiang",
    "lat": 29.1416,
    "lon": 119.7889,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "江苏",
    "name_en": "Jiangsu",
    "lat": 32.9711,
    "lon": 119.455,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "山东",
    "name_en": "Shandong",
    "lat": 36.3427,
    "lon": 118.1498,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "新疆",
    "name_en": "Xinjiang",
    "lat": 42.127,
    "lon": 86.1332,
    "type": "state",
    "minZoom": 4,
    "maxZoom": 8,
    "priority": 4
  },
  {
    "name": "西藏",
    "name_en": "Tibet",
    "lat": 31.6927,
    "lon": 88.0924,
    "type": "state",
    "minZoom": 4,
    "maxZoom": 8,
    "priority": 4
  },
  {
    "name": "湖北",
    "name_en": "Hubei",
    "lat": 30.7378,
    "lon": 112.2384,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "云南",
    "name_en": "Yunnan",
    "lat": 24.4753,
    "lon": 101.3431,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "本州",
    "name_en": "Honshu",
    "lat": 36.0,
    "lon": 138.0,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 8,
    "priority": 3
  },
  {
    "name": "北海道",
    "name_en": "Hokkaido",
    "lat": 43.2203,
    "lon": 142.8635,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 8,
    "priority": 3
  },
  {
    "name": "九州",
    "name_en": "Kyushu",
    "lat": 33.0,
    "lon": 131.0,
    "type": "state",
    "minZoom": 5,
    "maxZoom": 8,
    "priority": 3
  },
  {
    "name": "四国",
    "name_en": "Shikoku",
    "lat": 33.75,
    "lon": 133.5,
    "type": "state",
    "minZoom": 6,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "沖縄",
    "name_en": "Okinawa",
    "lat": 26.2124,
    "lon": 127.6809,
    "type": "state",
    "minZoom": 6,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "関西",
    "name_en": "Kansai",
    "lat": 35.0,
    "lon": 135.5,
    "type": "state",
    "minZoom": 6,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "関東",
    "name_en": "Kanto",
    "lat": 36.0,
    "lon": 139.5,
    "type": "state",
    "minZoom": 6,
    "maxZoom": 9,
    "priority": 4
  },
  {
    "name": "नई दिल्ली",
    "name_en": "New Delhi",
    "lat": 28.6139,
    "lon": 77.209,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "मुंबई",
    "name_en": "Mumbai",
    "lat": 19.076,
    "lon": 72.8777,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "बेंगलुरु",
    "name_en": "Bengaluru",
    "lat": 12.9716,
    "lon": 77.5946,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "चेन्नई",
    "name_en": "Chennai",
    "lat": 13.0827,
    "lon": 80.2707,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "कोलकाता",
    "name_en": "Kolkata",
    "lat": 22.5726,
    "lon": 88.3639,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "തിരുവനന്തപുരം",
    "name_en": "Thiruvananthapuram",
    "lat": 8.5241,
    "lon": 76.9366,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "കൊച്ചി",
    "name_en": "Kochi",
    "lat": 9.9312,
    "lon": 76.2673,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "കോഴിക്കോട്",
    "name_en": "Kozhikode",
    "lat": 11.2588,
    "lon": 75.7804,
    "type": "city",
    "minZoom": 7,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "തൃശ്ശൂർ",
    "name_en": "Thrissur",
    "lat": 10.5276,
    "lon": 76.2144,
    "type": "city",
    "minZoom": 7,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "ആലപ്പുഴ",
    "name_en": "Alappuzha",
    "lat": 9.4981,
    "lon": 76.3388,
    "type": "city",
    "minZoom": 7,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "കോട്ടയം",
    "name_en": "Kottayam",
    "lat": 9.5916,
    "lon": 76.5222,
    "type": "city",
    "minZoom": 8,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "കൊല്ലം",
    "name_en": "Kollam",
    "lat": 8.8932,
    "lon": 76.6141,
    "type": "city",
    "minZoom": 8,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "വയനാട്",
    "name_en": "Wayanad",
    "lat": 11.6854,
    "lon": 76.132,
    "type": "city",
    "minZoom": 7,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "പാലക്കാട്",
    "name_en": "Palakkad",
    "lat": 10.7867,
    "lon": 76.6548,
    "type": "city",
    "minZoom": 8,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "കണ്ണൂർ",
    "name_en": "Kannur",
    "lat": 11.8745,
    "lon": 75.3704,
    "type": "city",
    "minZoom": 8,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Madrid",
    "name_en": "Madrid",
    "lat": 40.4168,
    "lon": -3.7038,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "València",
    "name_en": "Valencia",
    "lat": 39.4699,
    "lon": -0.3763,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Barcelona",
    "name_en": "Barcelona",
    "lat": 41.3879,
    "lon": 2.1699,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Sevilla",
    "name_en": "Seville",
    "lat": 37.3891,
    "lon": -5.9845,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Zaragoza",
    "name_en": "Zaragoza",
    "lat": 41.6488,
    "lon": -0.8891,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Málaga",
    "name_en": "Malaga",
    "lat": 36.7213,
    "lon": -4.4214,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Bilbao",
    "name_en": "Bilbao",
    "lat": 43.263,
    "lon": -2.935,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Alacant",
    "name_en": "Alicante",
    "lat": 38.3452,
    "lon": -0.481,
    "type": "city",
    "minZoom": 7,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Castelló",
    "name_en": "Castellon",
    "lat": 39.9864,
    "lon": -0.0513,
    "type": "city",
    "minZoom": 7,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Gandia",
    "name_en": "Gandia",
    "lat": 38.9672,
    "lon": -0.1804,
    "type": "city",
    "minZoom": 8,
    "maxZoom": 18,
    "priority": 5
  },
  {
    "name": "Cullera",
    "name_en": "Cullera",
    "lat": 39.1642,
    "lon": -0.2541,
    "type": "city",
    "minZoom": 9,
    "maxZoom": 18,
    "priority": 5
  },
  {
    "name": "Sagunt",
    "name_en": "Sagunto",
    "lat": 39.6797,
    "lon": -0.2784,
    "type": "city",
    "minZoom": 9,
    "maxZoom": 18,
    "priority": 5
  },
  {
    "name": "北京",
    "name_en": "Beijing",
    "lat": 39.9042,
    "lon": 116.4074,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "上海",
    "name_en": "Shanghai",
    "lat": 31.2304,
    "lon": 121.4737,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "广州",
    "name_en": "Guangzhou",
    "lat": 23.1291,
    "lon": 113.2644,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "深圳",
    "name_en": "Shenzhen",
    "lat": 22.5431,
    "lon": 114.0579,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "成都",
    "name_en": "Chengdu",
    "lat": 30.5728,
    "lon": 104.0668,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "武汉",
    "name_en": "Wuhan",
    "lat": 30.5928,
    "lon": 114.3055,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "重庆",
    "name_en": "Chongqing",
    "lat": 29.563,
    "lon": 106.5516,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "西安",
    "name_en": "Xi'an",
    "lat": 34.3416,
    "lon": 108.9398,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "南京",
    "name_en": "Nanjing",
    "lat": 32.0603,
    "lon": 118.7969,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "杭州",
    "name_en": "Hangzhou",
    "lat": 30.2741,
    "lon": 120.1551,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "香港",
    "name_en": "Hong Kong",
    "lat": 22.3193,
    "lon": 114.1694,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "台北",
    "name_en": "Taipei",
    "lat": 25.033,
    "lon": 121.5654,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "東京",
    "name_en": "Tokyo",
    "lat": 35.6762,
    "lon": 139.6503,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "大阪",
    "name_en": "Osaka",
    "lat": 34.6937,
    "lon": 135.5023,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "京都",
    "name_en": "Kyoto",
    "lat": 35.0116,
    "lon": 135.7681,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "横浜",
    "name_en": "Yokohama",
    "lat": 35.4437,
    "lon": 139.638,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "名古屋",
    "name_en": "Nagoya",
    "lat": 35.1815,
    "lon": 136.9066,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "札幌",
    "name_en": "Sapporo",
    "lat": 43.0618,
    "lon": 141.3545,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "福岡",
    "name_en": "Fukuoka",
    "lat": 33.5904,
    "lon": 130.4017,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "広島",
    "name_en": "Hiroshima",
    "lat": 34.3853,
    "lon": 132.4553,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "仙台",
    "name_en": "Sendai",
    "lat": 38.2682,
    "lon": 140.8694,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "القاهرة",
    "name_en": "Cairo",
    "lat": 30.0444,
    "lon": 31.2357,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "الإسكندرية",
    "name_en": "Alexandria",
    "lat": 31.2001,
    "lon": 29.9187,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "الدار البيضاء",
    "name_en": "Casablanca",
    "lat": 33.5731,
    "lon": -7.5898,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "الرباط",
    "name_en": "Rabat",
    "lat": 34.0209,
    "lon": -6.8416,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "الجزائر",
    "name_en": "Algiers",
    "lat": 36.7538,
    "lon": 3.0588,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "تونس",
    "name_en": "Tunis",
    "lat": 36.8065,
    "lon": 10.1815,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "طرابلس",
    "name_en": "Tripoli",
    "lat": 32.8872,
    "lon": 13.1913,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "الخرطوم",
    "name_en": "Khartoum",
    "lat": 15.5007,
    "lon": 32.5599,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "አዲስ አበባ",
    "name_en": "Addis Ababa",
    "lat": 9.03,
    "lon": 38.74,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Nairobi",
    "name_en": "Nairobi",
    "lat": -1.2921,
    "lon": 36.8219,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Lagos",
    "name_en": "Lagos",
    "lat": 6.5244,
    "lon": 3.3792,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Abuja",
    "name_en": "Abuja",
    "lat": 9.0765,
    "lon": 7.3986,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Johannesburg",
    "name_en": "Johannesburg",
    "lat": -26.2041,
    "lon": 28.0473,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Cape Town",
    "name_en": "Cape Town",
    "lat": -33.9249,
    "lon": 18.4241,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Durban",
    "name_en": "Durban",
    "lat": -29.8587,
    "lon": 31.0218,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Accra",
    "name_en": "Accra",
    "lat": 5.6037,
    "lon": -0.187,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Dakar",
    "name_en": "Dakar",
    "lat": 14.7167,
    "lon": -17.4677,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Dar es Salaam",
    "name_en": "Dar es Salaam",
    "lat": -6.7924,
    "lon": 39.2083,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Kinshasa",
    "name_en": "Kinshasa",
    "lat": -4.4419,
    "lon": 15.2663,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Luanda",
    "name_en": "Luanda",
    "lat": -8.839,
    "lon": 13.2894,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Maputo",
    "name_en": "Maputo",
    "lat": -25.9692,
    "lon": 32.5732,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Antananarivo",
    "name_en": "Antananarivo",
    "lat": -18.8792,
    "lon": 47.5079,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Kampala",
    "name_en": "Kampala",
    "lat": 0.3476,
    "lon": 32.5825,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "Kigali",
    "name_en": "Kigali",
    "lat": -1.9706,
    "lon": 30.1044,
    "type": "city",
    "minZoom": 6,
    "maxZoom": 18,
    "priority": 4
  },
  {
    "name": "London",
    "name_en": "London",
    "lat": 51.5074,
    "lon": -0.1278,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "Paris",
    "name_en": "Paris",
    "lat": 48.8566,
    "lon": 2.3522,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "Berlin",
    "name_en": "Berlin",
    "lat": 52.52,
    "lon": 13.405,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "Roma",
    "name_en": "Rome",
    "lat": 41.9028,
    "lon": 12.4964,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "New York",
    "name_en": "New York",
    "lat": 40.7128,
    "lon": -74.006,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "Washington, D.C.",
    "name_en": "Washington, D.C.",
    "lat": 38.9072,
    "lon": -77.0369,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Los Angeles",
    "name_en": "Los Angeles",
    "lat": 34.0522,
    "lon": -118.2437,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Ciudad de México",
    "name_en": "Mexico City",
    "lat": 19.4326,
    "lon": -99.1332,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "São Paulo",
    "name_en": "Sao Paulo",
    "lat": -23.5505,
    "lon": -46.6333,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "Buenos Aires",
    "name_en": "Buenos Aires",
    "lat": -34.6037,
    "lon": -58.3816,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Sydney",
    "name_en": "Sydney",
    "lat": -33.8688,
    "lon": 151.2093,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Москва",
    "name_en": "Moscow",
    "lat": 55.7558,
    "lon": 37.6173,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "دبي",
    "name_en": "Dubai",
    "lat": 25.2048,
    "lon": 55.2708,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "الرياض",
    "name_en": "Riyadh",
    "lat": 24.7136,
    "lon": 46.6753,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "تهران",
    "name_en": "Tehran",
    "lat": 35.6892,
    "lon": 51.389,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "İstanbul",
    "name_en": "Istanbul",
    "lat": 41.0082,
    "lon": 28.9784,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  },
  {
    "name": "Singapore",
    "name_en": "Singapore",
    "lat": 1.3521,
    "lon": 103.8198,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "Jakarta",
    "name_en": "Jakarta",
    "lat": -6.2088,
    "lon": 106.8456,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "กรุงเทพมหานคร",
    "name_en": "Bangkok",
    "lat": 13.7563,
    "lon": 100.5018,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 3
  },
  {
    "name": "서울",
    "name_en": "Seoul",
    "lat": 37.5665,
    "lon": 126.978,
    "type": "city",
    "minZoom": 5,
    "maxZoom": 18,
    "priority": 2
  }
];
