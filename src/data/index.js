import profile from "../images/profile";
import imagesh2 from "../images/h2";
import images10r from "../images/10r";
import imageszh2 from "../images/zh2";
import imagesz900 from "../images/z900";
import imagesh2sx from "../images/h2sx";
import images1000sx from "../images/1000sx";
import imagesversys from "../images/versys";
import imagesz900rs from "../images/z900rs";
import imagesw800 from "../images/w800";

const sport = [
  {
    name: "Ninja H2",
    profile: profile.h2,
    images: imagesh2,
    dimensions: {
      전장: "2,085 mm",
      전폭: "770 mm",
      전고: "1,125 mm",
      휠베이스: "1,455 mm",
      최저지상고: "130 mm",
      시트높이: "825 mm",
      커브매스: "238 kg",
      연료탱크용량: "17 litres",
    },
    engine: {
      배기량: "998 cm³",
    },
    performance: {
      최고출력: "170.0 kW {231 PS} / 11,500 min-1",
      최대토크: "141.7 N·m {14.4 kgƒ·m} / 11,000 min-1",
    },
  },
  {
    name: "Ninja ZX-10R",
    profile: profile.zx10r,
    images: images10r,
    dimensions: {
      전장: "2,085 mm",
      전폭: "750 mm",
      전고: "1,185 mm",
      휠베이스: "1,450 mm",
      최저지상고: "135 mm",
      시트높이: "835 mm",
      커브매스: "207 kg",
      연료탱크용량: "17 litres",
    },
    engine: {
      배기량: "998 cm³",
    },
    performance: {
      최고출력: "149.3 kW {203 PS} / 13,200 min-1",
      최대토크: "114.9 N·m {11.7 kgƒ·m} / 11,400 min-1",
    },
  },
];

const naked = [
  {
    name: "Z H2",
    profile: profile.zh2,
    images: imageszh2,
    dimensions: {
      전장: "2,085 mm",
      전폭: "810 mm",
      전고: "1,130 mm",
      휠베이스: "1,455 mm",
      최저지상고: "140 mm",
      시트높이: "830 mm",
      커브매스: "239 kg",
      연료탱크용량: "19 litres",
    },
    engine: {
      배기량: "998 cm³",
    },
    performance: {
      최고출력: "147.1 kW {200 PS} / 11,000 min-1",
      최대토크: "137.0 N·m {14.0 kgƒ·m} / 8,500 min-1",
    },
  },
  {
    name: "Z900",
    profile: profile.z900,
    images: imagesz900,
    dimensions: {
      전장: "2,070 mm",
      전폭: "825 mm",
      전고: "1,080 mm",
      휠베이스: "1,455 mm",
      최저지상고: "145 mm",
      시트높이: "820 mm",
      커브매스: "212 kg",
      연료탱크용량: "17 litres",
    },
    engine: {
      배기량: "948 cm³",
    },
    performance: {
      최고출력: "92.2 kW {125 PS} / 9,500 min-1",
      최대토크: "98.6 N·m {10.0 kgƒ·m} / 7,700 min-1",
    },
  },
];

const sport_tourer = [
  {
    name: "Ninja H2 SX SE+",
    profile: profile.h2sx,
    images: imagesh2sx,
    dimensions: {
      전장: "2,135 mm",
      전폭: "775 mm",
      전고: "1,260 mm",
      휠베이스: "1,480 mm",
      최저지상고: "130 mm",
      시트높이: "835 mm",
      커브매스: "262 kg",
      연료탱크용량: "19 litres",
    },
    engine: {
      배기량: "998 cm³",
    },
    performance: {
      최고출력: "147.1 kW {200 PS} / 11,000 min-1",
      최대토크: "137.3 N·m {14.0 kgƒ·m} / 9,500 min-1",
    },
  },
  {
    name: "Ninja 1000SX",
    profile: profile.nin1000sx,
    images: images1000sx,
    dimensions: {
      전장: "2,100 mm",
      전폭: "825 mm",
      전고: "1,225 mm (High) / 1,190 mm (Low)",
      휠베이스: "1,440 mm",
      최저지상고: "135 mm",
      시트높이: "835 mm",
      커브매스: "235 kg",
      연료탱크용량: "19 litres",
    },
    engine: {
      배기량: "1043 cm³",
    },
    performance: {
      최고출력: "104.5 kW {142 PS} / 10,000 min-1",
      최대토크: "111.0 N·m {11.3 kgƒ·m} / 8,000 min-1",
    },
  },
];

const adventure_tourer = [
  {
    name: "Versys 1000 SE",
    profile: profile.versys,
    images: imagesversys,
    dimensions: {
      전장: "2,270 mm",
      전폭: "950 mm",
      전고: "1,530 mm(High) / 1,490 mm(Low)",
      휠베이스: "1,520 mm",
      최저지상고: "150 mm",
      시트높이: "840 mm",
      커브매스: "257 kg",
      연료탱크용량: "21 litres",
    },
    engine: {
      배기량: "1043 cm³",
    },
    performance: {
      최고출력: "88.2 kW {120 PS} / 9,000 min-1",
      최대토크: "102.0 N·m {10.4 kgƒ·m} / 7,500 min-1",
    },
  },
];

const classic = [
  {
    name: "Z900RS",
    profile: profile.z900rs,
    images: imagesz900rs,
    dimensions: {
      전장: "2,100 mm",
      전폭: "865 mm",
      전고: "1,150 mm",
      휠베이스: "1,470 mm",
      최저지상고: "130 mm",
      시트높이: "835 mm",
      커브매스: "215 kg",
      연료탱크용량: "17 litres",
    },
    engine: {
      배기량: "948 cm³",
    },
    performance: {
      최고출력: "82.0 kW {111 PS} / 8,500 min-1",
      최대토크: "98.5 N·m {10.0 kgƒ·m} / 6,500 min-1",
    },
  },
  {
    name: "W800",
    profile: profile.w800,
    images: imagesw800,
    dimensions: {
      전장: "2,190 mm",
      전폭: "790 mm",
      전고: "1,075 mm",
      휠베이스: "1,465 mm",
      최저지상고: "125 mm",
      시트높이: "790 mm",
      커브매스: "226 kg",
      연료탱크용량: "15 litres",
    },
    engine: {
      배기량: "773 cm³",
    },
    performance: {
      최고출력: "35.0 kW {48 PS} / 6,000 min-1",
      최대토크: "62.9 N·m {6.4 kgƒ·m} / 4,800 min-1",
    },
  },
];

const data = [
  {
    name: "SUPERSPORT & SPORT",
    bikes: sport,
  },
  {
    name: "SUPERNAKED",
    bikes: naked,
  },
  {
    name: "SPORT TOURER",
    bikes: sport_tourer,
  },
  {
    name: "ADVENTURE TOURER",
    bikes: adventure_tourer,
  },
  {
    name: "MODERN CLASSIC",
    bikes: classic,
  },
];

export default data;
