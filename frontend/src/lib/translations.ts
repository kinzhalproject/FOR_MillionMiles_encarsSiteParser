/** Korean → English translation mappings for car data. */

const MANUFACTURERS: Record<string, string> = {
  // Korean
  "현대": "Hyundai",
  "기아": "Kia",
  "제네시스": "Genesis",
  "쌍용": "SsangYong",
  "KG모빌리티": "KG Mobility",
  "르노코리아(삼성)": "Renault Korea",
  "르노삼성": "Renault Samsung",
  "쉐보레(GM대우)": "Chevrolet",
  "한국GM": "Chevrolet",
  "대우": "Daewoo",
  // Japanese
  "토요타": "Toyota",
  "도요타": "Toyota",
  "렉서스": "Lexus",
  "혼다": "Honda",
  "닛산": "Nissan",
  "인피니티": "Infiniti",
  "미쯔비시": "Mitsubishi",
  "마쯔다": "Mazda",
  "스바루": "Subaru",
  "스즈키": "Suzuki",
  "아큐라": "Acura",
  // German
  "벤츠": "Mercedes-Benz",
  "메르세데스벤츠": "Mercedes-Benz",
  BMW: "BMW",
  "아우디": "Audi",
  "폭스바겐": "Volkswagen",
  "포르쉐": "Porsche",
  "미니": "MINI",
  "마이바흐": "Maybach",
  // American
  "포드": "Ford",
  "링컨": "Lincoln",
  "지프": "Jeep",
  "캐딜락": "Cadillac",
  "테슬라": "Tesla",
  GMC: "GMC",
  "크라이슬러": "Chrysler",
  "허머": "Hummer",
  // European
  "볼보": "Volvo",
  "랜드로버": "Land Rover",
  "재규어": "Jaguar",
  "벤틀리": "Bentley",
  "롤스로이스": "Rolls-Royce",
  "애스턴마틴": "Aston Martin",
  "맥라렌": "McLaren",
  "로터스": "Lotus",
  "페라리": "Ferrari",
  "람보르기니": "Lamborghini",
  "마세라티": "Maserati",
  "알파로메오": "Alfa Romeo",
  "피아트": "Fiat",
  "푸조": "Peugeot",
  "시트로엥": "Citroën",
  DS: "DS",
  "르노": "Renault",
  // Chinese / EV
  BYD: "BYD",
  "지리": "Geely",
  "폴스타": "Polestar",
  "리비안": "Rivian",
  "루시드": "Lucid",
};

const FUEL_TYPES: Record<string, string> = {
  "가솔린": "Gasoline",
  "디젤": "Diesel",
  LPG: "LPG",
  "하이브리드": "Hybrid",
  "전기": "Electric",
  "가솔린+전기": "Gasoline+Electric",
  "디젤+전기": "Diesel+Electric",
  "수소": "Hydrogen",
  CNG: "CNG",
};

const TRANSMISSIONS: Record<string, string> = {
  "오토": "Automatic",
  "수동": "Manual",
  CVT: "CVT",
  "세미오토": "DCT",
  "자동": "Automatic",
};

export function translateManufacturer(name: string): string {
  return MANUFACTURERS[name] || name;
}

export function translateFuel(fuel: string): string {
  return FUEL_TYPES[fuel.trim()] || fuel.trim();
}

export function translateTransmission(trans: string): string {
  return TRANSMISSIONS[trans.trim()] || trans.trim();
}

export function parseYear(rawYear: number): number {
  if (rawYear > 9999) return Math.floor(rawYear / 100);
  return rawYear;
}

export function formatPriceKRW(priceManwon: number): string {
  const krw = priceManwon * 10_000;
  const usd = Math.round(krw / 1350);
  return `$${usd.toLocaleString("en-US")}`;
}
