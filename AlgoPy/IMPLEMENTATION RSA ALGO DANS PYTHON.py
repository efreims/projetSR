# implement rsa algorithm in python


import random
import math


def is_prime(n):
    if n == 2:
        return True
    if n < 2 or n % 2 == 0:
        return False
    for i in range(3, int(math.sqrt(n) + 1), 2):
        if n % i == 0:
            return False
    return True


def generate_prime(n):
    while True:
        p = random.randrange(n)
        if is_prime(p):
            return p


def generate_keypair(p, q):
    if not (is_prime(p) and is_prime(q)):
        raise ValueError('Both numbers must be prime.')
    elif p == q:
        raise ValueError('p and q cannot be equal')
    n = p * q
    phi = (p - 1) * (q - 1)
    e = random.randrange(1, phi)
    g = math.gcd(e, phi)
    while g != 1:
        e = random.randrange(1, phi)
        g = math.gcd(e, phi)
    d = multiplicative_inverse(e, phi)
    return ((e, n), (d, n))


def encrypt(pk, plaintext):
    key, n = pk
    cipher = [pow(ord(char), key, n) for char in plaintext]
    return cipher


def decrypt(pk, ciphertext):
    key, n = pk
    plain = [chr(pow(char, key, n)) for char in ciphertext]
    return ''.join(plain)


def multiplicative_inverse(a, b):
    x = 0
    y = 1
    lx = 1
    while b != 0:
        q = a // b
        a, b = b, a % b
        x, lx = lx - q * x, x
        y, ly = ly - q * y, y
    if lx < 0:
        lx += b
    if ly < 0:
        ly += b
    return lx


if __name__ == '__main__':
    p = generate_prime(100)
    q = generate_prime(100)
    print('p =', p)
    print('q =', q)
    print('p*q =', p * q)
    print('(p-1)*(q-1) =', (p - 1) * (q - 1))
    print('p*q =', p * q)

    print('\nGenerating your public/private keypairs now . . .\n')
    public, private = generate_keypair(p, q)
    print('Your public key is', public)
    print('Your private key is', private)

    message = 'Hello, World!'
    print('\nEncrypting your message now . . .\n')
    encrypted_msg = encrypt(public, message)
    print('Your encrypted message is:', encrypted_msg)

    print('\nDecrypting your message now . . .\n')
    print('Your message is:', decrypt(private, encrypted_msg))
    



