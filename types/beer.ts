interface Volume {
    value: number;
    unit: string;
}

interface BoilVolume {
    value: number;
    unit: string;
}

interface MashTempItem {
    temp: Temp;
    duration: number;
}

interface Temp {
    value: number;
    unit: string;
}

interface Fermentation {
    temp: Temp;
}

interface Method {
    mash_temp: MashTempItem[];
    fermentation: Fermentation;
    twist: string;
}

interface Amount {
    value: number;
    unit: string;
}

interface MaltItem {
    name: string;
    amount: Amount;
}

interface HopsItem {
    name: string;
    amount: Amount;
    add: string;
    attribute: string;
}

interface Ingredients {
    malt: MaltItem[];
    hops: HopsItem[];
    yeast: string;
}

export interface Beer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: Volume;
    boil_volume: BoilVolume;
    method: Method;
    ingredients: Ingredients;
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
}
