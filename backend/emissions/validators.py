
def validate_record(data):

    flags = []

    activity_value = data.get('activity_value')

    category = data.get('category')

    unit = data.get('unit')

    scope = data.get('scope')


    # NEGATIVE VALUES

    if activity_value is not None:

        if activity_value < 0:

            flags.append(
                'Negative activity value detected'
            )


    # EXTREME VALUES

    if activity_value is not None:

        if activity_value > 100000:

            flags.append(
                'Suspiciously high activity value'
            )


    # MISSING UNIT

    if not unit:

        flags.append(
            'Missing measurement unit'
        )


    # INVALID SCOPE

    valid_scopes = [
        'Scope 1',
        'Scope 2',
        'Scope 3'
    ]

    if scope not in valid_scopes:

        flags.append(
            'Invalid emissions scope'
        )


    # CATEGORY CHECKS

    valid_categories = [
        'Fuel',
        'Electricity',
        'Travel',
        'Procurement'
    ]

    if category not in valid_categories:

        flags.append(
            'Unknown emissions category'
        )


    # ELECTRICITY SHOULD NOT BE SCOPE 1

    if category == 'Electricity' and scope == 'Scope 1':

        flags.append(
            'Electricity emissions should typically be Scope 2'
        )


    # TRAVEL VALIDATION

    if category == 'Travel':

        if activity_value and activity_value > 50000:

            flags.append(
                'Unusually large travel distance detected'
            )


    return flags
