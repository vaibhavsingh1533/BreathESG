def normalize_unit(value, unit):

    unit = unit.lower()

    if unit == 'gal':
        return value * 3.78541, 'liters'

    if unit == 'mwh':
        return value * 1000, 'kwh'

    return value, unit