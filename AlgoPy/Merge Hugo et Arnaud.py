# Merge Hugo et Arnaud
# implement rsa algorithm in python


import random
import math


def generate_prime_number(n):
    return random.getrandbits(n)
    
def decomp_miller(nbtest):
    i = 2
    compt = 1
    while ((nbtest-1)%i == 0):
        i = i*2
        compt += 1
    return compt-1

def square_and_multiply(x, k, p=None):
    b = bin(k).lstrip('0b')
    r = 1
    for i in b:
        r = r**2
        if i == '1':
            r = r * x
        if p:
            r %= p
    return r

def rabin_miller_try(d,a,nb,s):
    x = square_and_multiply(a,d,nb)
    if x == 1:
        return False
    
    for i in range(s):
        x = square_and_multiply(a,2**i * d,nb)
        if x == nb-1:
            return False
    return True
    

def rabin_miller_test(nb,acc):
    ptemp = nb-1
    is_prime = True
    s = decomp_miller(nb)
    d = ptemp//(2**s)
    
    assert ptemp == 2**s * d   # assert sert juste à controler que la condition est respectée sinon génère une erreur 
    
    for i in range (acc):
        a = random.randrange(2, nb-2)
        if rabin_miller_try(d,a,nb,s):
            is_prime = False
    return is_prime
            
  
def generate_prime_number(n):
    acc = 7
    found = False
    generated = random.getrandbits(n)
    while not found :
        if rabin_miller_test(generated,acc):
            found = True
            return generated
        generated += 1
    return generated
        


# def is_prime(n):
#     if n == 2:
#         return True
#     if n < 2 or n % 2 == 0:
#         return False
#     for i in range(3, int(math.sqrt(n) + 1), 2):
#         if n % i == 0:
#             return False
#     return True



def generate_keypair(p, q):
    if not (rabin_miller_test(p,7) and rabin_miller_test(q,7)):
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
    ly = 1
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
    p = generate_prime_number(512)
    q = generate_prime_number(512)
    print('p =', p)
    print('q =', q)
    print('p*q =', p * q)
    print('(p-1)*(q-1) =', (p - 1) * (q - 1))
    print('p*q =', p * q)

    print('\nGenerating your public/private keypairs now . . .\n')
    public, private = generate_keypair(p, q)
    print('Your public key is', public)
    print('Your private key is', private)

    message = 'ANKULAY'
    print('\nEncrypting your message now . . .\n')
    encrypted_msg = encrypt(public, message)
    print('Your encrypted message is:', encrypted_msg)

    print('\nDecrypting your message now . . .\n')
    print('Your message is:', decrypt(private, encrypted_msg))
    



