from rest_framework.decorators import api_view
from rest_framework.response import Response
import random
import string


# Create your views here
def generate_password(length, with_upper, with_digits, with_symbols):
    characters = string.ascii_lowercase
    if with_upper:
        characters += string.ascii_uppercase
    if with_digits:
        characters += string.digits
    if with_symbols:
        characters += string.punctuation

    if not characters:
        return "Please key in something"

    password = "".join(random.choice(characters) for _ in range(length))
    return password


@api_view(['GET', 'POST'])
def password_generator(request):
    data = request.data
    length = data.get('length', 12)
    with_upper = data.get('uppercase', False)
    with_digits = data.get('digits', False)
    with_symbols = data.get('symbols', False)

    password = generate_password(length, with_upper, with_digits, with_symbols)
    return Response({'password': password})
