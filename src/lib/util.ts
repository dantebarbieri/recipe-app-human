export const NutritionDailyValues = {
    fat: {
        total: 78,
        saturated: 20
    },
    cholesterol: 300,
    sodium: 2300,
    carbs: {
        total: 275,
        fiber: 28,
        sugars: {
            added: 50
        }
    }
};

const fractions: ReadonlyArray<[number, string]> = [
    [1 / 10, "⅒"],
    [1 / 9, "⅑"],
    [1 / 8, "⅛"],
    [1 / 7, "⅐"],
    [1 / 6, "⅙"],
    [1 / 5, "⅕"],
    [1 / 4, "¼"],
    [1 / 3, "⅓"],
    [3 / 8, "⅜"],
    [2 / 5, "⅖"],
    [1 / 2, "½"],
    [3 / 5, "⅗"],
    [5 / 8, "⅝"],
    [2 / 3, "⅔"],
    [3 / 4, "¾"],
    [4 / 5, "⅘"],
    [5 / 6, "⅚"],
    [7 / 8, "⅞"],
];

type VulgarParts = {
    negative: boolean;
    whole: number;
    fraction: string | null;
};

export const toVulgar = (n: number): VulgarParts | undefined => {
    if (!Number.isFinite(n)) return undefined;

    const epsilon = 1e-2;
    const negative = n < 0;
    const absolute = Math.abs(n);
    const significand = Math.floor(absolute);
    const exponent = absolute - significand;

    if (exponent < epsilon) {
        return { negative, whole: significand, fraction: null };
    }

    if (1 - exponent < epsilon) {
        return { negative, whole: significand + 1, fraction: null };
    }

    const match = fractions.reduce((nearest, candidate) =>
        Math.abs(candidate[0] - exponent) <
            Math.abs(nearest[0] - exponent)
            ? candidate
            : nearest,
    );

    return Math.abs(match[0] - exponent) < epsilon
        ? { negative, whole: significand, fraction: match[1] }
        : undefined;
}

export const vulgarString = (v: VulgarParts): string => `${v.negative ? '-' : ''}${v.whole ? v.whole : ''}${v.fraction ? v.fraction : ''}`

const roundNearest = (v: number, interval: number): number => interval ? (interval == 1 ? Math.round(v) : Math.round(v / interval) * interval) : interval;

const maxDecimals = (n: number, d: number): string => n != Math.floor(n) ? n.toLocaleString(undefined, {
    maximumFractionDigits: d
}) : n.toLocaleString();

export const roundWeight = (weight: number): string => {
    switch (true) {
        case weight < 5:
            return '0';
        case weight < 50:
            return maxDecimals(roundNearest(weight, 5), 0);
        default:
            return maxDecimals(roundNearest(weight, 10), 0);
    }
}

export const roundCalories = (c: number): string => {
    switch (true) {
        case c < 5:
            return '0';
        case c < 50:
            return maxDecimals(roundNearest(c, 5), 0);
        default:
            return maxDecimals(roundNearest(c, 10), 0);
    }
}

export const roundFat = (f: number): string => {
    switch (true) {
        case f < 0.5:
            return '0';
        case f < 5:
            return maxDecimals(roundNearest(f, 0.5), 1);
        default:
            return maxDecimals(roundNearest(f, 1), 0);
    }
}

export const roundCholesterol = (c: number): string => {
    switch (true) {
        case c < 2:
            return '0';
        case c < 5:
            return `less than 5`;
        default:
            return maxDecimals(roundNearest(c, 5), 0);
    }
}

export const roundSodium = (s: number): string => {
    switch (true) {
        case s < 5:
            return '0';
        case s < 140:
            return maxDecimals(roundNearest(s, 5), 0);
        default:
            return maxDecimals(roundNearest(s, 10), 0);
    }
}

export const roundCarbs = (c: number): string => {
    switch (true) {
        case c < 0.5:
            return '0';
        case c < 1:
            return `Contains less than 1`;
        default:
            return maxDecimals(roundNearest(c, 1), 0);
    }
}

export const roundProtein = (p: number): string => {
    switch (true) {
        case p < 0.5:
            return '0';
        case p < 1:
            return `Contains less than 1`;
        default:
            return maxDecimals(roundNearest(p, 1), 0);
    }
}

export const formatTime = (minutes: number): string => {
    let time = minutes;
    const days = Math.floor(time / (24 /* hours */ * 60 /* minutes */));
    time -= days * (24 /* hours */ * 60 /* minutes */);
    const hours = Math.floor(time / 60 /* minutes */);
    time -= hours * 60;
    const mins = Math.floor(time);

    const retval: string[] = [];
    if (days > 0) {
        retval.push(`${days} d`)
    }
    if (hours > 0) {
        retval.push(`${hours} h`)
    }
    if (mins > 0) {
        retval.push(`${mins} m`)
    }
    return retval.join(' ');
}