"""Korean → Russian translation mappings for car data."""

MANUFACTURERS: dict[str, str] = {
    # Korean brands
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
    # Japanese
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
    # German
    "벤츠": "Mercedes-Benz",
    "메르세데스벤츠": "Mercedes-Benz",
    "BMW": "BMW",
    "아우디": "Audi",
    "폭스바겐": "Volkswagen",
    "포르쉐": "Porsche",
    "미니": "MINI",
    "마이바흐": "Maybach",
    # American
    "포드": "Ford",
    "링컨": "Lincoln",
    "지프": "Jeep",
    "캐딜락": "Cadillac",
    "테슬라": "Tesla",
    "GMC": "GMC",
    "크라이슬러": "Chrysler",
    "허머": "Hummer",
    # European
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
    "DS": "DS",
    "르노": "Renault",
    # Chinese
    "BYD": "BYD",
    "지리": "Geely",
    # EV / Other
    "폴스타": "Polestar",
    "리비안": "Rivian",
    "루시드": "Lucid",
}

FUEL_TYPES: dict[str, str] = {
    "가솔린": "Бензин",
    "디젤": "Дизель",
    "LPG": "Газ (LPG)",
    "하이브리드": "Гибрид",
    "전기": "Электро",
    "가솔린+전기": "Бензин+Электро",
    "디젤+전기": "Дизель+Электро",
    "수소": "Водород",
    "CNG": "Газ (CNG)",
}

TRANSMISSIONS: dict[str, str] = {
    "오토": "АКПП",
    "수동": "МКПП",
    "CVT": "CVT",
    "세미오토": "Робот",
    "자동": "АКПП",
}


def translate_manufacturer(name: str) -> str:
    return MANUFACTURERS.get(name, name)


def translate_fuel(fuel: str) -> str:
    f = fuel.strip()
    return FUEL_TYPES.get(f, f)


def translate_transmission(trans: str) -> str:
    t = trans.strip()
    return TRANSMISSIONS.get(t, t)


def parse_year(raw_year: int) -> int:
    """Convert YYYYMM format (e.g. 202106) to just year (2021)."""
    if raw_year > 9999:
        return raw_year // 100
    return raw_year


def format_price_krw(price_manwon: int) -> str:
    """Convert price in 만원 to a readable Russian string.
    
    e.g. 3300 → '3,300만원 (~$25,000)'
    만원 = 10,000 KRW. Rough USD rate: 1 USD ≈ 1,350 KRW.
    """
    krw = price_manwon * 10_000
    usd = round(krw / 1350)
    return f"${usd:,}"
